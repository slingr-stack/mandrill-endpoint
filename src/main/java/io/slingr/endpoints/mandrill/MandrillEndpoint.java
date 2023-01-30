package io.slingr.endpoints.mandrill;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.mandrill.old.beans.Service;
import io.slingr.endpoints.mandrill.old.services.MandrillClient;
import io.slingr.endpoints.mandrill.utils.Convert;
import io.slingr.endpoints.mandrill.utils.DataStoreConverter;
import io.slingr.endpoints.mandrill.utils.StoreMessage;
import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.services.datastores.DataStoreResponse;
import io.slingr.endpoints.services.logs.AppLogLevel;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.slingr.endpoints.mandrill.utils.WebhookConverter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <p>Mandrill endpoint
 * <p>
 * <p>Rewrited by hpacini on 17/11/17.
 */
@SlingrEndpoint(name = "mandrill", functionPrefix = "_")
public class MandrillEndpoint extends HttpEndpoint {

    private Logger logger = LoggerFactory.getLogger(MandrillEndpoint.class);

    private final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String MANDRILL_EVENTS = "mandrill_events";  // idem in old WebhookConverter
    private static final String EVENT_EMAIL_EVENT = "emailEvent";
    private static final String EVENT_SYNC_EVENT = "syncEvent";
    private static final String EVENT_RESPONSE_ARRIVED = "responseArrived";
    private static final String EVENT_EMAIL_ARRIVED = "emailArrived";

    @EndpointProperty
    private String apiKey;

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

    @EndpointDataStore(name = "requests-store")
    private DataStore requestsDataStore;

    private Service service;

    @Override
    public String getApiUri() {
        return "https://mandrillapp.com/api/1.0/";
    }

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
        final MandrillClient mandrillClient = new MandrillClient(apiKey);
        service = new Service(files(), appLogs(), mandrillClient, requestsDataStore, account, domain, fromName, redirectEnabled, redirectEmail);
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

            req.set("body", body);

            Json response = httpService().defaultPostRequest(req, request.getFunctionId());

            List<String> ids = new ArrayList<>();
            List<String> emails = new ArrayList<>();

            for (Object obj : response.toList()) {
                Map res = (Map) obj;
                if (res.get("_id") != null) {
                    ids.add((String) res.get("_id"));
                }
                if (res.get("email") != null) {
                    emails.add((String) res.get("email"));
                }
            }

            Json msgToSave = Json.map();
            msgToSave.set("hash", hash);
            msgToSave.set("_ids", ids);
            msgToSave.set("receivers", emails);
            msgToSave.set("template", false);
            msgToSave.set("isFunction", true);
            msgToSave.set("functionId", request.getFunctionId());

            StoreMessage.saveData(requestsDataStore, msgToSave);

