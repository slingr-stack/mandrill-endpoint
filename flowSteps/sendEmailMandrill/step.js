/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 * {text} method, This is used to config method.
 * {text} url, This is used to config external URL.
 * {Array[string]} pathVariables, This is used to config path variables.
 * {Array[string]} headers, This is used to config headers.
 * {Array[string]} params, This is used to config params.
 * {string} body, This is used to send body request.
 * {string} callbackData, This is used to send callback data.
 * {text} callbacks, This is used to send callbacks.
 * {boolean} followRedirects, This is used to config follow redirects.
 * {boolean} download, This is used to config download.
 * {boolean} fullResponse, This is used to config full response.
 * {number} connectionTimeout, Read timeout interval, in milliseconds.
 * {number} readTimeout, Connect timeout interval, in milliseconds.
 */
step.sendEmailMandrill = function (inputs) {

	var inputs = {
		from: inputs.from || "",
		subject: inputs.subject || "",
		message: inputs.message || "",
		to: inputs.to || "",
		attachFile:{
			fileId : inputs.attachFile.fileId || "",
			type: inputs.attachFile.type || "",
			name: inputs.attachFile.fileName || ""
		}

	};

	var msg = {
		"message": {
			"from_name": inputs.from,
			"subject": inputs.subject,
			"html": inputs.message,
			"attachments": [
				{
					"file_id": inputs.attachFile.fileId
				},
				{
					"type": inputs.attachFile.type,
					"name": inputs.attachFile.fileName
				}
			],
			"to": [
				{
					"email": inputs.to,
					"type": "to"
				}
			]
		}
	};

	var options = {
		path: "/messages/send",
		body: msg,
		defaultCallback: !!inputs.events
	}

	return endpoint._post(options);

};

