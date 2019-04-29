package io.slingr.endpoints.mandrill.old.beans;

import io.slingr.endpoints.mandrill.old.services.MandrillClient;
import io.slingr.endpoints.mandrill.utils.Convert;
import io.slingr.endpoints.mandrill.utils.DataStoreConverter;
import io.slingr.endpoints.mandrill.utils.StoreMessage;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.Files;
import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.utils.Json;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>Service beans that permits to transform the information between application and Mandrill REST client
 *
 * <p>Created by lefunes on 06/08/15.
 */
public class Service {
    private static final Logger logger = LoggerFactory.getLogger(Service.class);

    private final Files files;
    private final AppLogs appLogs;
    private final MandrillClient client;
    private final DataStore requestsStore;
    private final String fromAccount;
    private final String fromDomain;
    private final String fromName;
    private final boolean redirectEnabled;
    private final String redirectEmail;

    public Service(Files files, AppLogs appLogs, MandrillClient client, DataStore requestsStore, String account, String domain, String fromName, boolean redirectEnabled, String redirectEmail) {
        this.files = files;
        this.appLogs = appLogs;
        this.client = client;
        this.requestsStore = requestsStore;
        this.fromAccount = account;
        this.fromDomain = domain;
        this.fromName = fromName;
        this.redirectEnabled = redirectEnabled;
        this.redirectEmail = redirectEmail;
    }

    public Json sendEmail(Json body, String functionId){
        final Json mandrillMessages = Convert.emailsToMandrill(files, appLogs, body, fromName, fromAccount, fromDomain, redirectEnabled, redirectEmail);

        final String messageId = mandrillMessages.string(Convert.RESPONSE_MESSAGE_ID);
        final List<Json> messages = mandrillMessages.jsons(Convert.RESPONSE_MESSAGES);

        final List<String> mandrillIds = new ArrayList<>();
        final List<Json> recipients = new ArrayList<>();

        boolean processTemplateOptions = false;
        for (Json msg : messages) {
            Json message = msg;
            message = Convert.addTemplateEmailProperties(message, body);

            processTemplateOptions = message.contains(Convert.MANDRILL_SEND_TEMPLATE_NAME);

            final Json response;
            if(processTemplateOptions) {
                logger.info(String.format("Send template email [%s]", message));

                final Json serviceResponse = this.client.sendTemplateEmail(message);
                response = Convert.serviceResponseToSlingr(serviceResponse, messageId);

                logger.info(String.format("Template email processed [%s]", response));
            } else {
                logger.info(String.format("Send email [%s]", message));

                final Json serviceResponse = this.client.sendEmail(message);
                response = Convert.serviceResponseToSlingr(serviceResponse, messageId);

                logger.info(String.format("Email processed [%s]", response));
            }

            if(response != null && !response.isEmpty() && response.contains(Convert.MANDRILL_RESPONSE_RECIPIENTS)) {
                mandrillIds.addAll(Convert.getMandrillIds(response));
                recipients.addAll(response.jsons(Convert.MANDRILL_RESPONSE_RECIPIENTS));
            }
        }
        final List<String> receivers = mandrillMessages.strings(Convert.RESPONSE_RECEIVERS);

        if (!mandrillIds.isEmpty() && (receivers != null && !receivers.isEmpty())){
            final Json request = DataStoreConverter.requestToStore(messageId, mandrillIds, receivers, processTemplateOptions, functionId);
            try {
                StoreMessage.saveData(requestsStore, request);
                if(StringUtils.isNotBlank(messageId)) {
                    logger.info(String.format("Waiting responses with hash [%s]", messageId));
                }
            } catch (Exception ex) {
                logger.warn(String.format("Error saving request [%s] in data store - exception: [%s]", request, ex.toString()), ex);
            }
        }

        final Json functionResponse = Json.map()
                .setIfNotEmpty(Convert.SLINGR_RESPONSE_ID, messageId)
                .setIfNotEmpty(Convert.SLINGR_RESPONSE_RECIPIENTS, recipients);

        logger.info(String.format("Function response [%s]", functionResponse));
        return functionResponse;
    }
}
