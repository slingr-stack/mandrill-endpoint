package io.slingr.endpoints.mandrill;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.framework.annotations.*;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@SlingrEndpoint(name = "mandrill", functionPrefix = "_")
public class MandrillEndpoint extends HttpEndpoint {

    private final Logger logger = LoggerFactory.getLogger(MandrillEndpoint.class);

    private final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String MANDRILL_EVENTS = "mandrill_events";

    @EndpointProperty
    private String apiKey;

    @EndpointProperty
    private String fromName;

    @EndpointProperty
    private String account;

    @EndpointProperty
    private String domain;

    @EndpointProperty
    private String webhooksKey;

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

        if (path.endsWith("/messages/send") || path.endsWith("/messages/send-template")) {

            Json message = body.json("message");
            if (path.endsWith("/messages/send") && message != null) {
                fillFroms(message);
            }
            if (mustRedirectOutboundMails()) {
                List<Json> recipients = message.contains("to") ? message.jsons("to") : null;
                if (recipients != null) {
                    for (int i=0;i < recipients.size();i++) {
                        Json recipient = recipients.get(i);
                        recipient.set("email",redirectEmail);
                        recipients.set(i,recipient);
                    }
                    message.set("to",recipients);
                }
            }
            body.set("message", message);

            this.setFiles(body, message, "attachments");
            this.setFiles(body, message, "images");

        } else if (path.endsWith("/messages/send-raw")) {
            String rawMessage = body.string("raw_message");
            String fromEmail = body.string("from_email");
            String fromName = body.string("from_name");
            if (fromEmail == null) {
                fromEmail = extractFromEmailFromRawMessage(rawMessage);
                System.out.println("fromEmail is: "+fromEmail);
                if(!fromEmail.isEmpty()) body.set("from_email",fromEmail);
            }
            if (fromName == null) {
                fromName = extractFromNameFromRawMessage(rawMessage);
                System.out.println("fromName is: "+fromName);
                if(!fromName.isEmpty()) body.set("from_name",fromName);
            }
            fillFroms(body);

            if (mustRedirectOutboundMails()) {
                List<String> recipients = body.contains("to") ? body.strings("to") : null;
                if (recipients != null) {
                    for (int i=0;i < recipients.size() ;i++){
                        recipients.set(i, redirectEmail);
                    }
                    body.set("to", recipients);
                } else {
                    String modifiedRawMessage = replaceRecipientsFromRawMessage(rawMessage);
                    body.set("raw_message",modifiedRawMessage);
                }
            }
        }
        req.set("body", body);
        return httpService().defaultPostRequest(req);
    }

    private void setFiles(Json body, Json message, String KEY){

        if (message.json(KEY) != null) {

            Json newAttachments = Json.list();

            for (Json attachment : message.jsons(KEY)) {
                if (attachment.string("fileId") != null) {

                    Json newAtt = Json.map();

                    try {
                        String fileId = attachment.string("fileId");
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

                } else if(attachment.string("type") != null &&
                        attachment.string("name") != null &&
                        attachment.string("content") != null ) {
                    newAttachments.push(attachment);
                } else {
                    throw EndpointException.permanent(ErrorCode.ARGUMENT,"The endpoint received a unexpected property on the 'attachments' or 'images' object. It should contain either 'fileId' or 'type','name' & 'content' properties.");
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
        String key = "fileId";

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

    private boolean mustRedirectOutboundMails () {
        return (redirectEmail != null && (properties().getEnvironment().equals("dev") || properties().getEnvironment().equals("staging")));
    }

    private void fillFroms (Json jsonProperty) {
        String fromEmail = jsonProperty.contains("from_email") ? jsonProperty.string("from_email") : String.format("%s@%s", account, domain);
        jsonProperty.set("from_email", fromEmail);
        String fromName = jsonProperty.contains("from_name") ? jsonProperty.string("from_name") : this.fromName;
        jsonProperty.set("from_name",fromName);
    }

    private String extractFromEmailFromRawMessage(String rawMessage) {
        String pattern = "From:(?:(.*)<(.*@.*)>|(.*@.*))";
        Pattern patt = Pattern.compile(pattern);
        Matcher matcher = patt.matcher(rawMessage);
        if (matcher.find()) {
            return matcher.group(2) == null ? matcher.group(3).trim() : matcher.group(2).trim();
        } else {
            return "";
        }
    }
    private String extractFromNameFromRawMessage(String rawMessage) {
        String pattern = "From:(?:(.*)<(.*@.*)>|(.*@.*))";
        Pattern patt = Pattern.compile(pattern);
        Matcher matcher = patt.matcher(rawMessage);
        if (matcher.find()) {
            return matcher.group(1) == null ? "" : matcher.group(1).trim();
        } else {
            return "";
        }
    }

    private String replaceRecipientsFromRawMessage(String rawMessage) {
        String pattern = "To:\\s*([\\w\\t\\n .@<>,+-]*)(?:Cc:\\s*([\\w\\t\\n .@<>,+-]*))?(?:Bcc:([\\w\\t\\n .@<>,+-]*))?\\n[\\w -]+:"; //This regex will match the recipeints on To,Cc & Bcc
        Pattern patt = Pattern.compile(pattern,Pattern.CASE_INSENSITIVE); //We make it case insensitive as To, Cc & Bcc could be in lowercase
        Matcher matcher = patt.matcher(rawMessage);
        String modifiedRawMessage = rawMessage;
        String[] tos,ccs,bccs;
        if (matcher.find()) {
            tos = matcher.group(1) != null ? matcher.group(1).split(",") : null;
            System.out.println("tos is: "+Arrays.toString(tos));
            ccs = matcher.group(2) != null ? matcher.group(2).split(",") : null;
            System.out.println("ccs is: "+Arrays.toString(ccs));
            bccs = matcher.group(3) != null ? matcher.group(3).split(",") : null;
            System.out.println("bccs is: "+Arrays.toString(bccs));
            List<String[]> recipientArrays = new ArrayList<>(Arrays.asList(tos,ccs,bccs));
            System.out.println("recipientArrays is: "+Arrays.deepToString(recipientArrays.toArray()));
            String pattern2 = ".*<(.+)>";
            Pattern patt2 = Pattern.compile(pattern2);
            Matcher matcher2;
            for (String[] recipientArray: recipientArrays) {
                if (recipientArray == null) continue;
                for (String recipient: recipientArray) {
                    recipient = recipient.trim();
                    System.out.println("recipient is: "+recipient);
                    matcher2 = patt2.matcher(recipient);
                    if (matcher2.find()){
                        recipient = matcher2.group(1);
                        System.out.println("REPLACING "+recipient+" with redirectEmail");
                    }
                    modifiedRawMessage = modifiedRawMessage.replaceAll(Pattern.quote(recipient),redirectEmail);
                    System.out.println("modifiedRawMessage is: "+modifiedRawMessage);
                }
            }
        }
        return modifiedRawMessage;
    }
}
