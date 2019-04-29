package io.slingr.endpoints.mandrill.utils;

import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.Files;
import io.slingr.endpoints.utils.EmailUtils;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.utils.Strings;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * <p>Converters and checkers used by the Mandrill endpoint classes
 *
 * <p>Created by lefunes on 06/08/15.</p>
 */
public class Convert {
    private static final Logger logger = LoggerFactory.getLogger(Convert.class);

    // application send parameters
    public static final String APPLICATION_SEND_FROM_NAME = "fromName";
    public static final String APPLICATION_SEND_FROM_EMAIL = "fromEmail";
    public static final String APPLICATION_SEND_SUBJECT = "subject";
    public static final String APPLICATION_SEND_HTML = "html";
    public static final String APPLICATION_SEND_TEXT = "text";
    public static final String APPLICATION_SEND_TO = "to";
    public static final String APPLICATION_SEND_TO_EMAIL = "email";
    public static final String APPLICATION_SEND_TO_NAME = "name";
    public static final String APPLICATION_SEND_TO_TYPE = "type";
    public static final String APPLICATION_SEND_TO_MERGE_VARS = "mergeVars";
    public static final String APPLICATION_SEND_GLOBAL_MERGE_VARS = "globalMergeVars";
    public static final String APPLICATION_SEND_WAIT_RESPONSE = "waitResponse";
    public static final String APPLICATION_SEND_IMPORTANT = "important";
    public static final String APPLICATION_SEND_TEMPLATE_NAME = "templateName";
    public static final String APPLICATION_SEND_TEMPLATE_CONTENT = "templateContent";
    public static final String APPLICATION_SEND_REPLY_TO_HASH = "replyToHash";
    public static final String APPLICATION_SEND_OPTIONS = "options";

    // Mandrill send parameters
    public static final String MANDRILL_SEND_MESSAGE = "message";
    public static final String MANDRILL_SEND_TEMPLATE_NAME = "template_name";
    public static final String MANDRILL_SEND_TEMPLATE_CONTENT = "template_content";
    public static final String MANDRILL_SEND_VARS_NAME = "name";
    public static final String MANDRILL_SEND_VARS_CONTENT = "content";
    public static final String MANDRILL_SEND_VARS_RECIPIENT = "rcpt";
    public static final String MANDRILL_SEND_VARS = "vars";
    public static final String MANDRILL_SEND_HTML = "html";
    public static final String MANDRILL_SEND_TEXT = "text";
    public static final String MANDRILL_SEND_SUBJECT = "subject";
    public static final String MANDRILL_SEND_FROM_EMAIL = "from_email";
    public static final String MANDRILL_SEND_FROM_NAME = "from_name";
    public static final String MANDRILL_SEND_TO = "to";
    public static final String MANDRILL_SEND_TO_EMAIL = "email";
    public static final String MANDRILL_SEND_TO_NAME = "name";
    public static final String MANDRILL_SEND_TO_TYPE = "type";
    public static final String MANDRILL_SEND_IMPORTANT = "important";
    public static final String MANDRILL_SEND_MERGE_LANGUAGE = "merge_language";
    public static final String MANDRILL_SEND_MERGE_LANGUAGE_HANDLEBARS = "handlebars";
    public static final String MANDRILL_SEND_GLOBAL_MERGE_VARS = "global_merge_vars";
    public static final String MANDRILL_SEND_MERGE_VARS = "merge_vars";
    public static final String MANDRILL_SEND_ATTACHMENTS = "attachments";
    public static final String MANDRILL_SEND_FILE_ID = "fileId";
    public static final String MANDRILL_SEND_FILE_CONTENT = "content";

    private static final String MANDRILL_VAR_REPLY_TO = "replyTo";

    // options of send type parameter
    public static final String TYPE_TO = "to";
    public static final String TYPE_CC = "cc";
    public static final String TYPE_BCC = "bcc";
    public static final int TYPE_TO_VAL = 10;
    public static final int TYPE_CC_VAL = 5;
    public static final int TYPE_BCC_VAL = 0;

