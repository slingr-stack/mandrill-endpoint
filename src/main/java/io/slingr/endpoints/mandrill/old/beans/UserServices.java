package io.slingr.endpoints.mandrill.old.beans;

import io.slingr.endpoints.mandrill.old.services.MandrillClient;
import io.slingr.endpoints.utils.Json;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>User Service beans that permits to query the USER services to mandrill
 *
 * <p>Created by lefunes on 06/08/15.
 */
public class UserServices {
    private static final Logger logger = LoggerFactory.getLogger(UserServices.class);

    private final MandrillClient client;

    public UserServices(MandrillClient client) {
        this.client = client;
    }

    public Json ping(Json body){
        logger.info("Ping Mandrill service");

        Json response = this.client.ping();
        if("PONG!".equals(response.string("PING"))){
            response = Json.map().set("result", true);
        } else {
            response = Json.map().set("result", false);
        }

        logger.info(String.format("Ping successful [%s]", response));
        return response;
    }

    public Json invalidPing(Json body){
        logger.info("Ping Mandrill service (w/ invalid API key)");

        Json response;
        try {
            response = this.client.invalidPing();
            if ("PONG!".equals(response.string("PING"))) {
                response = Json.map().set("result", true);
            } else {
                response = Json.map().set("result", false);
            }
        } catch (Exception ex){
            response = Json.map().set("result", false);
        }

        logger.info(String.format("Ping successful [%s]", response));
        return response;
    }
}
