package io.slingr.endpoints.mandrill.utils;

import io.slingr.endpoints.services.Files;
import io.slingr.endpoints.utils.EmailUtils;
import io.slingr.endpoints.utils.Json;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>Converters and checkers used by the Mandrill endpoint classes to process webhooks
 *
 * <p>Created by lefunes on 28/10/15.
 */
public class WebhookConverter {
    private static final Logger logger = LoggerFactory.getLogger(WebhookConverter.class);

    // Mandrill webhook events
    private static final String EVENT_INBOUND = "inbound";
    private static final String EVENT_SEND = "send";
    private static final String EVENT_DEFERRAL = "deferral";
    private static final String EVENT_HARD_BOUNCE = "hard_bounce";
    private static final String EVENT_SOFT_BOUNCE = "soft_bounce";
    private static final String EVENT_OPEN = "open";
    private static final String EVENT_CLICK = "click";
    private static final String EVENT_SPAM = "spam";
    private static final String EVENT_UNSUB = "unsub";
    private static final String EVENT_REJECT = "reject";
    public static final String EVENT_WHITELIST = "whitelist";
    public static final String EVENT_BLACKLIST = "blacklist";

    // Mandrill parameters
    public static final String MANDRILL_EVENTS = "mandrill_events";
    private static final String MANDRILL_EVENT = "event";
    private static final String MANDRILL_TYPE = "type";
    private static final String MANDRILL_MSG = "msg";
    public static final String MANDRILL_ID = "_id";
    private static final String MANDRILL_TIMESTAMP = "ts";
    private static final String MANDRILL_EMAIL = "email";
    private static final String MANDRILL_FROM_NAME = "from_name";
    private static final String MANDRILL_FROM_EMAIL = "from_email";
    private static final String MANDRILL_SUBJECT = "subject";
    private static final String MANDRILL_HTML = "html";
    private static final String MANDRILL_TEXT = "text";
    private static final String MANDRILL_IMAGES = "images";
    private static final String MANDRILL_ATTACHMENTS = "attachments";
    private static final String MANDRILL_TO = "to";

    // application parameters
    public static final String SLINGR_EVENT = "event";
    public static final String SLINGR_ID = "id";
    private static final String SLINGR_EVENT_TIME = "eventTime";
    private static final String SLINGR_EMAIL = "email";
    public static final String SLINGR_FROM_EMAIL = "fromEmail";
    private static final String SLINGR_FROM_NAME = "fromName";
    private static final String SLINGR_SUBJECT = "subject";
    private static final String SLINGR_ORIGINAL_TEXT = "originalText";
    private static final String SLINGR_TEXT = "text";
    private static final String SLINGR_ORIGINAL_HTML = "originalHtml";
    private static final String SLINGR_HTML = "html";
    private static final String SLINGR_IMAGES = "images";
    private static final String SLINGR_ATTACHMENTS = "attachments";
    public static final String SLINGR_RECIPIENTS = "recipients";
    private static final String SLINGR_RECIPIENT_EMAIL = "email";
    private static final String SLINGR_RECIPIENT_NAME = "name";

    /**
     * Converts event from the Mandrill format to the application one
     *
     * @param files client to upload files
     * @param mandrillEvent event that arrives from Mandrill
     * @return event to send to application
     */
    public static Json webhookEventsToSlingr(Files files, Json mandrillEvent) {
        final Json event = Json.map();
        if(mandrillEvent != null && !mandrillEvent.isEmpty()){
            if(StringUtils.isNotBlank(mandrillEvent.string(MANDRILL_EVENT))) {
                final String eventName = mandrillEvent.string(MANDRILL_EVENT);
                switch (eventName.toLowerCase()) {
                    case EVENT_INBOUND:
                        parseInboundMessageWebhooks(files, mandrillEvent, event);
                        break;
                    case EVENT_SEND:
                    case EVENT_DEFERRAL:
                    case EVENT_HARD_BOUNCE:
                    case EVENT_SOFT_BOUNCE:
                    case EVENT_OPEN:
                    case EVENT_CLICK:
                    case EVENT_SPAM:
                    case EVENT_UNSUB:
                    case EVENT_REJECT:
                    case EVENT_WHITELIST:
                    case EVENT_BLACKLIST:
                        parseEventsWebhook(mandrillEvent, event);
                        break;
                    default:
                        logger.warn(String.format("Invalid webhook event name [%s]", eventName));
                }
            } else if(StringUtils.isNotBlank(mandrillEvent.string(MANDRILL_TYPE))) {
                final String type = mandrillEvent.string(MANDRILL_TYPE);
                switch (type.toLowerCase()) {
                    case EVENT_WHITELIST:
                    case EVENT_BLACKLIST:
                        parseEventsWebhook(mandrillEvent, event);
                        event.set(SLINGR_EVENT, type);
                        break;
                    default:
                        logger.warn(String.format("Invalid webhook event type [%s]", type));
                }

            }
        }
        return event;
    }