    // Mandrill response parameters
    public static final String MANDRILL_RESPONSE_RECIPIENTS = "recipients";
    public static final String MANDRILL_RESPONSE_RECIPIENT_ID = "_id";
    public static final String MANDRILL_RESPONSE_RECIPIENT_EMAIL = "email";
    public static final String MANDRILL_RESPONSE_RECIPIENT_STATUS = "status";
    public static final String MANDRILL_RESPONSE_RECIPIENT_STATUS_ERROR = "error";
    public static final String MANDRILL_RESPONSE_RECIPIENT_ERROR_MESSAGE = "message";
    public static final String MANDRILL_RESPONSE_RECIPIENT_ERROR_CODE = "errorCode";
    public static final String MANDRILL_RESPONSE_RECIPIENT_ERROR_DESCRIPTION = "errorDescription";
    public static final String MANDRILL_RESPONSE_RECIPIENT_ERROR__DETAILS = "details";
    public static final String MANDRILL_RESPONSE_RECIPIENT_REJECT_REASON = "reject_reason";

    // application response parameters
    public static final String SLINGR_RESPONSE_ID = "id";
    public static final String SLINGR_RESPONSE_RECIPIENTS = "recipients";

    // Responses of the emailsToMandrill method
    public static final String RESPONSE_MESSAGE_ID = "response-message-id";
    public static final String RESPONSE_MESSAGES = "response-messages";
    public static final String RESPONSE_RECEIVERS = "response-receivers";
    public static final String RESPONSE_ORIGINAL_MESSAGE = "response-original-message";

    public static Json emailsToMandrill(Files files, AppLogs appLogs, Json appEmail, String defaultFromName, String defaultFromAccount, String defaultFromDomain, boolean redirectEnabled, String redirectEmail) {

        final Json mandrillEmail = emailToMandrill(appEmail, defaultFromName, defaultFromAccount, defaultFromDomain);

        final String messageId = mandrillEmail.string(RESPONSE_MESSAGE_ID);
        Json email = mandrillEmail.json(RESPONSE_ORIGINAL_MESSAGE);
        email = addAttachmentFiles(files, appLogs, email);

        // separate recipients
        final List<String> receivers = getReceivers(email);
        email = addRedirectData(redirectEnabled, redirectEmail, email, receivers);

        final List<List<Json>> recipientList = separateReceivers(email);

        final List<Json> messages = new ArrayList<>();
        for (List<Json> recipients : recipientList) {
            final Json recipientMessage = email.cloneJson();

            final Json mainRecipient = recipients.get(0);
            if (mainRecipient != null) {
                final Json message = recipientMessage.json(MANDRILL_SEND_MESSAGE);
                message.set(MANDRILL_SEND_TO, recipients);
                recipientMessage.set(MANDRILL_SEND_MESSAGE, message);

                messages.add(recipientMessage);
            }
        }

        return Json.map()
                .set(RESPONSE_MESSAGES, messages)
                .set(RESPONSE_RECEIVERS, receivers)
                .set(RESPONSE_MESSAGE_ID, messageId);
    }

    private static Json addAttachmentFiles(Files files, AppLogs appLogs, Json email) {
        Json message = email.json(MANDRILL_SEND_MESSAGE);
        if(message == null){
            message = Json.map();
        }
        final List<Json> attachments = message.jsons(MANDRILL_SEND_ATTACHMENTS);
        if(attachments != null && !attachments.isEmpty()){
            for (Json attachment : attachments) {
                final String fileId = attachment.string(MANDRILL_SEND_FILE_ID);
                if(StringUtils.isNotBlank(fileId)){
                    // find file in app and save content on email
                    try {
                        final String content = files.download(fileId, true);
                        if (content != null) {
                            attachment.remove(MANDRILL_SEND_FILE_ID);
                            attachment.set(MANDRILL_SEND_FILE_CONTENT, content);
                        }
                    } catch (EndpointException ex){
                        final String errorMessage = String.format("Error downloading private file [%s]", fileId);
                        appLogs.error(errorMessage, ex.getAdditionalInfo());
                        throw EndpointException.permanent(ErrorCode.CLIENT, errorMessage, ex.getAdditionalInfo());
                    }
                }
            }
            message.set(MANDRILL_SEND_ATTACHMENTS, attachments);
            email.set(MANDRILL_SEND_MESSAGE, message);
        }
        return email;
    }

    private static Json addRedirectData(boolean redirectEnabled, String redirectEmail, Json email, List<String> receivers) {
        if(redirectEnabled) {
            email = redirectRequest(email, redirectEmail);
            if(!receivers.contains(redirectEmail)) {
                receivers.add(redirectEmail);
            }
        }
        return email;
    }

