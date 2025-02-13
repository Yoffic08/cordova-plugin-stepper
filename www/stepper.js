var exec = require("cordova/exec");

var Stepper = function () {
    this.name = "Stepper";
};

// IOS & Android - Documented
Stepper.prototype.isStepCountingAvailable = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "isStepCountingAvailable", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.requestPermission = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        if(!/^android|amazon/i.test(device.platform)) {
          return resolve(true);
        }
        exec(resolve, reject, "Stepper", "requestPermission", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.disableBatteryOptimizations = function (onSuccess, onError) {
    let promise = new Promise(function(resolve) {
        if(!/^android|amazon/i.test(device.platform)) {
          return resolve(false);
        }
        exec(resolve, () => resolve(false), "Stepper", "disableBatteryOptimizations", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.startStepperUpdates = function(options, onSuccess, onError, extra) {
    let opts = extra || {};
    if (typeof(options) === "object") {
        opts = options;
    }
    exec((result) => {
    	if (result && result.startDate && result.startDate < new Date().setHours(0,0,0,0)) {
    		this.stopStepperUpdates(
    			false,
        	    this.startStepperUpdates.bind(this, options, onSuccess, onError, extra),
        	    this.startStepperUpdates.bind(this, options, onSuccess, onError, extra)
            );
    		return;
    	}
        return onSuccess(result);
    }, onError, "Stepper", "startStepperUpdates", [opts]);
};

// IOS & Android - Documented
Stepper.prototype.stopStepperUpdates = function (clearDatabase, onSuccess, onError) {
	if (typeof(clearDatabase) !== "boolean") {
		onError = onSuccess;
		onSuccess = clearDatabase;
		clearDatabase = false;
	}
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "stopStepperUpdates", [clearDatabase]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.destroy = function (onSuccess, onError) {
    return this.stopStepperUpdates(true, onSuccess, onError);
};

// Android - Not Available - UnDocumented
Stepper.prototype.getCurrentSteps = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getCurrentSteps", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Not Available - UnDocumented
Stepper.prototype.getDays = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getDays", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Not Available - UnDocumented
Stepper.prototype.getDaysWithoutToday = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getDaysWithoutToday", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.getSteps = function (date, onSuccess, onError) {
    return this.getStepsByPeriod(date || new Date(), date, onSuccess, onError);
};

// IOS & Android - Documented
Stepper.prototype.getStepsByPeriod = function (start, end, onSuccess, onError) {
    const startDate = new Date(start || 0);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(end || new Date());
    endDate.setHours(23, 59, 59, 999);
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getStepsByPeriod", [startDate.toISOString(), endDate.toISOString()]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Not Available - UnDocumented
Stepper.prototype.getTotalWithoutToday = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getTotalWithoutToday", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Behave wierd - Documented
Stepper.prototype.getLastEntries = function (num, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getLastEntries", [num]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Documented
Stepper.prototype.setNotificationLocalizedStrings = function (keyValueObj, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "setNotificationLocalizedStrings", [keyValueObj]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Documented
Stepper.prototype.setGoal = function (num, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "setGoal", [num]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

module.exports = new Stepper();