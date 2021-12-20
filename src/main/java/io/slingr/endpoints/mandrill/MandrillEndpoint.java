package io.slingr.endpoints.mandrill;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.mandrill.utils.Convert;
import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.logs.AppLogLevel;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@SlingrEndpoint(name = "mandrill", functionPrefix = "_")
public class MandrillEndpoint extends HttpEndpoint {

    private final Logger logger = LoggerFactory.getLogger(MandrillEndpoint.class);

    private final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String MANDRILL_EVENTS = "mandrill_events";

    @EndpointProperty
    private String apiKey;

    @EndpointProperty
    private String webhooksKey;

    @EndpointProperty
    private String account;

    @EndpointProperty
    private String domain;

    @EndpointProperty
    private String fromName;

    @EndpointProperty
    private Boolean redirectEnabled;

    @EndpointProperty
    private String redirectEmail;

    @Override
    public String getApiUri() { return "https://mandrillapp.com/api/1.0/"; }

    @Override
    public void endpointStarted() {
        httpService().setupExceptionConverter(exception -> {
            if(exception instanceof EndpointException){
                return (EndpointException) exception;
            } else {
                final EndpointException response = HttpService.defaultConvertToEndpointException(exception);
                if (response != null) {
                    try {
                        final Json respJson = response.getAdditionalInfo();
                        if (respJson != null && respJson.isMap("body") && respJson.json("body") != null && respJson.json("body").string("message") != null) {
                            return EndpointException.exception(response.getCode(), respJson.json("body").string("message"), respJson, !response.isRetryable(), exception);
                        }
                    } catch (Exception ex) {
                        // parse exception, do nothing
                    }
                    return response;
                }
                return null;
            }
        });
    }

    @EndpointFunction(name = "_post")
    public Json postRequest(FunctionRequest request) {

        Json req = request.getJsonParams();
        String path = req.string("path");

        Json body = req.json("body");
        if (body == null) {
            body = Json.map();
            req.set("body", body);
        }
        body.set("key", apiKey);


        if (path.contains("/messages/send")) {

            Json message = body.json("message");
            String hash = Convert.generateHash();
            if (message != null && message.string("from_email") == null) {
                String fromEmail = Convert.generateSenderAddress(account, hash, domain);
                message.set("from_email", fromEmail);
                message.set("headers", Json.map().set("Reply-To", fromEmail));
                body.set("message", message);
            }

            this.setFiles(body, message, "attachments");
            this.setFiles(body, message, "images");

        }

        req.set("body", body);
        return httpService().defaultPostRequest(req);
    }

    private void setFiles(Json body, Json message, String KEY){

        if (message.json(KEY) != null) {

            Json newAttachments = Json.list();

            for (Object att : message.json(KEY).toList()) {
                Map attachment = (Map) att;
                if (attachment.get("file_id") != null) {

                    Json newAtt = Json.map();

                    try {
                        String fileId = (String) attachment.get("file_id");
                        Json descriptor = files().metadata(fileId);
                        if (descriptor != null && !descriptor.isEmpty()) {
                            newAtt.set("type", descriptor.string("contentType"));
                            newAtt.set("name", descriptor.string("fileName"));
                            newAtt.set("content", files().download(fileId, true));

                            newAttachments.push(newAtt);
                        } else {
                            throw new IllegalArgumentException(String.format("File with id [%s] not found", fileId));
                        }
                    } catch (Exception ex) {
                        throw httpService().convertToEndpointException(ex);
                    }

                } else {
                    newAttachments.push(Json.fromMap(attachment));
                }
            }

            message.set(KEY, newAttachments);
            body.set("message", message);
        }
    }

