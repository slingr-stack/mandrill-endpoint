////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

endpoint.users = {};

endpoint.users.info = {};

endpoint.users.ping = {};

endpoint.users.ping2 = {};

endpoint.users.senders = {};

endpoint.messages = {};

endpoint.messages.send = {};

endpoint.messages.sendTemplate = {};

endpoint.messages.search = {};

endpoint.messages.searchTimeSeries = {};

endpoint.messages.info = {};

endpoint.messages.content = {};

endpoint.messages.parse = {};

endpoint.messages.sendRaw = {};

endpoint.messages.listScheduled = {};

endpoint.messages.cancelScheduled = {};

endpoint.messages.reschedule = {};

endpoint.tags = {};

endpoint.tags.list = {};

endpoint.tags.delete = {};

endpoint.tags.info = {};

endpoint.tags.timeSeries = {};

endpoint.tags.allTimeSeries = {};

endpoint.rejects = {};

endpoint.rejects.add = {};

endpoint.rejects.list = {};

endpoint.rejects.delete = {};

endpoint.whitelists = {};

endpoint.whitelists.add = {};

endpoint.whitelists.list = {};

endpoint.whitelists.delete = {};

endpoint.senders = {};

endpoint.senders.list = {};

endpoint.senders.domains = {};

endpoint.senders.addDomain = {};

endpoint.senders.checkDomain = {};

endpoint.senders.verifyDomain = {};

endpoint.senders.info = {};

endpoint.senders.timeSeries = {};

endpoint.urls = {};

endpoint.urls.list = {};

endpoint.urls.search = {};

endpoint.urls.timeSeries = {};

endpoint.urls.trackingDomains = {};

endpoint.urls.checkTrackingDomain = {};

endpoint.templates = {};

endpoint.templates.add = {};

endpoint.templates.info = {};

endpoint.templates.update = {};

endpoint.templates.publish = {};

endpoint.templates.delete = {};

endpoint.templates.list = {};

endpoint.templates.timeSeries = {};

endpoint.templates.render = {};

endpoint.webhooks = {};

endpoint.webhooks.list = {};

endpoint.webhooks.add = {};

endpoint.webhooks.info = {};

endpoint.webhooks.update = {};

endpoint.webhooks.delete = {};

endpoint.subaccounts = {};

endpoint.subaccounts.list = {};

endpoint.subaccounts.add = {};

endpoint.subaccounts.info = {};

endpoint.subaccounts.update = {};

endpoint.subaccounts.delete = {};

endpoint.subaccounts.pause = {};

endpoint.subaccounts.resume = {};

endpoint.inbound = {};

endpoint.inbound.domains = {};

endpoint.inbound.addDomain = {};

endpoint.inbound.checkDomain = {};

endpoint.inbound.deleteDomain = {};

endpoint.inbound.routes = {};

endpoint.inbound.addRoute = {};

endpoint.inbound.updateRoute = {};

endpoint.inbound.deleteRoute = {};

endpoint.inbound.sendRaw = {};

endpoint.exports = {};

endpoint.exports.info = {};

endpoint.exports.list = {};

endpoint.exports.rejects = {};

endpoint.exports.whitelist = {};

endpoint.exports.activity = {};

endpoint.ips = {};

endpoint.ips.list = {};

endpoint.ips.info = {};

endpoint.ips.provision = {};

endpoint.ips.startWarmup = {};

endpoint.ips.cancelWarmup = {};

endpoint.ips.setPool = {};

endpoint.ips.delete = {};

endpoint.ips.listPools = {};

endpoint.ips.poolInfo = {};

endpoint.ips.createPool = {};

endpoint.ips.deletePool = {};

endpoint.ips.checkCustomDns = {};

endpoint.ips.setCustomDns = {};

endpoint.metadata = {};

endpoint.metadata.list = {};

endpoint.metadata.add = {};

endpoint.metadata.update = {};

endpoint.metadata.delete = {};

