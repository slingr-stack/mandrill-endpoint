package io.slingr.endpoints.mandrill.utils;

import io.slingr.endpoints.utils.Json;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Convert the data in a format to save on data stores
 *
 * Created by lefunes on 28/10/15.
 */
public class DataStoreConverter {

    // DB entity properties
    public static final String HASH = "hash";
    public static final String IDS = "ids";
    public static final String TIMESTAMP = "timestamp";
    public static final String RECEIVERS = "receivers";
    public static final String TEMPLATE = "template";
    public static final String WAITS_RESPONSE = "waitsResponse";
    public static final String IS_FUNCTION = "isFunction";
    public static final String FUNCTION_ID = "functionId";
    public static final String IS_OLD = "isOld";

    /**
     * Convert the parameters to the data store format
     *
     * @param messageId id of the message
     * @param mandrillIds id of the messages sent to the receivers
     * @param receivers receiver email list of the message
     * @param templateEmail true if the message is a template one
     * @return object to store on the data store
     */
    public static Json requestToStore(String messageId, List<String> mandrillIds, List<String> receivers, boolean templateEmail, String functionId) {
        final List<String> mIds = mandrillIds != null && !mandrillIds.isEmpty() ? mandrillIds : new ArrayList<>();
        final List<String> rec = receivers != null && !receivers.isEmpty() ? receivers : new ArrayList<>();

        final Json response = Json.map()
                .setIfNotEmpty(HASH, messageId)
                .set(IDS, mIds)
                .set(TIMESTAMP, new Date().getTime())
                .set(RECEIVERS, rec)
                .set(TEMPLATE, templateEmail)
                .set(WAITS_RESPONSE, StringUtils.isNotBlank(messageId))
                .set(IS_OLD, true);

        if(StringUtils.isNotBlank(functionId)){
            response.set(IS_FUNCTION, true)
                    .set(FUNCTION_ID, functionId);
        } else {
            response.set(IS_FUNCTION, false);
        }

        return response;
    }
}