    public static Json emailToMandrill(Json appEmail, final String defaultFromName, final String defaultFromAccount, final String defaultFromDomain) {
        if(appEmail == null || appEmail.isEmpty()){
            throw EndpointException.permanent(ErrorCode.ARGUMENT, "Message to send is empty");
        }

        // [] optional, other options documented on the Mandrill documentation
        Json options = appEmail.json(APPLICATION_SEND_OPTIONS);
        if(options == null){
            options = Json.map();
        }

        // [] 'response', message to send to Mandrill. At first, it a clone of the [data] field
        final Json response = options.cloneJson();

        // [message] options of the message to send
        Json message = response.json(MANDRILL_SEND_MESSAGE);
        if(message == null){
            message = Json.map();
        }

        // [message.global_merge_vars] global merge variables to use for all recipients.
        // - precedence: appEmail[globalMergeVars] > message[global_merge_vars]
        List<Json> globalMergeVars = message.jsons(MANDRILL_SEND_GLOBAL_MERGE_VARS);
        if(globalMergeVars == null){
            globalMergeVars = new ArrayList<>();
        }
        if(appEmail.contains(APPLICATION_SEND_GLOBAL_MERGE_VARS)){
            final Json gmv = appEmail.json(APPLICATION_SEND_GLOBAL_MERGE_VARS);
            if(!gmv.isEmpty()){
                for (String key : gmv.keys()) {
                    if(StringUtils.isNotBlank(key)) {
                        addMergeVar(globalMergeVars, key, gmv.object(key));
                    }
                }
            }
        }

        // [message.merge_vars] per-recipient merge variables, which override global merge variables with the same name.
        // - precedence: appEmail[mergeVars] > message[merge_vars]
        List<Json> mergeVars = message.jsons(MANDRILL_SEND_MERGE_VARS);
        if(mergeVars == null){
            mergeVars = new ArrayList<>();
        }

        // reply to hash / wait response
        String messageId = appEmail.string(APPLICATION_SEND_REPLY_TO_HASH);
        if(StringUtils.isBlank(messageId)){
            if(appEmail.contains(APPLICATION_SEND_WAIT_RESPONSE) && appEmail.is(APPLICATION_SEND_WAIT_RESPONSE)) {
                messageId = generateHash();
            }
        }
        if(StringUtils.isNotBlank(messageId)){
            messageId = messageId.trim().toLowerCase();
        }

        // [message.from_name] optional from name to be used.
        // - precedence: appEmail[fromName] > message[from_name] > defaultFromName (default endpoint configuration)
        String fromName = defaultFromName;
        if(StringUtils.isNotBlank(appEmail.string(APPLICATION_SEND_FROM_NAME))){
            fromName = appEmail.string(APPLICATION_SEND_FROM_NAME);
        } else if(StringUtils.isNotBlank(message.string(MANDRILL_SEND_FROM_NAME))){
            fromName = message.string(MANDRILL_SEND_FROM_NAME);
        }
        message.setIfNotEmpty(MANDRILL_SEND_FROM_NAME, fromName);

        // [message.from_email] the sender email address.
        // - precedence: appEmail[fromEmail] > (default endpoint configuration + hash)
        final String fromEmail;
        if(StringUtils.isNotBlank(appEmail.string(APPLICATION_SEND_FROM_EMAIL))){
            fromEmail = appEmail.string(APPLICATION_SEND_FROM_EMAIL);
        } else {
            fromEmail = generateSenderAddress(defaultFromAccount, messageId, defaultFromDomain);
        }
        message.setIfNotEmpty(MANDRILL_SEND_FROM_EMAIL, fromEmail);
        addMergeVar(globalMergeVars, MANDRILL_VAR_REPLY_TO, fromEmail);

        // [message.subject] the message subject
        if(appEmail.contains(APPLICATION_SEND_SUBJECT)){
            message.setIfNotEmpty(MANDRILL_SEND_SUBJECT, appEmail.string(APPLICATION_SEND_SUBJECT));
        }

        // [message.html] the full HTML content to be sent
        if(appEmail.contains(APPLICATION_SEND_HTML)){
            message.setIfNotEmpty(MANDRILL_SEND_HTML, appEmail.string(APPLICATION_SEND_HTML));
        }

        // [message.text] optional full text content to be sent
        if(appEmail.contains(APPLICATION_SEND_TEXT)){
            message.setIfNotEmpty(MANDRILL_SEND_TEXT, appEmail.string(APPLICATION_SEND_TEXT));
        }

        // [message.important] whether or not this message is important, and should be delivered ahead of non-important messages
        if(appEmail.contains(APPLICATION_SEND_IMPORTANT) || appEmail.is(APPLICATION_SEND_IMPORTANT)){
            message.setIfNotEmpty(MANDRILL_SEND_IMPORTANT, true);
        }

        // [message.merge_language] the merge tag language to use when evaluating merge tags, either mailchimp or handlebars
        if(StringUtils.isBlank(message.string(MANDRILL_SEND_MERGE_LANGUAGE))) {
            message.set(MANDRILL_SEND_MERGE_LANGUAGE, MANDRILL_SEND_MERGE_LANGUAGE_HANDLEBARS);
        }

        // [message.to] process recipient list
        mergeVars = parseRecipients(message, appEmail, mergeVars);

        // save again global variables
        message.setIfNotEmpty(MANDRILL_SEND_GLOBAL_MERGE_VARS, globalMergeVars);
        message.setIfNotEmpty(MANDRILL_SEND_MERGE_VARS, mergeVars);
        response.setIfNotEmpty(MANDRILL_SEND_MESSAGE, message);

        return Json.map()
                .setIfNotEmpty(RESPONSE_ORIGINAL_MESSAGE, response)
                .setIfNotEmpty(RESPONSE_MESSAGE_ID, messageId);
    }

