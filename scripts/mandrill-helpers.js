////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

var urlsData = {
	"post": {
		"allowlists.add": "/allowlists/add",
		"allowlists.list": "/allowlists/list",
		"allowlists.delete": "/allowlists/delete",
		"exports.activity": "/exports/activity",
		"exports.info": "/exports/info",
		"exports.list": "/exports/list",
		"exports.rejects": "/exports/rejects",
		"exports.whitelist": "/exports/whitelist",
		"inbound.addDomain": "/inbound/add-domain",
		"inbound.addRoute": "/inbound/add-route",
		"inbound.checkDomain": "/inbound/check-domain",
		"inbound.deleteDomain": "/inbound/delete-domain",
		"inbound.deleteRoute": "/inbound/delete-route",
		"inbound.domains": "/inbound/domains",
		"inbound.routes": "/inbound/routes",
		"inbound.sendRaw": "/inbound/send-raw",
		"inbound.updateRoute": "/inbound/update-route",
		"ips.cancelWarmup": "/ips/cancel-warmup",
		"ips.checkCustomDns": "/ips/check-custom-dns",
		"ips.createPool": "/ips/create-pool",
		"ips.delete": "/ips/delete",
		"ips.deletePool": "/ips/delete-pool",
		"ips.info": "/ips/info",
		"ips.list": "/ips/list",
		"ips.listPools": "/ips/list-pools",
		"ips.poolInfo": "/ips/pool-info",
		"ips.provision": "/ips/provision",
		"ips.setCustomDns": "/ips/set-custom-dns",
		"ips.setPool": "/ips/set-pool",
		"ips.startWarmup": "/ips/start-warmup",
		"messages.cancelScheduled": "/messages/cancel-scheduled",
		"messages.content": "/messages/content",
		"messages.info": "/messages/info",
		"messages.listScheduled": "/messages/list-scheduled",
		"messages.parse": "/messages/parse",
		"messages.reschedule": "/messages/reschedule",
		"messages.search": "/messages/search",
		"messages.searchTimeSeries": "/messages/search-time-series",
		"messages.send": "/messages/send",
		"messages.sendRaw": "/messages/send-raw",
		"messages.sendTemplate": "/messages/send-template",
		"metadata.add": "/metadata/add",
		"metadata.delete": "/metadata/delete",
		"metadata.list": "/metadata/list",
		"metadata.update": "/metadata/update",
		"rejects.add": "/rejects/add",
		"rejects.delete": "/rejects/delete",
		"rejects.list": "/rejects/list",
		"senders.addDomain": "/senders/add-domain",
		"senders.checkDomain": "/senders/check-domain",
		"senders.domains": "/senders/domains",
		"senders.info": "/senders/info",
		"senders.list": "/senders/list",
		"senders.timeSeries": "/senders/time-series",
		"senders.verifyDomain": "/senders/verify-domain",
		"subaccounts.add": "/subaccounts/add",
		"subaccounts.delete": "/subaccounts/delete",
		"subaccounts.info": "/subaccounts/info",
		"subaccounts.list": "/subaccounts/list",
		"subaccounts.pause": "/subaccounts/pause",
		"subaccounts.resume": "/subaccounts/resume",
		"subaccounts.update": "/subaccounts/update",
		"tags.allTimeSeries": "/tags/all-time-series",
		"tags.delete": "/tags/delete",
		"tags.info": "/tags/info",
		"tags.list": "/tags/list",
		"tags.timeSeries": "/tags/time-series",
		"templates.add": "/templates/add",
		"templates.delete": "/templates/delete",
		"templates.info": "/templates/info",
		"templates.list": "/templates/list",
		"templates.publish": "/templates/publish",
		"templates.render": "/templates/render",
		"templates.timeSeries": "/templates/time-series",
		"templates.update": "/templates/update",
		"urls.checkTrackingDomain": "/urls/check-tracking-domain",
		"urls.list": "/urls/list",
		"urls.search": "/urls/search",
		"urls.timeSeries": "/urls/time-series",
		"urls.trackingDomains": "/urls/tracking-domains",
		"users.info": "/users/info",
		"users.ping": "/users/ping",
		"users.ping2": "/users/ping2",
		"users.senders": "/users/senders",
		"webhooks.add": "/webhooks/add",
		"webhooks.delete": "/webhooks/delete",
		"webhooks.info": "/webhooks/info",
		"webhooks.list": "/webhooks/list",
		"webhooks.update": "/webhooks/update",
		"whitelists.add": "/whitelists/add",
		"whitelists.delete": "/whitelists/delete",
		"whitelists.list": "/whitelists/list"
	}
};

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, function () {
                if (typeof (args[i]) != 'string') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
};

endpoint.allowlists = {};

endpoint.allowlists.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['allowlists.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.allowlists.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['allowlists.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.allowlists.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['allowlists.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports = {};

endpoint.exports.activity = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['exports.activity']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['exports.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['exports.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.rejects = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['exports.rejects']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.whitelist = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['exports.whitelist']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound = {};

endpoint.inbound.addDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.addDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.addRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.addRoute']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.checkDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.checkDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.deleteDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.deleteDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.deleteRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.deleteRoute']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.domains = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.domains']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.routes = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.routes']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.sendRaw = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.sendRaw']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.updateRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['inbound.updateRoute']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips = {};

endpoint.ips.cancelWarmup = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.cancelWarmup']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.checkCustomDns = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.checkCustomDns']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.createPool = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.createPool']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.deletePool = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.deletePool']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.listPools = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.listPools']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.poolInfo = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.poolInfo']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.provision = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.provision']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.setCustomDns = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.setCustomDns']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.setPool = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.setPool']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.startWarmup = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['ips.startWarmup']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages = {};

endpoint.messages.cancelScheduled = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.cancelScheduled']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.content = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.content']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.listScheduled = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.listScheduled']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.parse = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.parse']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.reschedule = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.reschedule']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.search = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.search']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.searchTimeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.searchTimeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.send = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.send']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.sendRaw = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.sendRaw']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.sendTemplate = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['messages.sendTemplate']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata = {};

endpoint.metadata.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['metadata.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['metadata.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['metadata.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.update = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['metadata.update']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects = {};

endpoint.rejects.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['rejects.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['rejects.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['rejects.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders = {};

endpoint.senders.addDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.addDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.checkDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.checkDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.domains = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.domains']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.timeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.verifyDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['senders.verifyDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts = {};

endpoint.subaccounts.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.pause = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.pause']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.resume = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.resume']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.update = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['subaccounts.update']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags = {};

endpoint.tags.allTimeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['tags.allTimeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['tags.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['tags.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['tags.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['tags.timeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates = {};

endpoint.templates.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.publish = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.publish']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.render = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.render']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.timeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.update = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['templates.update']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls = {};

endpoint.urls.checkTrackingDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['urls.checkTrackingDomain']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['urls.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.search = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['urls.search']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['urls.timeSeries']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.trackingDomains = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['urls.trackingDomains']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users = {};

endpoint.users.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['users.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.ping = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['users.ping']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.ping2 = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['users.ping2']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.senders = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['users.senders']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks = {};

endpoint.webhooks.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['webhooks.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['webhooks.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.info = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['webhooks.info']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['webhooks.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.update = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['webhooks.update']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists = {};

endpoint.whitelists.add = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['whitelists.add']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['whitelists.delete']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists.list = function(httpOptions, callbackData, callbacks) {
	var url = parse(urlsData['post']['whitelists.list']);
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