            return response;

        } else {
            req.set("body", body);
            return httpService().defaultPostRequest(req, request.getFunctionId());
        }

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

    @EndpointFunction(name = "_sendEmailOld")
    public Json sendEmailOld(FunctionRequest request) {
        Json body = request.getJsonParams();

        return this.service.sendEmail(body.json("msg"), request.getFunctionId());
    }

    @EndpointWebService(path = "/")
    public WebServiceResponse webhookProcessor(WebServiceRequest request) {
        try {
            final Json response = request.getJsonBody().json(MANDRILL_EVENTS);
            if (response != null && response.isList()) {
                final List<Json> eventList = response.jsons();
                if (eventList != null && !eventList.isEmpty()) {
                    for (Json e : eventList) {
                        processEvent(e);
                    }
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

    private Json processEvent(Json event) {

        String eventName = EVENT_EMAIL_ARRIVED;

        Json eventConv = convertToOldEvent(event);

        boolean eventIsSent = false;

        try {
            final String eventType = eventConv.string(WebhookConverter.SLINGR_EVENT);
            if (StringUtils.isNotBlank(eventType)) {
                eventName = EVENT_EMAIL_EVENT;
                if (WebhookConverter.EVENT_WHITELIST.equalsIgnoreCase(eventType) || WebhookConverter.EVENT_BLACKLIST.equalsIgnoreCase(eventType)) {
                    eventName = EVENT_SYNC_EVENT;
                    eventConv.remove(WebhookConverter.SLINGR_EVENT);
                } else {
                    final String id = eventConv.string(WebhookConverter.MANDRILL_ID);
                    if (StringUtils.isNotBlank(id)) {
                        final List<Json> requests = new ArrayList<>();
                        try {
                            final DataStoreResponse requestsDs = requestsDataStore.find(Json.map().set(DataStoreConverter.IDS, id));
                            requests.addAll(requestsDs.getItems());
                        } catch (Exception ex) {
                            logger.warn(String.format("Error finding requests [%s] in data store - exception: [%s]", id, ex.toString()), ex);
                        }
                        if (!requests.isEmpty()) {
                            final Json request = requests.get(0);

                            if (Boolean.TRUE.equals(request.bool("isOld"))) {
                                events().send(eventName, eventConv, request.string(DataStoreConverter.FUNCTION_ID));
                            } else {
                                WebhookConverter.wrapFilesToApp(event, eventConv);
                                events().send(eventName, event, request.string(DataStoreConverter.FUNCTION_ID));
                            }

                            eventIsSent = true;

                        }
                    }
                }
            } else {
                final String id = eventConv.string(WebhookConverter.SLINGR_ID);
                if (StringUtils.isNotBlank(id)) {
                    final List<Json> requests = new ArrayList<>();
                    try {
                        final DataStoreResponse requestsDs = requestsDataStore.find(Json.map().set("hash", id));
                        requests.addAll(requestsDs.getItems());
                    } catch (Exception ex) {
                        logger.warn(String.format("Error finding requests [%s] in data store - exception: [%s]", id, ex.toString()), ex);
                    }
                    if (!requests.isEmpty()) {
                        final Json request = requests.get(0);
                        final List<String> receivers = request.strings(DataStoreConverter.RECEIVERS);
                        if (receivers != null && receivers.contains(eventConv.string(WebhookConverter.SLINGR_FROM_EMAIL))) {
                            if (!Boolean.TRUE.equals(request.bool("isOld")) || request.bool(DataStoreConverter.WAITS_RESPONSE, false)) {
                                if (request.is(DataStoreConverter.IS_FUNCTION) && StringUtils.isNotBlank(request.string(DataStoreConverter.FUNCTION_ID))) {
                                    eventName = EVENT_RESPONSE_ARRIVED;
                                }
                            }
                        }

                        if (Boolean.TRUE.equals(request.bool("isOld"))) {
                            events().send(eventName, eventConv, request.string(DataStoreConverter.FUNCTION_ID));
                        } else {
                            WebhookConverter.wrapFilesToApp(event, eventConv);
                            events().send(eventName, event, request.string(DataStoreConverter.FUNCTION_ID));
                        }

                        eventIsSent = true;
                    }
                    logger.info(String.format("Processed event [%s] - id [%s]", eventName, id));
                } else {
                    logger.info(String.format("Processed event [%s]", eventName));
                }
            }

            if (!eventIsSent) {
                WebhookConverter.wrapFilesToApp(event, eventConv);
                events().send(eventName, event);
            }

            return eventConv;
        } catch (Exception ex) {
            if (eventConv != null) {
                logger.warn(String.format("Error when trying to process event [%s] - exception: [%s]", eventConv, ex.getMessage()), ex);
            }
        }

        return null;
    }

    @EndpointFunction(name = "_convertEvent")
    public Json convertToOldEvent(Json event) {
        return WebhookConverter.webhookEventsToSlingr(files(), event);
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

    @EndpointFunction(name = "_getResourceById")
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
