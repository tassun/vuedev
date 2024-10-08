//this make global access jquery (browser console can references)
import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
//import 'jquery'; //this make private access jquery (browser console cannot references)
import "jquery-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-ui-dist/jquery-ui.css";
//import 'bootstrap';
//import "bootbox";
import bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import bootbox from "bootbox";
window.bootbox = bootbox;
import "./assets/jquery/js/jquery.maskedinput.js";
import "./assets/clockpicker/bootstrap-clockpicker.js";
import "./assets/clockpicker/bootstrap-clockpicker.css";
import "./assets/css/font-awesome.css";
import "./assets/css/component.css";
import "./assets/css/base_style.css";
import "./assets/css/program_style.css";
import "./assets/css/user_style.css";
import "./assets/js/app.info.js";
import { createApp, version } from 'vue';
import App from './App.vue';
console.log("Vue version",version);
createApp(App).mount('#app');