endpoint.users.info.post = function(httpOptions) {
	var url = parse('/users/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.ping.post = function(httpOptions) {
	var url = parse('/users/ping');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.ping2.post = function(httpOptions) {
	var url = parse('/users/ping2');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.senders.post = function(httpOptions) {
	var url = parse('/users/senders');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.send.post = function(httpOptions) {
	var url = parse('/messages/send');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.sendTemplate.post = function(httpOptions) {
	var url = parse('/messages/send-template');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.search.post = function(httpOptions) {
	var url = parse('/messages/search');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.searchTimeSeries.post = function(httpOptions) {
	var url = parse('/messages/search-time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.info.post = function(httpOptions) {
	var url = parse('/messages/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.content.post = function(httpOptions) {
	var url = parse('/messages/content');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.parse.post = function(httpOptions) {
	var url = parse('/messages/parse');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.sendRaw.post = function(httpOptions) {
	var url = parse('/messages/send-raw');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.listScheduled.post = function(httpOptions) {
	var url = parse('/messages/list-scheduled');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.cancelScheduled.post = function(httpOptions) {
	var url = parse('/messages/cancel-scheduled');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.messages.reschedule.post = function(httpOptions) {
	var url = parse('/messages/reschedule');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tags.list.post = function(httpOptions) {
	var url = parse('/tags/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tags.delete.post = function(httpOptions) {
	var url = parse('/tags/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tags.info.post = function(httpOptions) {
	var url = parse('/tags/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tags.timeSeries.post = function(httpOptions) {
	var url = parse('/tags/time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tags.allTimeSeries.post = function(httpOptions) {
	var url = parse('/tags/all-time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.rejects.add.post = function(httpOptions) {
	var url = parse('/rejects/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.rejects.list.post = function(httpOptions) {
	var url = parse('/rejects/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.rejects.delete.post = function(httpOptions) {
	var url = parse('/rejects/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.whitelists.add.post = function(httpOptions) {
	var url = parse('/whitelists/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.whitelists.list.post = function(httpOptions) {
	var url = parse('/whitelists/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.whitelists.delete.post = function(httpOptions) {
	var url = parse('/whitelists/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.list.post = function(httpOptions) {
	var url = parse('/senders/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.domains.post = function(httpOptions) {
	var url = parse('/senders/domains');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.addDomain.post = function(httpOptions) {
	var url = parse('/senders/add-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.checkDomain.post = function(httpOptions) {
	var url = parse('/senders/check-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.verifyDomain.post = function(httpOptions) {
	var url = parse('/senders/verify-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.info.post = function(httpOptions) {
	var url = parse('/senders/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.senders.timeSeries.post = function(httpOptions) {
	var url = parse('/senders/time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.urls.list.post = function(httpOptions) {
	var url = parse('/urls/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.urls.search.post = function(httpOptions) {
	var url = parse('/urls/search');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.urls.timeSeries.post = function(httpOptions) {
	var url = parse('/urls/time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.urls.trackingDomains.post = function(httpOptions) {
	var url = parse('/urls/tracking-domains');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.urls.checkTrackingDomain.post = function(httpOptions) {
	var url = parse('/urls/check-tracking-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.add.post = function(httpOptions) {
	var url = parse('/templates/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.info.post = function(httpOptions) {
	var url = parse('/templates/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.update.post = function(httpOptions) {
	var url = parse('/templates/update');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.publish.post = function(httpOptions) {
	var url = parse('/templates/publish');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.delete.post = function(httpOptions) {
	var url = parse('/templates/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.list.post = function(httpOptions) {
	var url = parse('/templates/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.timeSeries.post = function(httpOptions) {
	var url = parse('/templates/time-series');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.templates.render.post = function(httpOptions) {
	var url = parse('/templates/render');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.webhooks.list.post = function(httpOptions) {
	var url = parse('/webhooks/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.webhooks.add.post = function(httpOptions) {
	var url = parse('/webhooks/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.webhooks.info.post = function(httpOptions) {
	var url = parse('/webhooks/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.webhooks.update.post = function(httpOptions) {
	var url = parse('/webhooks/update');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.webhooks.delete.post = function(httpOptions) {
	var url = parse('/webhooks/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.list.post = function(httpOptions) {
	var url = parse('/subaccounts/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.add.post = function(httpOptions) {
	var url = parse('/subaccounts/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.info.post = function(httpOptions) {
	var url = parse('/subaccounts/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.update.post = function(httpOptions) {
	var url = parse('/subaccounts/update');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.delete.post = function(httpOptions) {
	var url = parse('/subaccounts/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.pause.post = function(httpOptions) {
	var url = parse('/subaccounts/pause');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.subaccounts.resume.post = function(httpOptions) {
	var url = parse('/subaccounts/resume');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.domains.post = function(httpOptions) {
	var url = parse('/inbound/domains');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.addDomain.post = function(httpOptions) {
	var url = parse('/inbound/add-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.checkDomain.post = function(httpOptions) {
	var url = parse('/inbound/check-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.deleteDomain.post = function(httpOptions) {
	var url = parse('/inbound/delete-domain');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.routes.post = function(httpOptions) {
	var url = parse('/inbound/routes');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.addRoute.post = function(httpOptions) {
	var url = parse('/inbound/add-route');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.updateRoute.post = function(httpOptions) {
	var url = parse('/inbound/update-route');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.deleteRoute.post = function(httpOptions) {
	var url = parse('/inbound/delete-route');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.inbound.sendRaw.post = function(httpOptions) {
	var url = parse('/inbound/send-raw');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.exports.info.post = function(httpOptions) {
	var url = parse('/exports/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.exports.list.post = function(httpOptions) {
	var url = parse('/exports/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.exports.rejects.post = function(httpOptions) {
	var url = parse('/exports/rejects');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.exports.whitelist.post = function(httpOptions) {
	var url = parse('/exports/whitelist');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.exports.activity.post = function(httpOptions) {
	var url = parse('/exports/activity');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.list.post = function(httpOptions) {
	var url = parse('/ips/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.info.post = function(httpOptions) {
	var url = parse('/ips/info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.provision.post = function(httpOptions) {
	var url = parse('/ips/provision');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.startWarmup.post = function(httpOptions) {
	var url = parse('/ips/start-warmup');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.cancelWarmup.post = function(httpOptions) {
	var url = parse('/ips/cancel-warmup');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.setPool.post = function(httpOptions) {
	var url = parse('/ips/set-pool');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.delete.post = function(httpOptions) {
	var url = parse('/ips/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.listPools.post = function(httpOptions) {
	var url = parse('/ips/list-pools');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.poolInfo.post = function(httpOptions) {
	var url = parse('/ips/pool-info');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.createPool.post = function(httpOptions) {
	var url = parse('/ips/create-pool');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.deletePool.post = function(httpOptions) {
	var url = parse('/ips/delete-pool');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.checkCustomDns.post = function(httpOptions) {
	var url = parse('/ips/check-custom-dns');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.ips.setCustomDns.post = function(httpOptions) {
	var url = parse('/ips/set-custom-dns');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.metadata.list.post = function(httpOptions) {
	var url = parse('/metadata/list');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.metadata.add.post = function(httpOptions) {
	var url = parse('/metadata/add');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.metadata.update.post = function(httpOptions) {
	var url = parse('/metadata/update');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.metadata.delete.post = function(httpOptions) {
	var url = parse('/metadata/delete');
    sys.logs.debug('[mandrill] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.post = function(url, httpOptions) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.put = function(url, httpOptions) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options);
};

endpoint.patch = function(url, httpOptions) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._patch(options);
};

endpoint.delete = function(url, httpOptions) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.head = function(url, httpOptions) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._head(options);
};

endpoint.options = function(url, httpOptions) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._options(options);
};


///////////////////////
//  Private helpers  //
///////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);

var parse = function (str) {
  try {
    if (arguments.length > 1) {
      var args = arguments[1], i = 0;
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
}