    private static List<Json> parseRecipients(Json message, Json appEmail, List<Json> mergeVars){
        if(message == null || appEmail == null){
            return mergeVars;
        }

        // [message.to] an string or a list with a mix of strings and recipient information maps. The string should be a valid email address or and user id.
        final List<Json> originalRecipients = generateSlingrRecipientsList(message.object(MANDRILL_SEND_TO));
        final List<Json> definedRecipients = generateSlingrRecipientsList(appEmail.object(APPLICATION_SEND_TO));

        final List<Json> slingrRecipients = mergeSlingrRecipientLists(originalRecipients, definedRecipients);
        if(slingrRecipients.isEmpty()) {
            throw EndpointException.permanent(ErrorCode.ARGUMENT, "Empty recipient list");
        }

        final List<List<Json>> response = convertToMandrillRecipient(slingrRecipients, mergeVars);
        if(response == null || response.isEmpty()) {
            throw EndpointException.permanent(ErrorCode.ARGUMENT, "Empty recipient list");
        }

        if(response.size() > 1) {
            if(response.get(0).isEmpty()) {
                throw EndpointException.permanent(ErrorCode.ARGUMENT, "Empty recipient list");
            }
            message.set(MANDRILL_SEND_TO, response.get(0));
        }

        if(response.size() >= 1) {
            if(response.get(0).isEmpty()) {
                throw EndpointException.permanent(ErrorCode.ARGUMENT, "Empty recipient list");
            }
            message.set(MANDRILL_SEND_TO, response.get(0));
        }
        if(response.size() >= 2) {
            mergeVars = response.get(1);
        }
        return mergeVars;
    }

    private static List<Json> generateSlingrRecipientsList(Object recipientObject) {
        final List<Json> response = new ArrayList<>();
        if(recipientObject != null) {
            if (recipientObject instanceof Json || recipientObject instanceof Map || recipientObject instanceof List) {
                final Json json = Json.fromObject(recipientObject);
                if(json != null && !json.isEmpty()) {
                    if (json.isMap()) {
                        addSlingrRecipient(response, null, json);
                    } else {
                        for (Object o : json.objects()) {
                            mergeList(response, generateSlingrRecipientsList(o));
                        }
                    }
                }
            } else {
                addSlingrRecipient(response, recipientObject.toString(), null);
            }
        }
        return response;
    }

    private static void addSlingrRecipient(List<Json> response, String email, Json options) {
        if(response == null) {
            return;
        }

        final Json user = normalizeSlingrRecipient(email, options);
        if (user != null) {
            response.add(user);
        }
    }

