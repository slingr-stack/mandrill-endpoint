 ////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////


var parse = function parse(str) {
    try {
        if (arguments.length > 1) {
            let args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
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
	var url = parse('/allowlists/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.allowlists.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/allowlists/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.allowlists.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/allowlists/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports = {};

endpoint.exports.activity = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/activity', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.allowlist = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/allowlist', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.rejects = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/rejects', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.exports.whitelist = function(httpOptions, callbackData, callbacks) {
	var url = parse('/exports/whitelist', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound = {};

endpoint.inbound.addDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/add-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.addRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/add-route', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.checkDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/check-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.deleteDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/delete-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.deleteRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/delete-route', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.domains = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/domains', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.routes = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/routes', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.sendRaw = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/send-raw', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.inbound.updateRoute = function(httpOptions, callbackData, callbacks) {
	var url = parse('/inbound/update-route', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips = {};

endpoint.ips.cancelWarmup = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/cancel-warmup', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.checkCustomDns = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/check-custom-dns', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.createPool = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/create-pool', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.deletePool = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/delete-pool', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.listPools = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/list-pools', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.poolInfo = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/pool-info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.provision = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/provision', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.setCustomDns = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/set-custom-dns', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.setPool = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/set-pool', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.ips.startWarmup = function(httpOptions, callbackData, callbacks) {
	var url = parse('/ips/start-warmup', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages = {};

endpoint.messages.cancelScheduled = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/cancel-scheduled', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.content = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/content', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.listScheduled = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/list-scheduled', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.parse = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/parse', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.reschedule = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/reschedule', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.search = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/search', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.searchTimeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/search-time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.send = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/send', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.sendRaw = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/send-raw', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.messages.sendTemplate = function(httpOptions, callbackData, callbacks) {
	var url = parse('/messages/send-template', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata = {};

endpoint.metadata.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/metadata/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/metadata/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/metadata/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.metadata.update = function(httpOptions, callbackData, callbacks) {
	var url = parse('/metadata/update', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects = {};

endpoint.rejects.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/rejects/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/rejects/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.rejects.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/rejects/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders = {};

endpoint.senders.addDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/add-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.checkDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/check-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.domains = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/domains', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.senders.verifyDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/senders/verify-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts = {};

endpoint.subaccounts.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.pause = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/pause', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.resume = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/resume', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.subaccounts.update = function(httpOptions, callbackData, callbacks) {
	var url = parse('/subaccounts/update', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags = {};

endpoint.tags.allTimeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/tags/all-time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/tags/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/tags/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/tags/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.tags.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/tags/time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates = {};

endpoint.templates.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.publish = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/publish', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.render = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/render', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.templates.update = function(httpOptions, callbackData, callbacks) {
	var url = parse('/templates/update', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls = {};

endpoint.urls.checkTrackingDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/check-tracking-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.search = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/search', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.timeSeries = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/time-series', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.trackingDomains = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/tracking-domains', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.urls.addTrackingDomain = function(httpOptions, callbackData, callbacks) {
	var url = parse('/urls/add-tracking-domain', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users = {};

endpoint.users.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/users/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.ping = function(httpOptions, callbackData, callbacks) {
	var url = parse('/users/ping', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.ping2 = function(httpOptions, callbackData, callbacks) {
	var url = parse('/users/ping2', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.users.senders = function(httpOptions, callbackData, callbacks) {
	var url = parse('/users/senders', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks = {};

endpoint.webhooks.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/webhooks/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/webhooks/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.info = function(httpOptions, callbackData, callbacks) {
	var url = parse('/webhooks/info', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/webhooks/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.webhooks.update = function(httpOptions, callbackData, callbacks) {
	var url = parse('/webhooks/update', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists = {};

endpoint.whitelists.add = function(httpOptions, callbackData, callbacks) {
	var url = parse('/whitelists/add', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists.delete = function(httpOptions, callbackData, callbacks) {
	var url = parse('/whitelists/delete', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
endpoint.whitelists.list = function(httpOptions, callbackData, callbacks) {
	var url = parse('/whitelists/list', );
	sys.logs.debug('[mandrill] POST from: ' + url);
	return endpoint.post(url, httpOptions, callbackData, callbacks);
};
