endpoint.dates = {};
endpoint.dates.toMillis = function (stringDate) {
    var json = endpoint._convertDateToTimestamp({date: stringDate});
    if (json && json instanceof Object) {
        return json.timestamp;
    }
    return null;
};

endpoint.dates.toDate = function (stringDate) {
    var json = endpoint._convertDateToTimestamp({date: stringDate});
    if (json && json instanceof Object) {
        return new Date(json.timestamp);
    }
    return null;
};

endpoint.dates.fromMillis = function (millis) {
    var json = endpoint._formatFromMillis({millis: millis});
    if (json && json instanceof Object) {
        return json.date;
    }
    return null;
};

endpoint.dates.fromDate = function (date) {
    if (date) {
        var json = endpoint._formatFromMillis({millis: date.getTime()});
        if (json && json instanceof Object) {
            return json.date;
        }
    }
    return null;
};