    private static Json normalizeSlingrRecipient(String userEmail, Json options){
        String email = userEmail;
        if(StringUtils.isBlank(email)){
            if(options != null){
                email = options.string(APPLICATION_SEND_TO_EMAIL);
            }
        }

        if(StringUtils.isBlank(email)){
            return null;
        }

        if(!EmailUtils.isValidEmail(email)){
            return null;
        }
        email = email.toLowerCase().trim();

        final Json recipient = Json.map()
                .set(APPLICATION_SEND_TO_EMAIL, email)
                .set(APPLICATION_SEND_TO_TYPE, TYPE_TO)
                .set(APPLICATION_SEND_TO_MERGE_VARS, Json.map());

        if(options != null){
            recipient.setIfNotEmpty(APPLICATION_SEND_TO_NAME, options.string(APPLICATION_SEND_TO_NAME))
                    .setIfNotEmpty(APPLICATION_SEND_TO_MERGE_VARS, options.json(APPLICATION_SEND_TO_MERGE_VARS));

            String type = options.string(APPLICATION_SEND_TO_TYPE);
            if(StringUtils.isNotBlank(type)){
                type = type.toLowerCase().trim();
                if(type.equals(TYPE_TO) || type.equals(TYPE_CC) || type.equals(TYPE_BCC)){
                    recipient.set(APPLICATION_SEND_TO_TYPE, type);
                }
            }
        }
        return recipient;
    }

    private static void mergeList(List<Json> list, List<Json> nList){
        if(list == null || nList == null || nList.isEmpty()){
            return;
        }
        list.addAll(nList);
    }

    private static List<Json> mergeSlingrRecipientLists(List<Json> originalRecipientsList, List<Json> recipientsList) {
        final Json receivers = Json.map();
        if(originalRecipientsList != null){
            for (Json recipient : originalRecipientsList) {
                addUniqueSlingrRecipientToList(receivers, recipient);
            }
        }
        if(recipientsList != null) {
            for (Json recipient : recipientsList) {
                addUniqueSlingrRecipientToList(receivers, recipient);
            }
        }

        final List<Json> response = new ArrayList<>();
        for (String email : receivers.keys()) {
            response.add(receivers.json(email));
        }
        return response;
    }

    private static void addUniqueSlingrRecipientToList(Json entriesList, Json entry) {
        if(entriesList == null || entry == null) {
            return;
        }

        final String email = entry.string(APPLICATION_SEND_TO_EMAIL);
        if(StringUtils.isBlank(email)) {
            return;
        }

        if(entriesList.contains(email)){
            final Json previousEntry = entriesList.json(email);

            // name
            if(!entry.contains(APPLICATION_SEND_TO_NAME)){
                entry.setIfNotEmpty(APPLICATION_SEND_TO_NAME, previousEntry.string(APPLICATION_SEND_TO_NAME));
            }

            // type
            final int previousType = typeLevel(previousEntry.string(APPLICATION_SEND_TO_TYPE));
            final int currentType = typeLevel(entry.string(APPLICATION_SEND_TO_TYPE));
            if(previousType > currentType){
                if(previousType < TYPE_CC_VAL){
                    entry.set(APPLICATION_SEND_TO_TYPE, TYPE_BCC);
                } else if(previousType < TYPE_TO_VAL){
                    entry.set(APPLICATION_SEND_TO_TYPE, TYPE_CC);
                } else {
                    entry.set(APPLICATION_SEND_TO_TYPE, TYPE_TO);
                }
            }

            // merge vars
            final Json mergeVars = Json.map();
            final Json previousMergeVars = previousEntry.json(APPLICATION_SEND_TO_MERGE_VARS);
            if(previousMergeVars != null && !previousMergeVars.isEmpty()){
                mergeVars.merge(previousMergeVars, false);
            }
            final Json currentMergeVars = entry.json(APPLICATION_SEND_TO_MERGE_VARS);
            if(currentMergeVars != null && !currentMergeVars.isEmpty()){
                mergeVars.merge(currentMergeVars);
            }
            entry.set(APPLICATION_SEND_TO_MERGE_VARS, mergeVars);
        }
        entriesList.set(email, entry);
    }

    private static List<List<Json>> convertToMandrillRecipient(final List<Json> slingrRecipients, List<Json> mergeVars) {
        if(slingrRecipients == null) {
            return null;
        }

        final List<Json> response = new ArrayList<>();
        for (Json slingrRecipient : slingrRecipients) {
            final Json mandrillRecipient = Json.map()
                    .set(MANDRILL_SEND_TO_EMAIL, slingrRecipient.string(APPLICATION_SEND_TO_EMAIL))
                    .setIfNotEmpty(MANDRILL_SEND_TO_NAME, slingrRecipient.string(APPLICATION_SEND_TO_NAME))
                    .setIfNotEmpty(MANDRILL_SEND_TO_TYPE, slingrRecipient.string(APPLICATION_SEND_TO_TYPE));

            if(mandrillRecipient != null) {
                response.add(mandrillRecipient);

                mergeVars = appendRecipientVar(mergeVars, mandrillRecipient.string(MANDRILL_SEND_TO_EMAIL), slingrRecipient.json(APPLICATION_SEND_TO_MERGE_VARS));
            }
        }

        return Arrays.asList(response, mergeVars);
    }

