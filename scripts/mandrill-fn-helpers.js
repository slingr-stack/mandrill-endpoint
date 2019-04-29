//////////////////////////////////////////////////////////////////////////
//                                                                      //
//  This file is generated with mandrill/gen/gen-mandrill-helpers.js  //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


endpoint.users = {};

endpoint.users.info = function(params, callbackData, callbacks) {
   var url = '/users/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.users.ping = function(params, callbackData, callbacks) {
   var url = '/users/ping.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.users.ping2 = function(params, callbackData, callbacks) {
   var url = '/users/ping2.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.users.senders = function(params, callbackData, callbacks) {
   var url = '/users/senders.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages = {};

endpoint.messages.send = function(params, callbackData, callbacks) {
   var url = '/messages/send.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.sendTemplate = function(params, callbackData, callbacks) {
   var url = '/messages/send-template.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.search = function(params, callbackData, callbacks) {
   var url = '/messages/search.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.searchTimeSeries = function(params, callbackData, callbacks) {
   var url = '/messages/search-time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.info = function(params, callbackData, callbacks) {
   var url = '/messages/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.content = function(params, callbackData, callbacks) {
   var url = '/messages/content.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.parse = function(params, callbackData, callbacks) {
   var url = '/messages/parse.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.sendRaw = function(params, callbackData, callbacks) {
   var url = '/messages/send-raw.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.listScheduled = function(params, callbackData, callbacks) {
   var url = '/messages/list-scheduled.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.cancelScheduled = function(params, callbackData, callbacks) {
   var url = '/messages/cancel-scheduled.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.messages.reschedule = function(params, callbackData, callbacks) {
   var url = '/messages/reschedule.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.tags = {};

endpoint.tags.list = function(params, callbackData, callbacks) {
   var url = '/tags/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.tags.delete = function(params, callbackData, callbacks) {
   var url = '/tags/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.tags.info = function(params, callbackData, callbacks) {
   var url = '/tags/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.tags.timeSeries = function(params, callbackData, callbacks) {
   var url = '/tags/time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.tags.allTimeSeries = function(params, callbackData, callbacks) {
   var url = '/tags/all-time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.rejects = {};

endpoint.rejects.add = function(params, callbackData, callbacks) {
   var url = '/rejects/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.rejects.list = function(params, callbackData, callbacks) {
   var url = '/rejects/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.rejects.delete = function(params, callbackData, callbacks) {
   var url = '/rejects/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.whitelists = {};

endpoint.whitelists.add = function(params, callbackData, callbacks) {
   var url = '/whitelists/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.whitelists.list = function(params, callbackData, callbacks) {
   var url = '/whitelists/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.whitelists.delete = function(params, callbackData, callbacks) {
   var url = '/whitelists/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders = {};

endpoint.senders.list = function(params, callbackData, callbacks) {
   var url = '/senders/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.domains = function(params, callbackData, callbacks) {
   var url = '/senders/domains.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.addDomain = function(params, callbackData, callbacks) {
   var url = '/senders/add-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.checkDomain = function(params, callbackData, callbacks) {
   var url = '/senders/check-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.verifyDomain = function(params, callbackData, callbacks) {
   var url = '/senders/verify-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.info = function(params, callbackData, callbacks) {
   var url = '/senders/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.senders.timeSeries = function(params, callbackData, callbacks) {
   var url = '/senders/time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.urls = {};

endpoint.urls.list = function(params, callbackData, callbacks) {
   var url = '/urls/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.urls.search = function(params, callbackData, callbacks) {
   var url = '/urls/search.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.urls.timeSeries = function(params, callbackData, callbacks) {
   var url = '/urls/time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.urls.trackingDomains = function(params, callbackData, callbacks) {
   var url = '/urls/tracking-domains.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.urls.checkTrackingDomain = function(params, callbackData, callbacks) {
   var url = '/urls/check-tracking-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates = {};

endpoint.templates.add = function(params, callbackData, callbacks) {
   var url = '/templates/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.info = function(params, callbackData, callbacks) {
   var url = '/templates/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.update = function(params, callbackData, callbacks) {
   var url = '/templates/update.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.publish = function(params, callbackData, callbacks) {
   var url = '/templates/publish.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.delete = function(params, callbackData, callbacks) {
   var url = '/templates/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.list = function(params, callbackData, callbacks) {
   var url = '/templates/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.timeSeries = function(params, callbackData, callbacks) {
   var url = '/templates/time-series.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.templates.render = function(params, callbackData, callbacks) {
   var url = '/templates/render.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.webhooks = {};

endpoint.webhooks.list = function(params, callbackData, callbacks) {
   var url = '/webhooks/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.webhooks.add = function(params, callbackData, callbacks) {
   var url = '/webhooks/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.webhooks.info = function(params, callbackData, callbacks) {
   var url = '/webhooks/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.webhooks.update = function(params, callbackData, callbacks) {
   var url = '/webhooks/update.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.webhooks.delete = function(params, callbackData, callbacks) {
   var url = '/webhooks/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts = {};

endpoint.subaccounts.list = function(params, callbackData, callbacks) {
   var url = '/subaccounts/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.add = function(params, callbackData, callbacks) {
   var url = '/subaccounts/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.info = function(params, callbackData, callbacks) {
   var url = '/subaccounts/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.update = function(params, callbackData, callbacks) {
   var url = '/subaccounts/update.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.delete = function(params, callbackData, callbacks) {
   var url = '/subaccounts/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.pause = function(params, callbackData, callbacks) {
   var url = '/subaccounts/pause.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.subaccounts.resume = function(params, callbackData, callbacks) {
   var url = '/subaccounts/resume.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound = {};

endpoint.inbound.domains = function(params, callbackData, callbacks) {
   var url = '/inbound/domains.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.addDomain = function(params, callbackData, callbacks) {
   var url = '/inbound/add-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.checkDomain = function(params, callbackData, callbacks) {
   var url = '/inbound/check-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.deleteDomain = function(params, callbackData, callbacks) {
   var url = '/inbound/delete-domain.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.routes = function(params, callbackData, callbacks) {
   var url = '/inbound/routes.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.addRoute = function(params, callbackData, callbacks) {
   var url = '/inbound/add-route.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.updateRoute = function(params, callbackData, callbacks) {
   var url = '/inbound/update-route.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.deleteRoute = function(params, callbackData, callbacks) {
   var url = '/inbound/delete-route.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.inbound.sendRaw = function(params, callbackData, callbacks) {
   var url = '/inbound/send-raw.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.exports = {};

endpoint.exports.info = function(params, callbackData, callbacks) {
   var url = '/exports/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.exports.list = function(params, callbackData, callbacks) {
   var url = '/exports/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.exports.rejects = function(params, callbackData, callbacks) {
   var url = '/exports/rejects.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.exports.whitelist = function(params, callbackData, callbacks) {
   var url = '/exports/whitelist.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.exports.activity = function(params, callbackData, callbacks) {
   var url = '/exports/activity.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips = {};

endpoint.ips.list = function(params, callbackData, callbacks) {
   var url = '/ips/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.info = function(params, callbackData, callbacks) {
   var url = '/ips/info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.provision = function(params, callbackData, callbacks) {
   var url = '/ips/provision.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.startWarmup = function(params, callbackData, callbacks) {
   var url = '/ips/start-warmup.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.cancelWarmup = function(params, callbackData, callbacks) {
   var url = '/ips/cancel-warmup.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.setPool = function(params, callbackData, callbacks) {
   var url = '/ips/set-pool.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.delete = function(params, callbackData, callbacks) {
   var url = '/ips/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.listPools = function(params, callbackData, callbacks) {
   var url = '/ips/list-pools.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.poolInfo = function(params, callbackData, callbacks) {
   var url = '/ips/pool-info.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.createPool = function(params, callbackData, callbacks) {
   var url = '/ips/create-pool.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.deletePool = function(params, callbackData, callbacks) {
   var url = '/ips/delete-pool.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.checkCustomDns = function(params, callbackData, callbacks) {
   var url = '/ips/check-custom-dns.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.ips.setCustomDns = function(params, callbackData, callbacks) {
   var url = '/ips/set-custom-dns.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.metadata = {};

endpoint.metadata.list = function(params, callbackData, callbacks) {
   var url = '/metadata/list.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.metadata.add = function(params, callbackData, callbacks) {
   var url = '/metadata/add.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.metadata.update = function(params, callbackData, callbacks) {
   var url = '/metadata/update.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

endpoint.metadata.delete = function(params, callbackData, callbacks) {
   var url = '/metadata/delete.json';
   sys.logs.debug('[Mandrill] POST from: ' + url);
   return endpoint.post(url, params, callbackData, callbacks);
};

