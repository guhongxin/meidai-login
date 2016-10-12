/*
 *
 * Copyright 2015-2016 FascinWear, Co.Ltd.
 *
 * Author: yingzhemin
 * MailTo: yzm@fascinwear.com
 * CreateDate: 2016.04.05
 *
 *
 */

var exports = module.exports;
exports.GENFRAME_HOST = "http://test.fswear.local"
exports.APP_HOST = "http://app.fswear.local"


exports.running_env = "node.js"

// >>>>>>> Methods >>>>>>>>

exports.Config2Json = 
function (config)
{
	if (! (typeof config === 'string')) {
		console.log("Config2Json needs input in string type.");
		return;
	}
	
	config = config.split(/\r?\n/);
	var key;
	var value;
	var config_json = {};
	for (var pair in config) {
		pair = config[pair].trim();
		if ("" == pair)
			continue;
		
		key = pair.split(' ')[0].trim();
		value = pair.split(' ')[1].trim();
		
		if ("" == key)
			continue;
		
		config_json[key] = value;
	}
	
	return config_json;
}

exports.UserCreate =
function (data, result)
{
	var expected_args = ["phone", "email", "password", "username"];
	var bool_args = [];
	
	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(["phone", "email"], _data, result, "ONEOF")) return false;
	
	url = this.GENFRAME_HOST+"/user?action=create";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}


exports.UserLogin =
function (data, result)
{
	var expected_args = ["phone", "email", "password"];
	var bool_args = [];
	
	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(["phone", "email"], _data, result, "ONEOF")) return false;
	if (! this._Require(["password"], _data, result, "SINGLE")) return false;
	
	url = this.GENFRAME_HOST+"/user?action=login";
	
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}

exports.UserQuery =
function (data, result)
{
	var expected_args = ["uuid"];
	
	var _data = data;
	if (! this._Require(expected_args, _data, result, "SINGLE")) return false;
	
	var bool_args = Object.keys(_data);
	bool_args.splice(bool_args.indexOf("uuid"), 1);
	
	url = this.GENFRAME_HOST+"/user?action=query";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}


exports.OrderCreate =
function (data, result)
{
	var expected_args = ["owneruuid"];
	var bool_args = [];
	
	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(expected_args, _data, result, "SINGLE")) return false;
	
	url = this.GENFRAME_HOST+"/order?action=create";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}

exports.OrderQuery =
function (data, result)
{
	var expected_args = ["uuid"];
	
	var _data = data;
	if (! this._Require(expected_args, _data, result, "SINGLE")) return false;
	
	var bool_args = Object.keys(_data);
	bool_args.splice(bool_args.indexOf("uuid"), 1);
	
	url = this.GENFRAME_HOST+"/order?action=query";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}

exports.DataUpload =
function (data, result)
{
	var expected_args = ["owneruuid", "type"];
	var bool_args = [];
	
	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(expected_args, _data, result, "SINGLE")) return false;
	
	url = this.GENFRAME_HOST+"/data?action=upload";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}

exports.DataDownload =
function (data, result)
{
	var expected_args = ["uuid", "type"];
	var bool_args = [];
	
	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(expected_args, _data, result, "SINGLE")) return false;
	
	url = this.GENFRAME_HOST+"/data?action=download";
	url += this._BuildUrlParam(expected_args, bool_args, _data);
		
	return url;
}

exports.JSBundleUpload =
function (data, result)
{
	var expected_args = ["nativeVersion", "JSVersion", "platform", "message"];
	var bool_args = ["forceUpdate"];

	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(["nativeVersion", "JSVersion"], _data, result, "SINGLE")) return false;

	url = this.APP_HOST+"/jsbundle?action=upload";
	url += this._BuildUrlParam(expected_args, bool_args, _data);

	return url;
}

exports.JSBundleDownload =
function (data, result)
{
	var expected_args = ["nativeVersion", "JSVersion", "platform",];
	var bool_args = [];

	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(["nativeVersion", "JSVersion"], _data, result, "SINGLE")) return false;

	url = this.APP_HOST+"/jsbundle?action=download";
	url += this._BuildUrlParam(expected_args, bool_args, _data);

	return url;
}

exports.JSBundleDelete =
function (data, result)
{
	var expected_args = ["nativeVersion", "JSVersion", "platform"];
	var bool_args = [];

	var _data = this._AssembleArguments(expected_args, data, bool_args);
	if (! this._Require(["nativeVersion", "JSVersion"], _data, result, "SINGLE")) return false;

	url = this.APP_HOST+"/jsbundle?action=delete";
	url += this._BuildUrlParam(expected_args, bool_args, _data);

	return url;
}

exports.JSBundleQuery =
function (data, result)
{
	var expected_args = [];
	var bool_args = ["newestVersion"];

	var _data = this._AssembleArguments(expected_args, data, bool_args);

	url = this.APP_HOST+"/jsbundle?action=query";
	url += this._BuildUrlParam(expected_args, bool_args, _data);

	return url;
}