    @EndpointWebService(path = "/")
    public WebServiceResponse webhookProcessor(WebServiceRequest request) {

        boolean validWebhook;

        try {
            validWebhook = validateWebhookSignature(request.getHeader("x-mandrill-signature"),request.getJsonBody());
        } catch (Exception error) {
            appLogs().error("The following error occurred while validating the webhook signature: ["+error.getMessage()+"].",error);
            return HttpService.defaultWebhookResponse();
        }
        if (!validWebhook) {
            appLogs().info("Mandrill webhook discarded because signature did not match.");
            return HttpService.defaultWebhookResponse();
        }
        try {
            final Json response = request.getJsonBody().json(MANDRILL_EVENTS);
            if (response != null && response.isList()) {
                final List<Json> eventList = response.jsons();
                if (eventList != null && !eventList.isEmpty()) {
                    new Thread(() -> {
                        for (Json event : eventList) {
                            events().send("webhooks", event);
                        }
                    }).start();
                }
            }
        } catch (EndpointException ee) {
            appLogs().sendAppLog(AppLogLevel.ERROR, String.format("Exception when process webhook on endpoint: %s", ee.getMessage()), ee.toJson(false), ee);
            logger.error(String.format("Exception when process webhook [%s]: %s", ee.getMessage(), ee.toJson(false)), ee);
        } catch (Exception ex) {
            appLogs().sendAppLog(AppLogLevel.ERROR, String.format("Exception when process webhook on endpoint: %s", ex.getMessage()), ex);
            logger.error(String.format("Exception when process webhook: %s", ex.getMessage()), ex);
        }
        return HttpService.defaultWebhookResponse();
    }

    private boolean validateWebhookSignature(String mandrillSignature,Json webhookPayload) throws Exception{
        String webhooksUrl = properties().getWebServicesUri();
        String webhooksKey = this.webhooksKey;

        if (webhooksKey == null) {
            throw new Exception("The endpoint received a webhook but the \"Webhooks Key\" has not been set in the endpoint configuration. Please add the webhooks key or remove the webhooks from Mandrill dashboard.");
        }

        StringBuilder sb = new StringBuilder(webhooksUrl);
        for (String payloadKey: webhookPayload.keys()) {
            //We use replaceAll() to escape the "/" char on the body.
            sb.append(payloadKey).append(webhookPayload.string(payloadKey).replaceAll("\\/","\\\\/"));
        }
        String dataToSign = sb.toString();

        String calculatedWebhookSignature = calculateWebhookSignature(dataToSign,webhooksKey);

        return mandrillSignature.equals(calculatedWebhookSignature);
    }

    private String calculateWebhookSignature(String dataToSign,String webhooksKey){
        try {
            // Get a hmac_sha1 key from the raw key bytes
            SecretKeySpec signingKey = new SecretKeySpec(webhooksKey.getBytes(), "HmacSHA1");
            // Get a hmac_sha1 Mac instance and initialize with the signing key
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(signingKey);
            // Compute the hmac on input data bytes
            byte[] rawHmac = mac.doFinal(dataToSign.getBytes(StandardCharsets.UTF_8));
            // Convert raw bytes to Base64
            byte[] encoded = Base64.getEncoder().encode(rawHmac);
            //  Covert array of bytes to a String
            return new String(encoded);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @EndpointFunction(name = "_convertDateToTimestamp")
    public Json convertDateToTimestamp(Json params) throws IllegalArgumentException {

        if (params != null && params.size() > 0) {

            String dateStr = params.string("date");
            if (StringUtils.isEmpty(dateStr)) {
                throw new IllegalArgumentException("Parameter 'date' is required");
            }

            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

            try {
                Json res = Json.map();
                Date d = sdf.parse(dateStr);
                return res.set("timestamp", d.getTime());
            } catch (ParseException e) {
                throw new IllegalArgumentException(String.format("Parameter '%s' can not be converted.", dateStr));
            }

        }

        return null;
    }

    @EndpointFunction(name = "_formatFromMillis")
    public Json formatFromMillis(Json params) {

        if (params != null && params.size() > 0) {

            long millis = params.longInteger("millis");

            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

            Json res = Json.map();
            Date d = new Date(millis);
            return res.set("date", sdf.format(d));

        }

        return null;
    }

    @EndpointFunction(name = "_fileIdToBase64")
    public Json getResourceById(Json request) {
        String key = "file_id";

        try {
            if (!request.isEmpty(key)) {
                String fileId = request.string(key);
                request.remove(key);
                Json descriptor = files().metadata(fileId);
                if (descriptor != null && !descriptor.isEmpty()) {
                    return Json.map().set("content", files().download(fileId, true));
                } else {
                    throw new IllegalArgumentException(String.format("File with id [%s] not found", fileId));
                }
            }
        } catch (Exception ex) {
            throw httpService().convertToEndpointException(ex);
        }

        return null;
    }
}
