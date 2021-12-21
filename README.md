---
title: Mandrill endpoint
keywords: 
last_updated: November 21, 2021
tags: []
summary: "Detailed description of the API of the Mandrill endpoint."
---

## Overview

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
These shortcuts are based on the [Mandrill REST API](https://mandrillapp.com/api/docs/).
You can see more information about that in the [shortcuts section](#shortcuts).

## Configuration

- Check the setting page to create a new API key: [Settings page](https://mandrillapp.com/settings/)
- Configure the inbound domain in order to receive messages and notifications: [Inbound Email Processing Overview](https://mandrill.zendesk.com/hc/en-us/articles/205583197-Inbound-Email-Processing-Overview)
- You will need to configure the Webhook URL as a route inside of the registered inbound domain: [Inbound page](https://mandrillapp.com/inbound)
- A new webhook (as well the one that we use as inbound webhook) can be configured to receive different kind of message and sync events: [Webhooks page](https://mandrillapp.com/settings/webhooks)


### API key
API to access to Mandrill service


### Sender name	
Name of the sender of the emails

### Sender account
Account to use as sender of the emails (Do not include the @ and the domain).

### Sender domain
Domain to use as sender of the emails (Do not include the @ and the account name).

### Redirect emails
If it is enabled, all the emails will be sent to the redirect address instead to the real ones. This parameter is available only in dev environments.

### Redirect to address
Redirect address used as receiver of all the emails when the redirect option is enabled. This parameter is available only in dev environments.

## Quick start

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

## Javascript API

The Javascript API of the Mandrill endpoint has three pieces:

- **HTTP request**: this allows to make regular HTTP requests. In case of Mandrill `POST` to the API.
- **Shortcuts**: these are helpers to make HTTP request to the API in a more convenient way.
- **Date helpers**: allow to easily convert dates from/to Mandrill so they can be used easily in SLINGR.

### HTTP requests

You can make `POST` request to the [Mandrill API](https://mandrillapp.com/api/docs/) like this:

```js
var response = app.endpoints.mandrill.post('/messages/send', {...});
var tempResponse = app.endpoints.mandrill.post('/templates/time-series', {...});
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information.

### Shortcuts

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint. These
shortcuts follow these rules:

- **Path sections get converted to namespaces**: for example `~/messages/send` 
  it is converted to `app.endpoints.mandrill.messages.send({...})`. 
- **If they have dashes, we should convert them to camel case**: `~/templates/time-series` is converted to 
  `app.endpoints.mandrill.templates.timeSeries()`.
  
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

## Events

### Webhooks

Mandrill's webhooks allow your application to receive information about email events as they occur.
To learn how to set up, see a list of possible webhooks and their formats check [here](https://mailchimp.com/developer/transactional/guides/track-respond-activity-webhooks/).


### Send email using SLINGR files

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
        "file_id": record.field('file').id()
      },
      {
        "type": "text/plain",
        "name": "myfile.txt",
        "content": "ZXhhbXBsZSBmaWxl"
      }
    ],
    "images": [
          {
            "file_id": record.field('image').id()
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

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