exports.MakeRequest = 
function (url, method, callback, getrawdata, uploaddata) {
	if(! (typeof callback === "function")) {
		console.log("Aborting, callback is not provided.")
		return false;
	}
	
	var XMLHttpRequest = this.XMLHttpRequest;
	if (typeof XMLHttpRequest === "undefined") {
		var reasons = "XMLHttpRequest module is not injected.";
		callback(null, reasons);
		return false;
	}
	
	var httpRequest = new XMLHttpRequest();
	if (!httpRequest) {
		callback(null, "Cannot create an XMLHttpRequest instance.");
		return false;
	}
	
	function _requestCallback() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				if (getrawdata === true) {
					callback(httpRequest, "");
				} else {
					try{
						callback(JSON.parse(httpRequest.responseText), "");
					} catch(err) {
						callback(null, "Recieved data is not in JSON form.");
					}
				}
			} else {
				callback(null, "MakeRequest got status code: "+httpRequest.status);
			}
		}
	}
	function _timeoutCallback() {
		callback(null, "MakeRequest timeout.");
	}
	function _errorCallback() {
		callback(null, "MakeRequest error.");
	}

	//httpRequest.onreadystatechange = _requestCallback;
	httpRequest.onload = _requestCallback;
	httpRequest.ontimeout = _timeoutCallback;
	httpRequest.onerror = _errorCallback;
	
	//httpRequest.timeout = 7000;
	if (typeof method === "undefined")
		method = "POST";
	
	if (getrawdata === true)
		httpRequest.responseType = "arraybuffer";
	
	httpRequest.open(method, url);
	
	if (getrawdata === true)
		httpRequest.setRequestHeader('Content-Type', 'application/octet-stream');
	else
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		
	
	if (typeof uploaddata === "undefined") {
		httpRequest.send();
	} else {
		/*
		var body = {
		    uri: uploaddata.filepath,
		    name: uploaddata.filename,
		};
		var form = new FormData();
		form.append('file', body);
		
		httpRequest.send(form);
		*/
		
		var params = uploaddata;
		var boundary = "---------------------------" + Date.now().toString(16);
		var content = [];
		for(var i in params) {
		    content.push('--' + boundary);

		    var mimeHeader = 'Content-Disposition: form-data; name="'+i+'"; ';
		    if(params[i].filename)
		        mimeHeader += 'filename="'+ params[i].filename +'";';
		    content.push(mimeHeader);

		    if(params[i].type)
		        content.push('Content-Type: ' + params[i].type);

		    content.push('');
		    content.push(params[i].content || params[i]);
		};
		content.push('--' + boundary + '--');
		var body = content.join('\r\n');
		
		httpRequest.setRequestHeader(
			"Content-Type", "multipart\/form-data; boundary=" + boundary
		);
		
		httpRequest.send(body);
	}
		
	return true;
}


exports.MakeUpload =
function(url, filename, filepath, callback) {
	if(! (typeof callback === "function")) {
		console.log("Aborting, callback is not provided.")
		return false;
	}
	
	// using reactjs
	if (typeof this.NodeJSRequest === "undefined") {
		var params = {
		    file: {
		        type: 'application/octet-stream',
		        filename: filename,
		        content: filepath,
		    },
		    action: 'upload',
		};

		return this.MakeRequest(url, "POST", callback, false, params);
		
		/*
		return this.MakeRequest(url, "POST", callback, false, 
		{
			filepath: filepath,
			filename: filename,
		});
		*/
	}
	// using node.js 
	else {
		if (typeof this.NodeJSFS === "undefined") {
			var reasons = "NodeJSFS module is not injected.";
			callback(null, reasons);
			return false;
		}
		
		var request = this.NodeJSRequest;
		var r = request.post(url, function (err, httpResponse, body) {
			if (err) {
				return callback(null, err);
			}
			return callback(JSON.parse(httpResponse.body), "");
		})
		
		var form = r.form();
		form.append('file', this.NodeJSFS.createReadStream(filepath));
	}
	
}

// ^^^^^^^ End of Methods ^^^^^^^

exports._Require =
function (required_args, recieved_args, result, require_type)
{
	if(typeof require_type === "undefined") {
		require_type = "SINGLE";
	}
	
	res = []
	for (i in required_args){
		if (required_args[i] in recieved_args)
			res.push(true);
		else
			res.push(false);
	}
		
	if ("SINGLE" == require_type) {
		if (res.indexOf(false) < 0)
			return true;
		reasons = "";
		for (i in res){
			if (!res[i]){
				reasons += "["+required_args[i]+"] is required. ";
			}
		}
		result["reasons"] = reasons;
		return false;
	} else 
	if ("ONEOF" == require_type) {
		if (res.indexOf(true) >= 0)
			return true;
		else {
			reasons = "";
			for (i in required_args) {
				reasons += "["+required_args[i]+"] ";
			}
			result["reasons"] = "At least one of " + reasons + "is required.";
			return false;
		}
	} else
	if ("TOGETHER" == require_type) {
		if (res.indexOf(true)>=0 && res.indexOf(false)>=0) {
			reasons = "";
			for (i in required_args) {
				reasons += "["+required_args[i]+"] ";
			}
			result["reasons"] = reasons + "should be all present or absent."
			return false;
		}
		else
			return true;
	}
}


exports._AssembleArguments = 
function (expected_args, recieved_args, bool_args)
{
    args = {}
    for (i in expected_args) {
		if (recieved_args[expected_args[i]])
	    	if (expected_args[i] in recieved_args) {
	    		args[expected_args[i]] = recieved_args[expected_args[i]]
	    	}
    }

    // just check for existance
	if (typeof bool_args !== "undefined") {
	    for (i in bool_args) {
	    	if (bool_args[i] in recieved_args) {
	    		args[bool_args[i]] = "";
	    	}
	    }
	}
    
    return args;
}

exports._BuildUrlParam =
function (expected_args, bool_args, data)
{
	url = "";
	for (i in expected_args) {
		if(expected_args[i] in data)
			url += "&"+expected_args[i]+"="+data[expected_args[i]];
	}
	for (i in bool_args) {
		if(bool_args[i] in data)
			url += "&"+bool_args[i];
	}
	
	return url;
}