var DEFAULT_LANGUAGE = process.env.VUE_APP_DEFAULT_LANGUAGE ? process.env.VUE_APP_DEFAULT_LANGUAGE : "EN";
var API_URL = process.env.VUE_APP_API_URL;
var BASE_URL = process.env.VUE_APP_BASE_URL;
var CDN_URL = process.env.VUE_APP_CDN_URL;
var BASE_STORAGE = process.env.VUE_APP_BASE_STORAGE;
var API_TOKEN;
export const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";
console.log("DEFAULT_LANGUAGE="+DEFAULT_LANGUAGE);
console.log("API_URL="+API_URL);
console.log("BASE_URL="+BASE_URL);
console.log("CDN_URL="+CDN_URL);
console.log("BASE_STORAGE="+BASE_STORAGE);
export function getDefaultLanguage() { return DEFAULT_LANGUAGE; }
export function setDefaultLanguage(language) {
	console.log("set default_language="+language);
	if(language && language.trim().length>0) DEFAULT_LANGUAGE = language;
}
export function getApiToken() { return API_TOKEN; }
export function getApiUrl() { return API_URL; }
export function getBaseUrl() { return BASE_URL; }
export function getCdnUrl() { return CDN_URL; }
export function getBaseStorage() { return BASE_STORAGE; }