    private static int typeLevel(String type){
        if(StringUtils.isBlank(type)){
            return 10;
        }
        switch (type.trim().toLowerCase()){
            case TYPE_TO: return TYPE_TO_VAL;
            case TYPE_CC: return TYPE_CC_VAL;
            case TYPE_BCC: return TYPE_BCC_VAL;
        }
        return 10;
    }

    private static List<Json> appendRecipientVar(List<Json> list, String email, Json vars){
        if(list == null){
            list = new ArrayList<>();
        }

        if(StringUtils.isBlank(email) || vars == null || vars.isEmpty()){
            return list;
        }

        email = email.toLowerCase().trim();

        final List<Json> response = new ArrayList<>();


        final List<List<Json>> recipientVarList = new ArrayList<>();
        for (Json perRecipient : list) {
            if(email.equals(perRecipient.string(MANDRILL_SEND_VARS_RECIPIENT))){
                final List<Json> recipientVars = perRecipient.jsons(MANDRILL_SEND_VARS);
                if(recipientVars != null && !recipientVars.isEmpty()){
                    recipientVarList.add(recipientVars);
                }
            } else {
                // add the vars of other receivers
                response.add(perRecipient);
            }
        }

        // recipient vars already defined for the receiver
        final List<Json> recipientVars = new ArrayList<>();
        for (List<Json> jsons : recipientVarList) {
            for (Json json : jsons) {
                recipientVars.add(json);
            }
        }

        List<Json> newRecipientVars = new ArrayList<>();
        if(!recipientVars.isEmpty()){
            // if there are content for the merge vars of the receiver
            for (Json recipientVar : recipientVars) {
                if(!vars.contains(recipientVar.string(MANDRILL_SEND_VARS_NAME))){
                    addMergeVar(newRecipientVars, recipientVar.string(MANDRILL_SEND_VARS_NAME), recipientVar.object(MANDRILL_SEND_VARS_CONTENT));
                }
            }
        }
        // add new merge vars
        for (String key : vars.keys()) {
            if(StringUtils.isNotBlank(key)) {
                addMergeVar(newRecipientVars, key, vars.object(key));
            }
        }

        // update recipient value on the vars
        addRecipientVar(response, email, newRecipientVars);

        return response;
    }

    public static Json addTemplateEmailProperties(Json mandrillEmail, Json appEmail) {
        if(mandrillEmail == null){
            mandrillEmail = Json.map();
        }

        // [template_name] the immutable name or slug of a template that exists in the user's account. For backwards-compatibility, the template name may also be used but the immutable slug is preferred.
        if(StringUtils.isNotBlank(appEmail.string(APPLICATION_SEND_TEMPLATE_NAME))){
            mandrillEmail.set(MANDRILL_SEND_TEMPLATE_NAME, appEmail.string(APPLICATION_SEND_TEMPLATE_NAME));

            // [template_content] an array of template content to send.
            List<Json> templateContent = mandrillEmail.jsons(MANDRILL_SEND_TEMPLATE_CONTENT);
            if(templateContent == null){
                templateContent = new ArrayList<>();
            }
            if(appEmail.contains(APPLICATION_SEND_TEMPLATE_CONTENT)){
                final Json tc = appEmail.json(APPLICATION_SEND_TEMPLATE_CONTENT);
                if(!tc.isEmpty()){
                    for (String key : tc.keys()) {
                        addMergeVar(templateContent, key, tc.object(key));
                    }
                }
            }
            mandrillEmail.setIfNotNull(MANDRILL_SEND_TEMPLATE_CONTENT, templateContent);
        }

        return mandrillEmail;
    }

    private static void addMergeVar(List<Json> list, String name, Object value){
        if(list != null && StringUtils.isNotBlank(name)){
            list.add(Json.map()
                            .set(MANDRILL_SEND_VARS_NAME, name)
                            .setIfNotNull(MANDRILL_SEND_VARS_CONTENT, value)
            );
        }
    }

