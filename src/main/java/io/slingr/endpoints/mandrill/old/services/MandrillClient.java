package io.slingr.endpoints.mandrill.old.services;

import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.services.rest.RestClient;
import io.slingr.endpoints.utils.Json;

import javax.ws.rs.client.WebTarget;

/**
 * <p>Mandrill REST client
 *
 * <p>Created by lefunes on 06/08/15.
 */
public class MandrillClient extends RestClient {
    private static final String URL_BASE = "https://mandrillapp.com/api/1.0/";
    private static final String FORMAT = ".json";

    private final String apiKey;

    public MandrillClient(String apiKey) throws EndpointException {
        super(URL_BASE);
        this.apiKey = apiKey;
    }

    public String getApiKey() {
        return apiKey;
    }

    private WebTarget target(String section, String method){
        return getApiTarget().path(section).path(String.format("%s%s", method, FORMAT));
    }

    private Json request(Json message){
        if(message == null){
            message = Json.map();
        }
        return message.set("key", this.apiKey);
    }

    private Json request(){
        return request(null);
    }

    public Json ping() throws EndpointException {
        try {
            final WebTarget t = target("users", "ping2");
            return post(t, request());
        } catch (Exception ex){
            throw convertException(ex);
        }
    }

    public Json invalidPing() throws EndpointException {
        try {
            final WebTarget t = target("users", "ping2");
            return post(t, request().set("key", "invalid-key"));
        } catch (Exception ex){
            throw convertException(ex);
        }
    }

    public Json sendEmail(Json email) throws EndpointException {
        try {
            final WebTarget t = target("messages", "send");
            return post(t, request(email));
        } catch (Exception ex){
            throw convertException(ex);
        }
    }

    public Json sendTemplateEmail(Json email) throws EndpointException {
        try {
            final WebTarget t = target("messages", "send-template");
            return post(t, request(email));
        } catch (Exception ex){
            throw convertException(ex);
        }
    }

    private EndpointException convertException(Exception exception) {
        return EndpointException.parseHTTPExceptions(exception, "message", "name");
    }
}
