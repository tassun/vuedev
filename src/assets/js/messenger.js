import { getApiUrl, getBaseUrl, getApiToken, getBaseStorage, setApiUrl, setBaseUrl, setApiToken  } from "./appinfo.js";

var messagingCallback;
export function setMessagingCallback(callback) {
    messagingCallback = callback;
}
export function getStorage(key) {
	if("local"==getBaseStorage()) {
		return localStorage.getItem(key);
	}
    return sessionStorage.getItem(key);
}
export function setStorage(key,value) {
	if("local"==getBaseStorage()) {
		localStorage.setItem(key,value);
		return;
	}
	sessionStorage.setItem(key,value);
}
export function removeStorage(key) {
	if("local"==getBaseStorage()) {
		localStorage.removeItem(key);
		return;
	}
    sessionStorage.removeItem(key);
}
export function getAccessorInfo() {
    let info = getStorage("accessorinfo");
    if(info && info!="") {
        try { return JSON.parse(info); } catch(ex) { console.error(ex); }
    }    
    return null;
}
export function getAccessorToken() {
    let json = getAccessorInfo();
    if(json && json.authtoken) {
        return json.authtoken;
    }
    let token = getApiToken();
	if(token && token!="") return token;
    return "";
}
export function saveAccessorInfo(json) {
	setStorage("accessorinfo",JSON.stringify(json));
}
export function removeAccessorInfo() {
	removeStorage("accessorinfo");
}
export function sendMessageInterface() {
	let info = getAccessorInfo();
	let msg = {type: "storage", API_URL: getApiUrl(), BASE_URL: getBaseUrl(), API_TOKEN: getApiToken(), accessorinfo: info};
	return sendMessageToFrame(msg);
}
export function sendMessageToFrame(data) {
    if(!data) return false;
    try {
		console.log("sendMessageToFrame:",data);
        let win = document.getElementsByTagName('iframe')[0].contentWindow;    
        if(win) win.postMessage(JSON.stringify(data), "*");	
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function requestAccessorInfo(callback) {
    if(callback) setMessagingCallback(callback);
    let msg = { type: "accessorinfo" };
    return sendMessageToParent(msg);
}
export function sendMessageToParent(data) {
    if(!data) return;
    try {
        console.log("sendMessageToParent:",data);
        window.parent.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function handleRequestMessage(data) {
    if(data.type=="storage") {
        if(data.API_URL) setApiUrl(data.API_URL);
        if(data.BASE_URL) setBaseUrl(data.BASE_URL);
        if(data.API_TOKEN) setApiToken(data.API_TOKEN);
        if(data.accessorinfo) {
            saveAccessorInfo(data.accessorinfo);
        }
        console.log("handleRequestMessage: accessor info",data.accessorinfo);
    }
    if(messagingCallback) messagingCallback(data);
}
window.onmessage = function(e) {
    console.log("interface: onmessage:",e.data);
    try {
        let payload = JSON.parse(e.data);
        handleRequestMessage(payload);
    } catch(ex) { console.log(ex); }
}