    private static void addRecipientVar(List<Json> list, String email, List<Json> vars){
        if(list != null && StringUtils.isNotBlank(email)){
            list.add(Json.map()
                            .set(MANDRILL_SEND_VARS_RECIPIENT, email.toLowerCase().trim())
                            .setIfNotNull(MANDRILL_SEND_VARS, vars)
            );
        }
    }

    public static String generateHash(){
        return Strings.randomAlphanumeric(8).toLowerCase();
    }

    public static String generateSenderAddress(String account, String messageId, String domain){
        if(StringUtils.isNotBlank(messageId)){
            return String.format("%s+%s@%s",account, messageId, domain);
        } else {
            return String.format("%s@%s", account, domain);
        }
    }

    public static Json redirectRequest(Json mandrillEmail, String redirectEmail) {
        if(StringUtils.isNotBlank(redirectEmail)) {
            if (mandrillEmail == null) {
                mandrillEmail = Json.map();
            }

            if (mandrillEmail != null && !mandrillEmail.isEmpty()) {
                final Json message = mandrillEmail.json(MANDRILL_SEND_MESSAGE);
                if (message != null && !message.isEmpty()) {
                    // TO
                    final List<Json> to = new ArrayList<>();
                    to.add(Json.map()
                                    .set(MANDRILL_SEND_TO_EMAIL, redirectEmail)
                                    .set(MANDRILL_SEND_TO_NAME, "Redirect Address")
                    );
                    message.set(MANDRILL_SEND_TO, to);

                    // USER MERGE VARS
                    final Json vars = Json.map();
                    if(message.contains(MANDRILL_SEND_MERGE_VARS)){
                        final List<Json> userVars = message.jsons(MANDRILL_SEND_MERGE_VARS);
                        for (Json userVar : userVars) {
                            final List<Json> uVars = userVar.jsons(MANDRILL_SEND_VARS);
                            for (Json uVar : uVars) {
                                if(StringUtils.isNotBlank(uVar.string(MANDRILL_SEND_VARS_NAME))) {
                                    vars.set(uVar.string(MANDRILL_SEND_VARS_NAME), uVar.object(MANDRILL_SEND_VARS_CONTENT));
                                }
                            }
                        }
                    }

                    if(!vars.isEmpty()) {
                        final List<Json> nVars = new ArrayList<>();
                        for (String name : vars.keys()) {
                            nVars.add(Json.map().set(MANDRILL_SEND_VARS_NAME, name).set(MANDRILL_SEND_VARS_CONTENT, vars.object(name)));
                        }

                        final List<Json> nMVars = new ArrayList<>();
                        nMVars.add(Json.map()
                                        .set(MANDRILL_SEND_VARS_RECIPIENT, redirectEmail)
                                        .set(MANDRILL_SEND_VARS, nVars)
                        );

                        message.set(MANDRILL_SEND_MERGE_VARS, nMVars);
                    }

                    mandrillEmail.set(MANDRILL_SEND_MESSAGE, message);
                }
            }
        }
        return mandrillEmail;
    }

    /**
     * Extract the list of receivers emails
     *
     * @param email email to sent to mandrill
     * @return list of recipient emails of the message
     */
    public static List<String> getReceivers(Json email) {
        final List<String> receivers = new ArrayList<>();
        if (email != null && !email.isEmpty()) {
            final Json message = email.json(MANDRILL_SEND_MESSAGE);
            if(message != null && !message.isEmpty()){
                List<Json> to = message.jsons(MANDRILL_SEND_TO);
                for (Json receiver : to) {
                    final String rc = receiver.string(MANDRILL_SEND_TO_EMAIL);
                    if(StringUtils.isNotBlank(rc) && !receivers.contains(rc)){
                        receivers.add(rc);
                    }
                }
            }
        }
        return receivers;
    }

