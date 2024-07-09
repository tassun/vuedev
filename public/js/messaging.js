
var DEFAULT_LANGUAGE = "EN";
var API_URL = "http://127.0.0.1:8080";
var BASE_URL = "";
var CDN_URL = "";
var BASE_STORAGE = "session";
var API_TOKEN;
const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";
console.log("DEFAULT_LANGUAGE="+DEFAULT_LANGUAGE);
console.log("API_URL="+API_URL);
console.log("BASE_URL="+BASE_URL);
console.log("CDN_URL="+CDN_URL);
console.log("BASE_STORAGE="+BASE_STORAGE);
function getDefaultLanguage() { return DEFAULT_LANGUAGE; }
function setDefaultLanguage(language) {
	console.log("set default_language="+language);
	if(language && language.trim().length>0) DEFAULT_LANGUAGE = language;
}
function getApiToken() { return API_TOKEN; }
function getApiUrl() { return API_URL; }
function getBaseUrl() { return BASE_URL; }
function getCdnUrl() { return CDN_URL; }
function getBaseStorage() { return BASE_STORAGE; }
function setApiToken(value) { API_TOKEN = value; }
function setApiUrl(value) { API_URL = value; }
function setBaseUrl(value) { BASE_URL = value; }
function setCdnUrl(value) { CDN_URL = value; }
function setBaseStorage(value) { BASE_STORAGE = value; }

var messagingCallback;
function setMessagingCallback(callback) {
    messagingCallback = callback;
}
function getStorage(key) {
	if("local"==getBaseStorage()) {
		return localStorage.getItem(key);
	}
    return sessionStorage.getItem(key);
}
function setStorage(key,value) {
	if("local"==getBaseStorage()) {
		localStorage.setItem(key,value);
		return;
	}
	sessionStorage.setItem(key,value);
}
function removeStorage(key) {
	if("local"==getBaseStorage()) {
		localStorage.removeItem(key);
		return;
	}
    sessionStorage.removeItem(key);
}
function getAccessorInfo() {
    let info = getStorage("accessorinfo");
    if(info && info!="") {
        try { return JSON.parse(info); } catch(ex) { console.error(ex); }
    }    
    return null;
}
function getAccessorToken() {
    let json = getAccessorInfo();
    if(json && json.authtoken) {
        return json.authtoken;
    }
    let token = getApiToken();
	if(token && token!="") return token;
    return "";
}
function saveAccessorInfo(json) {
	setStorage("accessorinfo",JSON.stringify(json));
}
function removeAccessorInfo() {
	removeStorage("accessorinfo");
}
function sendMessageInterface() {
	let info = getAccessorInfo();
	let msg = {type: "storage", API_URL: getApiUrl(), BASE_URL: getBaseUrl(), API_TOKEN: getApiToken(), accessorinfo: info};
	return sendMessageToFrame(msg);
}
function sendMessageToFrame(data) {
    if(!data) return false;
    try {
		console.log("sendMessageToFrame:",data);
        let win = document.getElementsByTagName('iframe')[0].contentWindow;    
        if(win) win.postMessage(JSON.stringify(data), "*");	
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
function requestAccessorInfo(callback) {
    if(callback) setMessagingCallback(callback);
    let msg = { type: "accessorinfo" };
    return sendMessageToParent(msg);
}
function sendMessageToParent(data) {
    if(!data) return;
    try {
        console.log("sendMessageToParent:",data);
        window.parent.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
function handleRequestMessage(data) {
    if(data.type=="storage") {
        if(data.API_URL) setApiUrl(data.API_URL);
        if(data.BASE_URL) setBaseUrl(data.BASE_URL);
        if(data.API_TOKEN) setApiToken(data.API_TOKEN);
        if(data.accessorinfo) {
            saveAccessorInfo(data.accessorinfo);
        }
        console.log("handleRequestMessage",data.accessorinfo);
    }
    if(messagingCallback) messagingCallback(data);
}
window.onmessage = function(e) {
    console.log("main: onmessage:",e.data);
    try {
        let payload = JSON.parse(e.data);
        if(payload.type=="accessorinfo") {					
            sendMessageInterface();
        }
    } catch(ex) { }
}
function talkToChild() {
    sendMessageInterface();    
}
