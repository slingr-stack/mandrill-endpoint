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

<br>

* API URL: '/allowlists/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/allowlists/add-email-to-allowlist/
```javascript
app.endpoints.mandrill.allowlists.add(body, callbackData, callbacks)
```
---
* API URL: '/allowlists/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/allowlists/list-allowlisted-emails/
```javascript
app.endpoints.mandrill.allowlists.list(body, callbackData, callbacks)
```
---
* API URL: '/allowlists/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/allowlists/remove-email-from-allowlist/
```javascript
app.endpoints.mandrill.allowlists.delete(body, callbackData, callbacks)
```
---
* API URL: '/exports/activity'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/export-activity-history/
```javascript
app.endpoints.mandrill.exports.activity(body, callbackData, callbacks)
```
---
* API URL: '/exports/allowlist'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/export-allowlist/
```javascript
app.endpoints.mandrill.exports.allowlist(body, callbackData, callbacks)
```
---
* API URL: '/exports/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/view-export-info/
```javascript
app.endpoints.mandrill.exports.info(body, callbackData, callbacks)
```
---
* API URL: '/exports/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/list-exports/
```javascript
app.endpoints.mandrill.exports.list(body, callbackData, callbacks)
```
---
* API URL: '/exports/rejects'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/export-denylist/
```javascript
app.endpoints.mandrill.exports.rejects(body, callbackData, callbacks)
```
---
* API URL: '/exports/whitelist'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/exports/export-allowlist/
```javascript
app.endpoints.mandrill.exports.whitelist(body, callbackData, callbacks)
```
---
* API URL: '/inbound/add-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/add-inbound-domain/
```javascript
app.endpoints.mandrill.inbound.addDomain(body, callbackData, callbacks)
```
---
* API URL: '/inbound/add-route'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/add-mailbox-route/
```javascript
app.endpoints.mandrill.inbound.addRoute(body, callbackData, callbacks)
```
---
* API URL: '/inbound/check-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/check-domain-settings/
```javascript
app.endpoints.mandrill.inbound.checkDomain(body, callbackData, callbacks)
```
---
* API URL: '/inbound/delete-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/delete-inbound-domain/
```javascript
app.endpoints.mandrill.inbound.deleteDomain(body, callbackData, callbacks)
```
---
* API URL: '/inbound/delete-route'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/delete-mailbox-route/
```javascript
app.endpoints.mandrill.inbound.deleteRoute(body, callbackData, callbacks)
```
---
* API URL: '/inbound/domains'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/list-inbound-domains/
```javascript
app.endpoints.mandrill.inbound.domains(body, callbackData, callbacks)
```
---
* API URL: '/inbound/routes'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/list-mailbox-routes/
```javascript
app.endpoints.mandrill.inbound.routes(body, callbackData, callbacks)
```
---
* API URL: '/inbound/send-raw'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/send-mime-document/
```javascript
app.endpoints.mandrill.inbound.sendRaw(body, callbackData, callbacks)
```
---
* API URL: '/inbound/update-route'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/inbound/update-mailbox-route/
```javascript
app.endpoints.mandrill.inbound.updateRoute(body, callbackData, callbacks)
```
---
* API URL: '/ips/cancel-warmup'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/cancel-ip-warmup/
```javascript
app.endpoints.mandrill.ips.cancelWarmup(body, callbackData, callbacks)
```
---
* API URL: '/ips/check-custom-dns'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/test-custom-dns/
```javascript
app.endpoints.mandrill.ips.checkCustomDns(body, callbackData, callbacks)
```
---
* API URL: '/ips/create-pool'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/add-ip-pool/
```javascript
app.endpoints.mandrill.ips.createPool(body, callbackData, callbacks)
```
---
* API URL: '/ips/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/delete-ip-address/
```javascript
app.endpoints.mandrill.ips.delete(body, callbackData, callbacks)
```
---
* API URL: '/ips/delete-pool'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/delete-ip-pool/
```javascript
app.endpoints.mandrill.ips.deletePool(body, callbackData, callbacks)
```
---
* API URL: '/ips/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/get-ip-info/
```javascript
app.endpoints.mandrill.ips.info(body, callbackData, callbacks)
```
---
* API URL: '/ips/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/list-ip-addresses/
```javascript
app.endpoints.mandrill.ips.list(body, callbackData, callbacks)
```
---
* API URL: '/ips/list-pools'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/list-ip-pools/
```javascript
app.endpoints.mandrill.ips.listPools(body, callbackData, callbacks)
```
---
* API URL: '/ips/pool-info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/get-ip-pool-info/
```javascript
app.endpoints.mandrill.ips.poolInfo(body, callbackData, callbacks)
```
---
* API URL: '/ips/provision'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/request-additional-ip/
```javascript
app.endpoints.mandrill.ips.provision(body, callbackData, callbacks)
```
---
* API URL: '/ips/set-custom-dns'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/set-custom-dns/
```javascript
app.endpoints.mandrill.ips.setCustomDns(body, callbackData, callbacks)
```
---
* API URL: '/ips/set-pool'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/move-ip-to-different-pool/
```javascript
app.endpoints.mandrill.ips.setPool(body, callbackData, callbacks)
```
---
* API URL: '/ips/start-warmup'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/ips/start-ip-warmup/
```javascript
app.endpoints.mandrill.ips.startWarmup(body, callbackData, callbacks)
```
---
* API URL: '/messages/cancel-scheduled'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/cancel-scheduled-email/
```javascript
app.endpoints.mandrill.messages.cancelScheduled(body, callbackData, callbacks)
```
---
* API URL: '/messages/content'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/get-message-content/
```javascript
app.endpoints.mandrill.messages.content(body, callbackData, callbacks)
```
---
* API URL: '/messages/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/get-message-info/
```javascript
app.endpoints.mandrill.messages.info(body, callbackData, callbacks)
```
---
* API URL: '/messages/list-scheduled'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/list-scheduled-emails/
```javascript
app.endpoints.mandrill.messages.listScheduled(body, callbackData, callbacks)
```
---
* API URL: '/messages/parse'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/parse-mime-document/
```javascript
app.endpoints.mandrill.messages.parse(body, callbackData, callbacks)
```
---
* API URL: '/messages/reschedule'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/reschedule-email/
```javascript
app.endpoints.mandrill.messages.reschedule(body, callbackData, callbacks)
```
---
* API URL: '/messages/search'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/search-messages-by-date/
```javascript
app.endpoints.mandrill.messages.search(body, callbackData, callbacks)
```
---
* API URL: '/messages/search-time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/search-messages-by-hour/
```javascript
app.endpoints.mandrill.messages.searchTimeSeries(body, callbackData, callbacks)
```
---
* API URL: '/messages/send'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/send-new-message/
```javascript
app.endpoints.mandrill.messages.send(body, callbackData, callbacks)
```
---
* API URL: '/messages/send-raw'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/send-mime-document/
```javascript
app.endpoints.mandrill.messages.sendRaw(body, callbackData, callbacks)
```
---
* API URL: '/messages/send-template'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/messages/send-using-message-template/
```javascript
app.endpoints.mandrill.messages.sendTemplate(body, callbackData, callbacks)
```
---
* API URL: '/metadata/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/metadata/add-metadata-field/
```javascript
app.endpoints.mandrill.metadata.add(body, callbackData, callbacks)
```
---
* API URL: '/metadata/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/metadata/delete-metadata-field/
```javascript
app.endpoints.mandrill.metadata.delete(body, callbackData, callbacks)
```
---
* API URL: '/metadata/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/metadata/list-metadata-fields/
```javascript
app.endpoints.mandrill.metadata.list(body, callbackData, callbacks)
```
---
* API URL: '/metadata/update'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/metadata/update-metadata-field/
```javascript
app.endpoints.mandrill.metadata.update(body, callbackData, callbacks)
```
---
* API URL: '/rejects/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/rejects/add-email-to-denylist/
```javascript
app.endpoints.mandrill.rejects.add(body, callbackData, callbacks)
```
---
* API URL: '/rejects/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/rejects/delete-email-from-denylist/
```javascript
app.endpoints.mandrill.rejects.delete(body, callbackData, callbacks)
```
---
* API URL: '/rejects/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/rejects/list-denylisted-emails/
```javascript
app.endpoints.mandrill.rejects.list(body, callbackData, callbacks)
```
---
* API URL: '/senders/add-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/add-sender-domain/
```javascript
app.endpoints.mandrill.senders.addDomain(body, callbackData, callbacks)
```
---
* API URL: '/senders/check-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/check-domain-settings/
```javascript
app.endpoints.mandrill.senders.checkDomain(body, callbackData, callbacks)
```
---
* API URL: '/senders/domains'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/list-sender-domains/
```javascript
app.endpoints.mandrill.senders.domains(body, callbackData, callbacks)
```
---
* API URL: '/senders/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/get-sender-info/
```javascript
app.endpoints.mandrill.senders.info(body, callbackData, callbacks)
```
---
* API URL: '/senders/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/list-account-senders/
```javascript
app.endpoints.mandrill.senders.list(body, callbackData, callbacks)
```
---
* API URL: '/senders/time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/view-sender-history/
```javascript
app.endpoints.mandrill.senders.timeSeries(body, callbackData, callbacks)
```
---
* API URL: '/senders/verify-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/senders/verify-domain/
```javascript
app.endpoints.mandrill.senders.verifyDomain(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/add-subaccount/
```javascript
app.endpoints.mandrill.subaccounts.add(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/delete-subaccount/
```javascript
app.endpoints.mandrill.subaccounts.delete(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/get-subaccount-info/
```javascript
app.endpoints.mandrill.subaccounts.info(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/list-subaccounts/
```javascript
app.endpoints.mandrill.subaccounts.list(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/pause'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/pause-subaccount/
```javascript
app.endpoints.mandrill.subaccounts.pause(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/resume'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/resume-subaccount/
```javascript
app.endpoints.mandrill.subaccounts.resume(body, callbackData, callbacks)
```
---
* API URL: '/subaccounts/update'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/subaccounts/update-subaccount/
```javascript
app.endpoints.mandrill.subaccounts.update(body, callbackData, callbacks)
```
---
* API URL: '/tags/all-time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/tags/view-all-tags-history/
```javascript
app.endpoints.mandrill.tags.allTimeSeries(body, callbackData, callbacks)
```
---
* API URL: '/tags/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/tags/delete-tag/
```javascript
app.endpoints.mandrill.tags.delete(body, callbackData, callbacks)
```
---
* API URL: '/tags/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/tags/get-tag-info/
```javascript
app.endpoints.mandrill.tags.info(body, callbackData, callbacks)
```
---
* API URL: '/tags/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/tags/list-tags/
```javascript
app.endpoints.mandrill.tags.list(body, callbackData, callbacks)
```
---
* API URL: '/tags/time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/tags/view-tag-history/
```javascript
app.endpoints.mandrill.tags.timeSeries(body, callbackData, callbacks)
```
---
* API URL: '/templates/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/add-template/
```javascript
app.endpoints.mandrill.templates.add(body, callbackData, callbacks)
```
---
* API URL: '/templates/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/delete-template/
```javascript
app.endpoints.mandrill.templates.delete(body, callbackData, callbacks)
```
---
* API URL: '/templates/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/get-template-info/
```javascript
app.endpoints.mandrill.templates.info(body, callbackData, callbacks)
```
---
* API URL: '/templates/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/list-templates/
```javascript
app.endpoints.mandrill.templates.list(body, callbackData, callbacks)
```
---
* API URL: '/templates/publish'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/publish-template-content/
```javascript
app.endpoints.mandrill.templates.publish(body, callbackData, callbacks)
```
---
* API URL: '/templates/render'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/render-html-template/
```javascript
app.endpoints.mandrill.templates.render(body, callbackData, callbacks)
```
---
* API URL: '/templates/time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/get-template-history/
```javascript
app.endpoints.mandrill.templates.timeSeries(body, callbackData, callbacks)
```
---
* API URL: '/templates/update'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/templates/update-template/
```javascript
app.endpoints.mandrill.templates.update(body, callbackData, callbacks)
```
---
* API URL: '/urls/check-tracking-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/check-cname-settings/
```javascript
app.endpoints.mandrill.urls.checkTrackingDomain(body, callbackData, callbacks)
```
---
* API URL: '/urls/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/list-most-clicked-urls/
```javascript
app.endpoints.mandrill.urls.list(body, callbackData, callbacks)
```
---
* API URL: '/urls/search'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/search-most-clicked-urls/
```javascript
app.endpoints.mandrill.urls.search(body, callbackData, callbacks)
```
---
* API URL: '/urls/time-series'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/get-url-history/
```javascript
app.endpoints.mandrill.urls.timeSeries(body, callbackData, callbacks)
```
---
* API URL: '/urls/tracking-domains'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/list-tracking-domains/
```javascript
app.endpoints.mandrill.urls.trackingDomains(body, callbackData, callbacks)
```
---
* API URL: '/urls/add-tracking-domain'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/urls/add-tracking-domains/
```javascript
app.endpoints.mandrill.urls.addTrackingDomain(body, callbackData, callbacks)
```
---
* API URL: '/users/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/users/get-user-info/
```javascript
app.endpoints.mandrill.users.info(body, callbackData, callbacks)
```
---
* API URL: '/users/ping'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/users/ping/
```javascript
app.endpoints.mandrill.users.ping(body, callbackData, callbacks)
```
---
* API URL: '/users/ping2'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/users/ping-2/
```javascript
app.endpoints.mandrill.users.ping2(body, callbackData, callbacks)
```
---
* API URL: '/users/senders'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/users/list-account-senders/
```javascript
app.endpoints.mandrill.users.senders(body, callbackData, callbacks)
```
---
* API URL: '/webhooks/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/webhooks/add-webhook/
```javascript
app.endpoints.mandrill.webhooks.add(body, callbackData, callbacks)
```
---
* API URL: '/webhooks/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/webhooks/delete-webhook/
```javascript
app.endpoints.mandrill.webhooks.delete(body, callbackData, callbacks)
```
---
* API URL: '/webhooks/info'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/webhooks/get-webhook-info/
```javascript
app.endpoints.mandrill.webhooks.info(body, callbackData, callbacks)
```
---
* API URL: '/webhooks/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/webhooks/list-webhooks/
```javascript
app.endpoints.mandrill.webhooks.list(body, callbackData, callbacks)
```
---
* API URL: '/webhooks/update'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/webhooks/update-webhook/
```javascript
app.endpoints.mandrill.webhooks.update(body, callbackData, callbacks)
```
---
* API URL: '/whitelists/add'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/whitelists/add-email-to-allowlist/
```javascript
app.endpoints.mandrill.whitelists.add(body, callbackData, callbacks)
```
---
* API URL: '/whitelists/delete'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/whitelists/remove-email-from-allowlist/
```javascript
app.endpoints.mandrill.whitelists.delete(body, callbackData, callbacks)
```
---
* API URL: '/whitelists/list'
* HTTP Method: 'POST'
* More info: https://mailchimp.com/developer/transactional/api/whitelists/list-allowlisted-emails/
```javascript
app.endpoints.mandrill.whitelists.list(body, callbackData, callbacks)
```
---

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