    /**
     * Extract the list of receivers emails
     *
     * @param email email to sent to mandrill
     * @return list of recipient emails of the message
     */
    public static List<List<Json>> separateReceivers(Json email) {
        final List<List<Json>> receivers = new ArrayList<>();
        if(email != null && !email.isEmpty()) {
            final Json message = email.json(MANDRILL_SEND_MESSAGE);
            if(message != null && !message.isEmpty()){
                boolean firstListWithTo = false;

                final List<Json> to = message.jsons(MANDRILL_SEND_TO);
                for (Json receiver : to) {

                    final String rc = receiver.string(MANDRILL_SEND_TO_EMAIL);
                    if(StringUtils.isNotBlank(rc)){

                        final String type = receiver.string(MANDRILL_SEND_TO_TYPE);
                        if(StringUtils.isBlank(type) || TYPE_TO.equalsIgnoreCase(type)){
                            // create new list of receivers
                            if(receivers.isEmpty()) {
                                final List<Json> list = new ArrayList<>();
                                list.add(receiver);

                                receivers.add(list);
                                firstListWithTo = true;
                            } else if(!firstListWithTo) {
                                receivers.get(0).add(0, receiver);
                                firstListWithTo = true;
                            } else {
                                receivers.add(Collections.singletonList(receiver));
                            }
                        } else {
                            // add to the first list of receivers
                            if(receivers.isEmpty()) {
                                final List<Json> list = new ArrayList<>();
                                list.add(receiver);

                                receivers.add(list);
                            } else {
                                receivers.get(0).add(receiver);
                            }
                        }
                    }
                }
            }
        }
        return receivers;
    }

    /**
     * Extract the id of the mandrill messages
     *
     * @param response response after the application conversion
     * @return list of id of mandrill messages
     */
    public static List<String> getMandrillIds(Json response) {
        final List<String> ids = new ArrayList<>();
        if(response != null && !response.isEmpty() && response.contains(MANDRILL_RESPONSE_RECIPIENTS)) {
            final List<Json> recipients = response.jsons(MANDRILL_RESPONSE_RECIPIENTS);
            if(recipients != null && !recipients.isEmpty()){
                for (Json recipient : recipients) {
                    final String id = recipient.string(MANDRILL_RESPONSE_RECIPIENT_ID);
                    if(StringUtils.isNotBlank(id) && !ids.contains(id)){
                        ids.add(id);
                    }
                }
            }
        }
        return ids;
    }

    public static Json serviceResponseToSlingr(Json mandrillResponse, String messageId) {
        if(mandrillResponse.isList()){
            final Json response = Json.map();

            final List<Json> recipients = new ArrayList<>();
            List list = mandrillResponse.toList();
            for(Object o : list){
                final Json rc = Json.fromObject(o);
                if(!rc.isEmpty() && rc.isMap()){
                    final Json recipient = Json.map();
                    recipient.setIfNotEmpty(MANDRILL_RESPONSE_RECIPIENT_ID, rc.string(MANDRILL_RESPONSE_RECIPIENT_ID));
                    recipient.setIfNotEmpty(MANDRILL_RESPONSE_RECIPIENT_EMAIL, rc.string(MANDRILL_RESPONSE_RECIPIENT_EMAIL));
                    recipient.setIfNotEmpty(MANDRILL_RESPONSE_RECIPIENT_STATUS, rc.string(MANDRILL_RESPONSE_RECIPIENT_STATUS));
                    recipient.setIfNotEmpty(MANDRILL_RESPONSE_RECIPIENT_REJECT_REASON, rc.string(MANDRILL_RESPONSE_RECIPIENT_REJECT_REASON));

                    recipients.add(recipient);
                }
            }
            response.set(SLINGR_RESPONSE_RECIPIENTS, recipients);

            if(StringUtils.isNotBlank(messageId)){
                response.set(SLINGR_RESPONSE_ID, messageId);
            }

            return response;
        } else {
            String errorMessage = "Mandrill error";

            String status = mandrillResponse.string(MANDRILL_RESPONSE_RECIPIENT_STATUS);
            if(StringUtils.isNotBlank(status) && status.equals(MANDRILL_RESPONSE_RECIPIENT_STATUS_ERROR)){
                errorMessage = mandrillResponse.string(MANDRILL_RESPONSE_RECIPIENT_ERROR_MESSAGE);
            } else {
                status = mandrillResponse.string(MANDRILL_RESPONSE_RECIPIENT_ERROR_CODE);
                if(StringUtils.isNotBlank(status)){
                    if(StringUtils.isNotBlank(mandrillResponse.string(MANDRILL_RESPONSE_RECIPIENT_ERROR_DESCRIPTION))){
                        errorMessage = mandrillResponse.string(MANDRILL_RESPONSE_RECIPIENT_ERROR_DESCRIPTION);
                    }
                }
            }
            throw EndpointException.permanent(ErrorCode.API, errorMessage, Json.map().set(MANDRILL_RESPONSE_RECIPIENT_ERROR__DETAILS, mandrillResponse));
        }
    }
}
