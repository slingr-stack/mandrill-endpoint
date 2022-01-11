---
title: Mandrill endpoint
keywords: 
last_updated: November 21, 2021
tags: []
summary: "Detailed description of the API of the Mandrill endpoint."
---

# Overview

Mandrill is an email infrastructure service offered as an add-on for MailChimp that you can use to send personalized, 
one-to-one e-commerce emails, or automated transactional emails.

Some of the features are:

- Shortcuts for the REST API
- Helpers to convert date times

In most cases you will be using the provided shortcuts to access the API. For example, you could use the REST API
directly by doing an HTTP request like this:

```js
var res = app.endpoints.mandrill.post('/users/info', {});
```
However, you probably want to use the shortcuts:
```js
var res = app.endpoints.mandrill.users.info();
```
You can see more information about that in the [shortcuts section](#shortcuts).

These shortcuts are based on the [Mandrill REST API](https://mandrillapp.com/api/docs/) and were generated using the [slingr-helpgen](https://github.com/slingr-stack/slingr-helpgen) tool.


# Configuration

- Check the setting page to create a new API key: [Settings page](https://mandrillapp.com/settings/)
- Configure the inbound domain in order to receive messages and notifications: [Inbound Email Processing Overview](https://mandrill.zendesk.com/hc/en-us/articles/205583197-Inbound-Email-Processing-Overview)
- You will need to configure the Webhook URL as a route inside of the registered inbound domain: [Inbound page](https://mandrillapp.com/inbound)
- A new webhook (as well the one that we use as inbound webhook) can be configured to receive different kind of message and sync events: [Webhooks page](https://mandrillapp.com/settings/webhooks)


## API key
API to access to Mandrill service


## Sender name	
Name of the sender of the emails

## Sender account
Account to use as sender of the emails (Do not include the @ and the domain).

## Sender domain
Domain to use as sender of the emails (Do not include the @ and the account name).

## Redirect emails
If it is enabled, all the emails will be sent to the redirect address instead to the real ones. This parameter is available only in dev environments.

## Redirect to address
Redirect address used as receiver of all the emails when the redirect option is enabled. This parameter is available only in dev environments.

# Quick start

One common integration case with Mandrill is send an email.
You can do so like this:
```js
var res = app.endpoints.mandrill.messages.send({
 "message": {
   "html": "<p>Example HTML content</p>",
   "text": "Example text content",
   "subject": "example subject",
   "from_name": "Example Name",
   "to": [
     {
       "email": "recipient.email@example.com",
       "name": "Recipient Name",
       "type": "to"
     }
   ]
 }
});
```
Another common use for mandrill is to send mails with a template.
You can also do that like the following:
```js
var res = app.endpoints.mandrill.messages.sendTemplate({
  "template_name": "exampleTemplate",
  "template_content": [
    {
      "name": "someMcEditRegion",
      "content": "someContent"
    }
  ],
  "message": {
   "html": "<p>Aditional example HTML content</p>",
   "text": "Aditional Example plain text content",
   "subject": "example subject",
   "from_name": "Example Name",
   "to": [
     {
       "email": "recipient.email@example.com",
       "name": "Recipient Name",
       "type": "to"
     }
   ]
 }
});
```
For additional parameters when sending mails with or without template check the [Mandrill API - Messages](https://mailchimp.com/developer/transactional/api/messages/).

# Javascript API

The Javascript API of the mandrill endpoint has three pieces:

- **HTTP requests**: These allows to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `POST` requests to the [mandrill API](https://mailchimp.com/developer/transactional/api/) like this:
```js
var response = app.endpoints.mandrill.post('/urls/add-tracking-domain', body)
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the endpoint:
<details>
    <summary>Click here to see all the helpers</summary>

    ```javascript
    /*
    * API URL: '/allowlists/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/allowlists/add-email-to-allowlist/
	*/
    app.endpoints.mandrillallowlists.add(body, callbackData, callbacks);

    /*
    * API URL: '/allowlists/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/allowlists/list-allowlisted-emails/
	*/
    app.endpoints.mandrillallowlists.list(body, callbackData, callbacks);

    /*
    * API URL: '/allowlists/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/allowlists/remove-email-from-allowlist/
	*/
    app.endpoints.mandrillallowlists.delete(body, callbackData, callbacks);

    /*
    * API URL: '/exports/activity'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/export-activity-history/
	*/
    app.endpoints.mandrillexports.activity(body, callbackData, callbacks);

    /*
    * API URL: '/exports/allowlist'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/export-allowlist/
	*/
    app.endpoints.mandrillexports.allowlist(body, callbackData, callbacks);

    /*
    * API URL: '/exports/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/view-export-info/
	*/
    app.endpoints.mandrillexports.info(body, callbackData, callbacks);

    /*
    * API URL: '/exports/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/list-exports/
	*/
    app.endpoints.mandrillexports.list(body, callbackData, callbacks);

    /*
    * API URL: '/exports/rejects'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/export-denylist/
	*/
    app.endpoints.mandrillexports.rejects(body, callbackData, callbacks);

    /*
    * API URL: '/exports/whitelist'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/exports/export-allowlist/
	*/
    app.endpoints.mandrillexports.whitelist(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/add-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/add-inbound-domain/
	*/
    app.endpoints.mandrillinbound.addDomain(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/add-route'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/add-mailbox-route/
	*/
    app.endpoints.mandrillinbound.addRoute(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/check-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/check-domain-settings/
	*/
    app.endpoints.mandrillinbound.checkDomain(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/delete-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/delete-inbound-domain/
	*/
    app.endpoints.mandrillinbound.deleteDomain(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/delete-route'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/delete-mailbox-route/
	*/
    app.endpoints.mandrillinbound.deleteRoute(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/domains'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/list-inbound-domains/
	*/
    app.endpoints.mandrillinbound.domains(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/routes'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/list-mailbox-routes/
	*/
    app.endpoints.mandrillinbound.routes(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/send-raw'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/send-mime-document/
	*/
    app.endpoints.mandrillinbound.sendRaw(body, callbackData, callbacks);

    /*
    * API URL: '/inbound/update-route'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/inbound/update-mailbox-route/
	*/
    app.endpoints.mandrillinbound.updateRoute(body, callbackData, callbacks);

    /*
    * API URL: '/ips/cancel-warmup'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/cancel-ip-warmup/
	*/
    app.endpoints.mandrillips.cancelWarmup(body, callbackData, callbacks);

    /*
    * API URL: '/ips/check-custom-dns'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/test-custom-dns/
	*/
    app.endpoints.mandrillips.checkCustomDns(body, callbackData, callbacks);

    /*
    * API URL: '/ips/create-pool'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/add-ip-pool/
	*/
    app.endpoints.mandrillips.createPool(body, callbackData, callbacks);

    /*
    * API URL: '/ips/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/delete-ip-address/
	*/
    app.endpoints.mandrillips.delete(body, callbackData, callbacks);

    /*
    * API URL: '/ips/delete-pool'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/delete-ip-pool/
	*/
    app.endpoints.mandrillips.deletePool(body, callbackData, callbacks);

    /*
    * API URL: '/ips/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/get-ip-info/
	*/
    app.endpoints.mandrillips.info(body, callbackData, callbacks);

    /*
    * API URL: '/ips/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/list-ip-addresses/
	*/
    app.endpoints.mandrillips.list(body, callbackData, callbacks);

    /*
    * API URL: '/ips/list-pools'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/list-ip-pools/
	*/
    app.endpoints.mandrillips.listPools(body, callbackData, callbacks);

    /*
    * API URL: '/ips/pool-info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/get-ip-pool-info/
	*/
    app.endpoints.mandrillips.poolInfo(body, callbackData, callbacks);

    /*
    * API URL: '/ips/provision'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/request-additional-ip/
	*/
    app.endpoints.mandrillips.provision(body, callbackData, callbacks);

    /*
    * API URL: '/ips/set-custom-dns'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/set-custom-dns/
	*/
    app.endpoints.mandrillips.setCustomDns(body, callbackData, callbacks);

    /*
    * API URL: '/ips/set-pool'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/move-ip-to-different-pool/
	*/
    app.endpoints.mandrillips.setPool(body, callbackData, callbacks);

    /*
    * API URL: '/ips/start-warmup'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/ips/start-ip-warmup/
	*/
    app.endpoints.mandrillips.startWarmup(body, callbackData, callbacks);

    /*
    * API URL: '/messages/cancel-scheduled'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/cancel-scheduled-email/
	*/
    app.endpoints.mandrillmessages.cancelScheduled(body, callbackData, callbacks);

    /*
    * API URL: '/messages/content'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/get-message-content/
	*/
    app.endpoints.mandrillmessages.content(body, callbackData, callbacks);

    /*
    * API URL: '/messages/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/get-message-info/
	*/
    app.endpoints.mandrillmessages.info(body, callbackData, callbacks);

    /*
    * API URL: '/messages/list-scheduled'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/list-scheduled-emails/
	*/
    app.endpoints.mandrillmessages.listScheduled(body, callbackData, callbacks);

    /*
    * API URL: '/messages/parse'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/parse-mime-document/
	*/
    app.endpoints.mandrillmessages.parse(body, callbackData, callbacks);

    /*
    * API URL: '/messages/reschedule'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/reschedule-email/
	*/
    app.endpoints.mandrillmessages.reschedule(body, callbackData, callbacks);

    /*
    * API URL: '/messages/search'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/search-messages-by-date/
	*/
    app.endpoints.mandrillmessages.search(body, callbackData, callbacks);

    /*
    * API URL: '/messages/search-time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/search-messages-by-hour/
	*/
    app.endpoints.mandrillmessages.searchTimeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/messages/send'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/send-new-message/
	*/
    app.endpoints.mandrillmessages.send(body, callbackData, callbacks);

    /*
    * API URL: '/messages/send-raw'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/send-mime-document/
	*/
    app.endpoints.mandrillmessages.sendRaw(body, callbackData, callbacks);

    /*
    * API URL: '/messages/send-template'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/messages/send-using-message-template/
	*/
    app.endpoints.mandrillmessages.sendTemplate(body, callbackData, callbacks);

    /*
    * API URL: '/metadata/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/metadata/add-metadata-field/
	*/
    app.endpoints.mandrillmetadata.add(body, callbackData, callbacks);

    /*
    * API URL: '/metadata/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/metadata/delete-metadata-field/
	*/
    app.endpoints.mandrillmetadata.delete(body, callbackData, callbacks);

    /*
    * API URL: '/metadata/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/metadata/list-metadata-fields/
	*/
    app.endpoints.mandrillmetadata.list(body, callbackData, callbacks);

    /*
    * API URL: '/metadata/update'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/metadata/update-metadata-field/
	*/
    app.endpoints.mandrillmetadata.update(body, callbackData, callbacks);

    /*
    * API URL: '/rejects/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/rejects/add-email-to-denylist/
	*/
    app.endpoints.mandrillrejects.add(body, callbackData, callbacks);

    /*
    * API URL: '/rejects/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/rejects/delete-email-from-denylist/
	*/
    app.endpoints.mandrillrejects.delete(body, callbackData, callbacks);

    /*
    * API URL: '/rejects/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/rejects/list-denylisted-emails/
	*/
    app.endpoints.mandrillrejects.list(body, callbackData, callbacks);

    /*
    * API URL: '/senders/add-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/add-sender-domain/
	*/
    app.endpoints.mandrillsenders.addDomain(body, callbackData, callbacks);

    /*
    * API URL: '/senders/check-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/check-domain-settings/
	*/
    app.endpoints.mandrillsenders.checkDomain(body, callbackData, callbacks);

    /*
    * API URL: '/senders/domains'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/list-sender-domains/
	*/
    app.endpoints.mandrillsenders.domains(body, callbackData, callbacks);

    /*
    * API URL: '/senders/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/get-sender-info/
	*/
    app.endpoints.mandrillsenders.info(body, callbackData, callbacks);

    /*
    * API URL: '/senders/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/list-account-senders/
	*/
    app.endpoints.mandrillsenders.list(body, callbackData, callbacks);

    /*
    * API URL: '/senders/time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/view-sender-history/
	*/
    app.endpoints.mandrillsenders.timeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/senders/verify-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/senders/verify-domain/
	*/
    app.endpoints.mandrillsenders.verifyDomain(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/add-subaccount/
	*/
    app.endpoints.mandrillsubaccounts.add(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/delete-subaccount/
	*/
    app.endpoints.mandrillsubaccounts.delete(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/get-subaccount-info/
	*/
    app.endpoints.mandrillsubaccounts.info(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/list-subaccounts/
	*/
    app.endpoints.mandrillsubaccounts.list(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/pause'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/pause-subaccount/
	*/
    app.endpoints.mandrillsubaccounts.pause(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/resume'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/resume-subaccount/
	*/
    app.endpoints.mandrillsubaccounts.resume(body, callbackData, callbacks);

    /*
    * API URL: '/subaccounts/update'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/subaccounts/update-subaccount/
	*/
    app.endpoints.mandrillsubaccounts.update(body, callbackData, callbacks);

    /*
    * API URL: '/tags/all-time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/tags/view-all-tags-history/
	*/
    app.endpoints.mandrilltags.allTimeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/tags/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/tags/delete-tag/
	*/
    app.endpoints.mandrilltags.delete(body, callbackData, callbacks);

    /*
    * API URL: '/tags/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/tags/get-tag-info/
	*/
    app.endpoints.mandrilltags.info(body, callbackData, callbacks);

    /*
    * API URL: '/tags/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/tags/list-tags/
	*/
    app.endpoints.mandrilltags.list(body, callbackData, callbacks);

    /*
    * API URL: '/tags/time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/tags/view-tag-history/
	*/
    app.endpoints.mandrilltags.timeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/templates/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/add-template/
	*/
    app.endpoints.mandrilltemplates.add(body, callbackData, callbacks);

    /*
    * API URL: '/templates/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/delete-template/
	*/
    app.endpoints.mandrilltemplates.delete(body, callbackData, callbacks);

    /*
    * API URL: '/templates/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/get-template-info/
	*/
    app.endpoints.mandrilltemplates.info(body, callbackData, callbacks);

    /*
    * API URL: '/templates/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/list-templates/
	*/
    app.endpoints.mandrilltemplates.list(body, callbackData, callbacks);

    /*
    * API URL: '/templates/publish'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/publish-template-content/
	*/
    app.endpoints.mandrilltemplates.publish(body, callbackData, callbacks);

    /*
    * API URL: '/templates/render'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/render-html-template/
	*/
    app.endpoints.mandrilltemplates.render(body, callbackData, callbacks);

    /*
    * API URL: '/templates/time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/get-template-history/
	*/
    app.endpoints.mandrilltemplates.timeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/templates/update'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/templates/update-template/
	*/
    app.endpoints.mandrilltemplates.update(body, callbackData, callbacks);

    /*
    * API URL: '/urls/check-tracking-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/check-cname-settings/
	*/
    app.endpoints.mandrillurls.checkTrackingDomain(body, callbackData, callbacks);

    /*
    * API URL: '/urls/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/list-most-clicked-urls/
	*/
    app.endpoints.mandrillurls.list(body, callbackData, callbacks);

    /*
    * API URL: '/urls/search'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/search-most-clicked-urls/
	*/
    app.endpoints.mandrillurls.search(body, callbackData, callbacks);

    /*
    * API URL: '/urls/time-series'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/get-url-history/
	*/
    app.endpoints.mandrillurls.timeSeries(body, callbackData, callbacks);

    /*
    * API URL: '/urls/tracking-domains'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/list-tracking-domains/
	*/
    app.endpoints.mandrillurls.trackingDomains(body, callbackData, callbacks);

    /*
    * API URL: '/urls/add-tracking-domain'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/urls/add-tracking-domains/
	*/
    app.endpoints.mandrillurls.addTrackingDomain(body, callbackData, callbacks);

    /*
    * API URL: '/users/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/users/get-user-info/
	*/
    app.endpoints.mandrillusers.info(body, callbackData, callbacks);

    /*
    * API URL: '/users/ping'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/users/ping/
	*/
    app.endpoints.mandrillusers.ping(body, callbackData, callbacks);

    /*
    * API URL: '/users/ping2'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/users/ping-2/
	*/
    app.endpoints.mandrillusers.ping2(body, callbackData, callbacks);

    /*
    * API URL: '/users/senders'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/users/list-account-senders/
	*/
    app.endpoints.mandrillusers.senders(body, callbackData, callbacks);

    /*
    * API URL: '/webhooks/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/webhooks/add-webhook/
	*/
    app.endpoints.mandrillwebhooks.add(body, callbackData, callbacks);

    /*
    * API URL: '/webhooks/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/webhooks/delete-webhook/
	*/
    app.endpoints.mandrillwebhooks.delete(body, callbackData, callbacks);

    /*
    * API URL: '/webhooks/info'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/webhooks/get-webhook-info/
	*/
    app.endpoints.mandrillwebhooks.info(body, callbackData, callbacks);

    /*
    * API URL: '/webhooks/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/webhooks/list-webhooks/
	*/
    app.endpoints.mandrillwebhooks.list(body, callbackData, callbacks);

    /*
    * API URL: '/webhooks/update'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/webhooks/update-webhook/
	*/
    app.endpoints.mandrillwebhooks.update(body, callbackData, callbacks);

    /*
    * API URL: '/whitelists/add'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/whitelists/add-email-to-allowlist/
	*/
    app.endpoints.mandrillwhitelists.add(body, callbackData, callbacks);

    /*
    * API URL: '/whitelists/delete'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/whitelists/remove-email-from-allowlist/
	*/
    app.endpoints.mandrillwhitelists.delete(body, callbackData, callbacks);

    /*
    * API URL: '/whitelists/list'
    * HTTP Method: 'POST'
    * More info: https://mailchimp.com/developer/transactional/api/whitelists/list-allowlisted-emails/
	*/
    app.endpoints.mandrillwhitelists.list(body, callbackData, callbacks);

    
    ```
</details>

For more information about how shortcuts work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Helpers
### Date helpers

Mandrill date use following format for dates `yyyy-MM-dd HH:mm:ss`. The following methods help to convert dates to
make it easy to work with SLINGR:

```js
// converts a Mandrill date to milliseconds
var timestamp = app.endpoints.mandrill.dates.toMillis('2013-01-01 15:30:27');

// converts a Mandrill date to a Date object
var date = app.endpoints.mandrill.dates.toDate('2013-01-01 15:30:27');

// converts milliseconds to a Mandrill date
var mandrillDate = app.endpoints.mandrill.dates.fromMillis(1500469976000);

// converts a Date object to a Mandrill date
var mandrillDate = app.endpoints.mandrill.dates.fromDate(new Date());
```

# Events

## Webhooks

Mandrill's webhooks allow your application to receive information about email events as they occur.
To learn how to set up, see a list of possible webhooks and their formats check [here](https://mailchimp.com/developer/transactional/guides/track-respond-activity-webhooks/).


## Send email using SLINGR files

When send and email it is possible to send the ID of a file in the SLINGR app and the endpoint will automatically
read and attach it into Mandrill email.

Otherwise, you can just send a JSON with `type`,`name` & `content` of the file. The content must be Base64 encoded.

```js
var res = app.endpoints.mandrill.messages.send({
 "message": {
   "html": "<p>Example HTML content</p>",
   "text": "Example text content",
   "subject": "example subject",
   "from_name": "Example Name",
   "attachments": [
      {
        "fileId": record.field('file').id()
      },
      {
        "type": "text/plain",
        "name": "myfile.txt",
        "content": "ZXhhbXBsZSBmaWxl"
      }
    ],
    "images": [
          {
            "fileId": record.field('image').id()
          },
          {
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
          }
        ],
   "to": [
     {
       "email": "recipient.email@example.com",
       "name": "Recipient Name",
       "type": "to"
     }
   ]
 }
});
```

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