    /**
     * Parses the event to the application format
     *
     * @param mandrillEvent event that arrives from Mandrill
     * @param event event to sent to application
     */
    private static void parseEventsWebhook(Json mandrillEvent, Json event) {
        event.merge(mandrillEvent);

        event.traverse(new Json.Visitor() {
            @Override
            public void enrich(String path, Json json) {
                // timestamps
                addTimestampValue(json, MANDRILL_TIMESTAMP, SLINGR_EVENT_TIME);

                //email
                convertEmailValue(json, MANDRILL_EMAIL, SLINGR_EMAIL);
            }
        });
    }

    /**
     * Parses the inbound email message to the application format
     *
     * @param files client to upload files
     * @param mandrillEvent event that arrives from Mandrill
     * @param event event to sent to application
     */
    private static void parseInboundMessageWebhooks(Files files, Json mandrillEvent, Json event) {
        final Json msg = mandrillEvent.json(MANDRILL_MSG);
        if(msg != null && !msg.isEmpty()) {

            addTimestampValue(mandrillEvent, MANDRILL_TIMESTAMP, SLINGR_EVENT_TIME);

            final String email = convertEmailValue(event, msg, MANDRILL_EMAIL, SLINGR_EMAIL);

            String hash = null;
            if (StringUtils.isNotBlank(email)) {
                hash = email.replaceAll("^[^\\+\\s]+@", "@");
                hash = hash.replaceAll("^\\S+[\\+\\s]", "");
                hash = hash.replaceAll("@.*$", "");
            }
            event.setIfNotEmpty(SLINGR_ID, hash);

            event.setIfNotEmpty(SLINGR_FROM_EMAIL, msg.string(MANDRILL_FROM_EMAIL));
            event.setIfNotEmpty(SLINGR_FROM_NAME, msg.string(MANDRILL_FROM_NAME));
            event.setIfNotEmpty(SLINGR_SUBJECT, msg.string(MANDRILL_SUBJECT));

            // HTML
            String originalHtml = msg.string(MANDRILL_HTML);
            if (StringUtils.isBlank(originalHtml)) {
                originalHtml = "";
            }
            event.setIfNotEmpty(SLINGR_ORIGINAL_HTML, originalHtml);

            final String html = EmailUtils.parseHtmlBody(null, originalHtml);
            event.setIfNotEmpty(SLINGR_HTML, html);

            // text
            String originalText = msg.string(MANDRILL_TEXT);
            if (StringUtils.isBlank(originalText)) {
                originalText = EmailUtils.convertToTextBody(originalHtml);
            }
            event.setIfNotEmpty(SLINGR_ORIGINAL_TEXT, originalText);

            final String text = EmailUtils.parseTextBody(null, originalText);
            event.setIfNotEmpty(SLINGR_TEXT, text);

            // images
            transformToSlingrFile(files, msg, SLINGR_IMAGES, event);

            // attachments
            transformToSlingrFile(files, msg, MANDRILL_ATTACHMENTS, event);

            // recipients
            if (msg.contains(MANDRILL_TO)) {
                final List<Json> recipients = new ArrayList<>();
                final List<List> to = msg.lists(MANDRILL_TO);
                for (List receiver : to) {
                    recipients.add(Json.map()
                                    .setIfNotEmpty(SLINGR_RECIPIENT_EMAIL, convertEmail(receiver.get(0)))
                                    .setIfNotEmpty(SLINGR_RECIPIENT_NAME, receiver.get(1))
                    );
                }
                event.setIfNotEmpty(SLINGR_RECIPIENTS, recipients);
            }
        }
    }


