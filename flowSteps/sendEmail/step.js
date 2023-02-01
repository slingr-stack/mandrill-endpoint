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

	stepConfig.inputs.callbacks = stepConfig.inputs.callbacks ?
		eval("stepConfig.inputs.callbacks = {" + stepConfig.inputs.events + " : function(event, callbackData) {" + stepConfig.inputs.callbacks + "}}") : stepConfig.inputs.callbacks;

	stepConfig.inputs.callbackData = stepConfig.inputs.callbackData ? {record:stepConfig.inputs.callbackData} : stepConfig.inputs.callbackData;

	var msg = {
		"message": {
			"from_name": stepConfig.inputs.from,
			"subject": stepConfig.inputs.subject,
			"html": stepConfig.inputs.message,
			"to": [
				{
					"email": stepConfig.inputs.to,
					"type": "to"
				}
			]
		}
	};

	var options = {
		path: "/messages/send",
		body: msg,
		defaultCallback: !!stepConfig.inputs.events
	}

	return endpoint._post(options, stepConfig.inputs.callbackData, stepConfig.inputs.callbacks);

};

