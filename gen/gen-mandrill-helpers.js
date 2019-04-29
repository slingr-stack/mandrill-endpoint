var fs = require('fs');

var FILE_NAME = "mandrill-fn-helpers.js";
var CODE = '';
var cache = {};

var MANDRILL_URLS = [
    "/users/info.json",
    "/users/ping.json",
    "/users/ping2.json",
    "/users/senders.json",
    "/messages/send.json",
    "/messages/send-template.json",
    "/messages/search.json",
    "/messages/search-time-series.json",
    "/messages/info.json",
    "/messages/content.json",
    "/messages/parse.json",
    "/messages/send-raw.json",
    "/messages/list-scheduled.json",
    "/messages/cancel-scheduled.json",
    "/messages/reschedule.json",
    "/tags/list.json",
    "/tags/delete.json",
    "/tags/info.json",
    "/tags/time-series.json",
    "/tags/all-time-series.json",
    "/rejects/add.json",
    "/rejects/list.json",
    "/rejects/delete.json",
    "/whitelists/add.json",
    "/whitelists/list.json",
    "/whitelists/delete.json",
    "/senders/list.json",
    "/senders/domains.json",
    "/senders/add-domain.json",
    "/senders/check-domain.json",
    "/senders/verify-domain.json",
    "/senders/info.json",
    "/senders/time-series.json",
    "/urls/list.json",
    "/urls/search.json",
    "/urls/time-series.json",
    "/urls/tracking-domains.json",
    "/urls/check-tracking-domain.json",
    "/templates/add.json",
    "/templates/info.json",
    "/templates/update.json",
    "/templates/publish.json",
    "/templates/delete.json",
    "/templates/list.json",
    "/templates/time-series.json",
    "/templates/render.json",
    "/webhooks/list.json",
    "/webhooks/add.json",
    "/webhooks/info.json",
    "/webhooks/update.json",
    "/webhooks/delete.json",
    "/subaccounts/list.json",
    "/subaccounts/add.json",
    "/subaccounts/info.json",
    "/subaccounts/update.json",
    "/subaccounts/delete.json",
    "/subaccounts/pause.json",
    "/subaccounts/resume.json",
    "/inbound/domains.json",
    "/inbound/add-domain.json",
    "/inbound/check-domain.json",
    "/inbound/delete-domain.json",
    "/inbound/routes.json",
    "/inbound/add-route.json",
    "/inbound/update-route.json",
    "/inbound/delete-route.json",
    "/inbound/send-raw.json",
    "/exports/info.json",
    "/exports/list.json",
    "/exports/rejects.json",
    "/exports/whitelist.json",
    "/exports/activity.json",
    "/ips/list.json",
    "/ips/info.json",
    "/ips/provision.json",
    "/ips/start-warmup.json",
    "/ips/cancel-warmup.json",
    "/ips/set-pool.json",
    "/ips/delete.json",
    "/ips/list-pools.json",
    "/ips/pool-info.json",
    "/ips/create-pool.json",
    "/ips/delete-pool.json",
    "/ips/check-custom-dns.json",
    "/ips/set-custom-dns.json",
    "/metadata/list.json",
    "/metadata/add.json",
    "/metadata/update.json",
    "/metadata/delete.json"
];

var makeEndpointsHelpers = function () {

    for (var i in MANDRILL_URLS) {

        var parts = MANDRILL_URLS[i].substr(1).replace('.json', '').split('/');

        var funcName = '';

        for (var p in parts) {
            funcName += ((p == 0) ? '' : '.') + parts[p];

            if (p == parts.length - 1) {

                funcName = funcName.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });

                CODE += 'endpoint.' + funcName + ' = function(params, callbackData, callbacks) {\n';
                CODE += '   var url = \'' + MANDRILL_URLS[i] + '\';\n';
                CODE += '   sys.logs.debug(\'[Mandrill] POST from: \' + url);\n';
                CODE += '   return endpoint.post(url, params, callbackData, callbacks);\n';
                CODE += '};\n\n';

            } else {
                if (!cache[parts[p]]) {
                    cache[parts[p]] = {};
                    CODE += 'endpoint.' + parts[p] + ' = {};\n\n';
                }
            }

        }


    }

    var MESSAGE = '//////////////////////////////////////////////////////////////////////////\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//  This file is generated with mandrill/gen/gen-mandrill-helpers.js  //\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//////////////////////////////////////////////////////////////////////////\n';

    CODE = MESSAGE + '\n\n' + CODE;

};

makeEndpointsHelpers();

fs.writeFile("../scripts/" + FILE_NAME, CODE, function (err) {
    if (err) {
        return console.error(err);
    }

    console.info('Generator has run successfully!');
});
