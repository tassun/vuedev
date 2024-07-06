import $ from "jquery"
import bootbox from "bootbox"
import { getMessageCode } from "./msgutil"
import { openCalendar, clearCalendar, inputNumberOnly, checkInputKey, checkInputNumberOnly } from "./ctrlutil"

export var DEFAULT_LANGUAGE = process.env.VUE_APP_DEFAULT_LANGUAGE ? process.env.VUE_APP_DEFAULT_LANGUAGE : "EN";
export const API_URL = process.env.VUE_APP_API_URL;
export const BASE_URL = process.env.VUE_APP_BASE_URL;
export const CDN_URL = process.env.VUE_APP_CDN_URL;
export const BASE_STORAGE = process.env.VUE_APP_BASE_STORAGE;
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
export function startWaiting() { 
	try{
		let dc = $(document.body);
		let sh = dc.innerHeight();
		let fslayer = $("#fswaitlayer");
		let lh = fslayer.height();
		let fstop = mouseY;
		if(lh > (sh-fstop)) fstop = mouseY-lh;
		fslayer.css("top",fstop);
		fslayer.css("left",mouseX>0?mouseX:dc.innerWidth()-50);
		fslayer.show();
	} catch(ex) { console.error(ex); }
}
export function stopWaiting() { 
	$("#fswaitlayer").hide();
}
export function submitFailure(xhr,status,errorThrown) { 
	stopWaiting();
	console.log("submitFailure",xhr.responseText);
	errorThrown = parseErrorThrown(xhr, status, errorThrown);
	alertbox(errorThrown, function() { 
		if(xhr.status==401) { 
			try {
				window.parent.reLogin();
			}catch(ex) { console.error(ex); }
		}
	});
}
export function parseErrorThrown(xhr,status,errorThrown) {
	if (!errorThrown) {
		errorThrown = xhr.responseText;
	} else {
		if(errorThrown==xhr.status) {
			errorThrown = xhr.responseText;
		}
	}
	try{
		if(xhr.status==400 || xhr.status==401) errorThrown = xhr.responseText; //400=Bad Request,401=Unauthen
		if(xhr.responseText) {
			let json = JSON.parse(xhr.responseText);
			if(json.text) errorThrown = json.text;
			if(json.head.errordesc) errorThrown = json.head.errordesc;
		}
	}catch(ex) { console.error(ex); }
	if(!errorThrown || errorThrown.trim().length==0) errorThrown = "Unknown error or network error";
	return errorThrown;
}
export function detectErrorResponse(data) {
	if(typeof data === "string") {
		try { data = JSON.parse(data); } catch(ex) { console.error(ex); }
	}
	if(data?.head?.errorflag=="Y") {
		alertmsg(data.head.errordesc);
		return true;
	}
	return false;
}
export function successbox(callback,params) {
	let title = getMessageCode("fsinfo",null,"Information");
	alertbox("QS0004",callback,null,params,null,title,"fa fa-info-circle");
}
export function warningbox(errcode,callback,params) {
	let title = getMessageCode("fswarn",null,"Warning");
	alertbox(errcode,callback,null,params,null,title,"fa fa-exclamation-circle");
}
export function alertbox(errcode, callback, defaultmsg, params, addonmsg, title, icon) {
	if(!title || title.trim().length==0) title = getMessageCode("fsalert",null,"Alert");
	let txt = getMessageCode(errcode, params);
	if(txt!=null && txt!="") {
		if(addonmsg) txt += " "+addonmsg;
		alertDialog(txt, callback, title, icon);
	} else {
		if (defaultmsg) {
			if(addonmsg) defaultmsg += " "+addonmsg;
			alertDialog(defaultmsg, callback, title, icon);
		} else {
			alertDialog(errcode, callback, title, icon);
		}
	}
}
export function alertDialog(msg, callbackfn, title="Alert", icon="fa fa-bell-o") {
	try {
		let fs_okbtn = getMessageCode("fsokbtn"); if(!fs_okbtn || (fs_okbtn=="" || fs_okbtn=="fsokbtn")) fs_okbtn = "OK";
		//let fs_okbtn = "OK";
		bootbox.alert({
			title: "<em class='"+icon+"'></em>&nbsp;<label>"+title+"</label>",
			message: msg,
			callback: function() {
				if (callbackfn) callbackfn();
			},
			buttons: {
				ok:  { label: fs_okbtn }
			}    		
		});
        $(".bootbox > .modal-dialog").draggable();
		return;
    } catch (ex) { console.error(ex); }
    if (callbackfn) callbackfn();
}
export function confirmbox(errcode, okFn, cancelFn, defaultmsg, params, addonmsg, title, icon) {
	if(!title || title.trim().length==0) title = getMessageCode("fsconfirm",null,"Confirmation");
	let txt = getMessageCode(errcode,params);
	if(txt!=null && txt!="") {
		if(addonmsg) txt += " "+addonmsg;
		return confirmDialog(txt, okFn, cancelFn, title, icon);
	} else {
		if (defaultmsg) {
			if(addonmsg) defaultmsg += " "+addonmsg;
			return confirmDialog(defaultmsg, okFn, cancelFn, title, icon);
		} else {
			return confirmDialog(errcode, okFn, cancelFn, title, icon);
		}
	}
}
export function confirmDialog(msg, okCallback, cancelCallback, title="Confirmation", icon="fa fa-question-circle") {
	try {
		let fs_confirmbtn = getMessageCode("fsconfirmbtn"); if(!fs_confirmbtn || (fs_confirmbtn=="" || fs_confirmbtn=="fsconfirmbtn")) fs_confirmbtn = "OK";
		let fs_cancelbtn = getMessageCode("fscancelbtn"); if(!fs_cancelbtn || (fs_cancelbtn=="" || fs_cancelbtn=="fscancelbtn")) fs_cancelbtn = "Cancel";
		//let fs_confirmbtn = "OK";
		//let fs_cancelbtn = "Cancel";
		bootbox.confirm({
			title: "<em class='"+icon+"'></em>&nbsp;<label>"+title+"</label>",
			message: msg, 
			callback: function(result) {
				if(result) {
					if (okCallback) okCallback();
				} else {
					if (cancelCallback) cancelCallback();
				}
			},
			swapButtonOrder: true,
			buttons: {
				confirm : { label: fs_confirmbtn },
				cancel: { label: fs_cancelbtn },
			}
		});
        $(".bootbox > .modal-dialog").draggable();
		return true;
    } catch (ex) { console.log(ex.description); }
	return true;
}
export function alertmsg(errcode, defaultmsg, params, callback) {
	alertbox(errcode, callback, defaultmsg, params);
}
export function confirmmsg(errcode, defaultmsg, params, okFn, cancelFn) {
	confirmbox(errcode, okFn, cancelFn, defaultmsg, params);
}
export function confirmDialogBox(errcode, params, defaultmsg, okFn, cancelFn, addonmsg) {
	return confirmbox(errcode, okFn, cancelFn, defaultmsg, params, addonmsg);
}
export function confirmDelete(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0001",params,"Do you want to delete this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmSave(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0002",null,"Do you want to save this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmCancel(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0003",null,"Do you want to cancel this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmRemove(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0005",params,"Do you want to delete this record?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmSend(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0006",null,"Do you want to send this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmUpdate(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0007",null,"Do you want to update this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmClear(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0008",params,"Do you want to clear this?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmProcess(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0009",null,"Do you want to process this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmSaveAs(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0010",null,"Do you want to save as this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmReceive(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0011",null,"Do you want to receive this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmReset(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0012",null,"Do you want to reset this trasaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmErase(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0013",params,"Do you want to delete %s row(s)?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmApprove(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0014",params,"Do you want to confirm approve the %s request?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmReject(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0015",params,"Do you want to reject %s?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmRequest(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0016",null,"Do you want to create this request?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmImport(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0017",null,"Do you want to import this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmExport(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0018",null,"Do you want to export this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmResend(okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0019",null,"Do you want to resend this transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}
export function confirmRevise(params, okFn, cancelFn, addonmsg) {
	if(!confirmDialogBox("QS0020",params,"Do you want to revise the transaction?",okFn,cancelFn,addonmsg)) return false;
	return true;
}

var mouseX = 0;
var mouseY = 0;
export function startApplication(pid) {
	console.log("startApplication: pid="+pid);
	$(document).on("mousedown",function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	//disable bootstrap modal auto close when click outside and ESC key
	try {
		//bootstrap v4
		$.fn.modal.Constructor.Default.backdrop = "static";
		$.fn.modal.Constructor.Default.keyboard = false;
	} catch(ex) { console.error(ex);  }
}
export function setupScreenControls(aform) {
	console.log("setupScreenControls ...");
	$("input[type=text]",aform||document).each(function(index,element) { 
		let $this = $(element);
		if(!$this.hasClass("ivue")) {
			try { if($this.attr("picture")) { $this.mask($this.attr("picture")); } }catch(ex) { console.error(ex); }
		}
	});			
	$("input[type=text].itime",aform||document).each(function(index,element) { 
		let $this = $(element);
		if(!$this.hasClass("ivue")) {
			$this.clockpicker({ align: "left", autoclose: true, donetext: "Done", cleartext: "Clear", 
				afterDone: function() {
					element.dispatchEvent(new Event('select')); 
					let fn = $(element).data("afterSelectTimePicker");
					if(fn) fn(element);
				} 
			});
		}
	});
	$("input[type=text].idate",aform||document).each(function(index,element) { 
		let $this = $(element);
		if(!$this.hasClass("ivue")) {
			let id = $this.attr("id");
			$("#LK"+id).on("click",function() { openCalendar(document.getElementById(id)); });
			$("#CLR"+id).on("click",function() { clearCalendar(document.getElementById(id)); });
		}
	});
	$("input[type=text].iint",aform||document).each(function(index,element) { 
		let $this = $(element);
		if(!$this.hasClass("ivue")) {
			$this.on("keypress",function(event) { return inputNumberOnly(this,event); });
		}
	});
	$("input[type=text].imoney",aform||document).each(function(index,element) { 
		let $this = $(element);
		if(!$this.hasClass("ivue")) {
			let decimal = $this.attr("decimal");
			$this.on("keyup",function(event) { return checkInputKey(this,event,decimal,null); });
			$this.on("keypress",function(event) { return checkInputNumberOnly(this,event,decimal); });
		}
	});
}
