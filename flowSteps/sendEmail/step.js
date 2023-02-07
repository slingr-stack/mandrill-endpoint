/**
 * This flow step will send generic request.
 *
 * @param {object} stepConfig.inputs
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
 * @param {object} stepConfig.context {object} context
 */
step.sendEmail = function (stepConfig) {

	var inputs = {
		callbackData: stepConfig.inputs.callbackData || "",
		callbacks: stepConfig.inputs.callbacks || "",
		events: stepConfig.inputs.events || "",
		from: stepConfig.inputs.from || "",
		subject: stepConfig.inputs.subject || "",
		message: stepConfig.inputs.message || "",
		to: stepConfig.inputs.to || "",

	};

	inputs.callbacks = inputs.callbacks ?
		eval("inputs.callbacks = {" + inputs.events + " : function(event, callbackData) {" + inputs.callbacks + "}}") :
		inputs.callbacks;

	inputs.callbackData = inputs.callbackData ? {record: inputs.callbackData} : inputs.callbackData;

	var msg = {
		"message": {
			"from_name": inputs.from,
			"subject": inputs.subject,
			"html": inputs.message,
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

	return endpoint._post(options, inputs.callbackData, inputs.callbacks);

};

