package io.slingr.endpoints.mandrill.utils;

import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.services.exchange.Parameter;
import io.slingr.endpoints.utils.Json;

public class StoreMessage {

    public static void saveData(DataStore store, Json data) {
        data.set(Parameter.DATA_STORE_TTL, 15 * 24 * 60 * 60 * 1000); // 15 days
        store.save(data);
    }

}