    public static void wrapFilesToApp(Json mandrillEvent, Json eventConv) {

        if (StringUtils.isNotBlank(mandrillEvent.string(MANDRILL_EVENT))) {
            final String eventName = mandrillEvent.string(MANDRILL_EVENT);
            if (eventName != null && eventName.toLowerCase().equals(EVENT_INBOUND)) {

                Json msg = mandrillEvent.json(MANDRILL_MSG);
                if (msg != null && !msg.isEmpty()) {

                    wrapFilesToApp(msg, eventConv, MANDRILL_IMAGES);
                    wrapFilesToApp(msg, eventConv, MANDRILL_ATTACHMENTS);

                    mandrillEvent.set(MANDRILL_MSG, msg);
                }
            }
        }
    }

    private static void wrapFilesToApp(Json msg, Json msgConv, String key) {
        if (msg.contains(key)) {
            final Json filesToConvert = msg.json(key);
            if (!filesToConvert.isEmpty()) {
                final List<Json> at = new ArrayList<>();
                if(msgConv != null && msgConv.isList(key)){
                    List<Json> all = msgConv.jsons(key);
                    if(all != null) {
                        at.addAll(all);
                    }
                }
                msg.setIfNotEmpty(key, at);
            }
        }
    }

    private static void transformToSlingrFile(Files files, Json msg, String key, Json response) {
        if (msg.contains(key)) {
            final Json filesToConvert = msg.json(key);
            if (!filesToConvert.isEmpty()) {
                final List<Json> at = new ArrayList<>();
                for (String k : filesToConvert.keys()) {
                    Json attachment = filesToConvert.json(k);
                    final boolean b64 = attachment.bool("base64", false);
                    attachment = files.upload(attachment.string("name"), attachment.string("content"), attachment.string("type"), b64);
                    at.add(attachment);
                }
                response.setIfNotEmpty(key, at);
            }
        }
    }

    /**
     * Add the converted timestamp value
     *
     * @param json json to check
     * @param key key of the timestamp
     * @param valueKey key of the format date to save
     */
    private static void addTimestampValue(Json json, String key, String valueKey){
        if (json.contains(key) && !json.contains(valueKey)) {
            final long eventTime = json.longInteger(key) * 1000;
            json.setIfNotEmpty(valueKey, FastDateFormat.getInstance("yyyy-MM-dd'T'HH:mm:ss'Z'ZZ").format(eventTime));
        }
    }

    /**
     * Convert the email value
     *
     * @param json json to check
     * @param key key of the email value
     * @param valueKey key of the modified email value
     * @return modified email value
     */
    private static String convertEmailValue(Json json, String key, String valueKey) {
        return convertEmailValue(json, json, key, valueKey);
    }

    /**
     * Convert the email value
     *
     * @param toJson json to store the value
     * @param fromJson json to check
     * @param key key of the email value
     * @param valueKey key of the modified email value
     * @return modified email value
     */
    private static String convertEmailValue(Json toJson, Json fromJson, String key, String valueKey) {
        String email = null;
        if (fromJson.contains(key)) {
            email = convertEmail(fromJson.string(key));
            toJson.setIfNotEmpty(valueKey, email);
        }
        return email;
    }

    /**
     * Convert the email address
     *
     * @param oEmail email object to convert
     * @return email to use
     */
    private static String convertEmail(Object oEmail){
        String email = null;
        if(oEmail instanceof String){
            email = (String) oEmail;
        } else if (oEmail != null) {
            email = oEmail.toString();
        }
        if(StringUtils.isBlank(email)){
            return email;
        } else {
            return email.replace(" ", "+");
        }
    }
}
