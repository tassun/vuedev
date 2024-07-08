<!-- App.vue -->
<template>
  <div id="fswaitlayer" class="fa fa-spinner fa-spin"></div>
  <div class="pt-page pt-page-current pt-page-controller search-pager">
    <PageHeader ref="pageHeader" :labels="labels" pid="demo002" version="1.0.0" @show-version="showVersion">
      <li><a href="javascript:void(0)" @click="changeLanguage('EN')" class="pagemenu-linker"><img class="img-lang img-lang-EN" />&nbsp;{{ labels.english_lang }}</a></li>
      <li><a href="javascript:void(0)" @click="changeLanguage('TH')" class="pagemenu-linker"><img class="img-lang img-lang-TH" />&nbsp;{{ labels.thai_lang }}</a></li>
      <hr class="menu-separator"/>
    </PageHeader>
    <p>Child Form</p>
    <InputFields ref="inputFields" :labels="labels" :formData="formData" :dataCategory="dataCategory" @update:formData="updateFormData" />
    <div class="row">
      <div class="col-md-2">
        <label>Main Form</label>
      </div>
    </div>
    <div id="mainpanel">
      <div class="row">
        <div class="col-height col-md-3">
          <label for="account">{{labels.account_label}}:</label>
          <input type="text" v-model="localData.account" class="form-control input-md" required />
        </div>
        <div class="col-md">
          <button @click="retrieveclick" class="btn btn-primary btn-normal btn-space"><em class="fa fa-search"></em> {{ labels.retrieve_button }}</button>&nbsp;&nbsp;
          <button @click="searchclick" class="btn btn-primary btn-normal btn-space"><em class="fa fa-search"></em> {{ labels.search_button }}</button>&nbsp;&nbsp;
        </div>
      </div>
      <p>{{labels.account_label}}: {{ localData.account }},  {{labels.amount_label}}: {{ localData.amount }},  {{labels.pincode_label}}: {{ localData.pincode }}</p>
      <p>{{labels.effectdate_label}}: {{ localData.effectdate }},  {{labels.effecttime_label}}: {{ localData.effecttime }},  {{labels.age_label}}: {{ localData.age }}, {{labels.gender_label}}: {{ localData.gender }}</p>
      <p>{{labels.domestic_label}}: {{ localData.domestic }},  {{labels.marrystatus_label}}: {{ localData.marrystatus }},  {{labels.licenses_label}}: {{ localData.licenses }}, {{labels.languages_label}}: {{ localData.languages }}</p>
      <div class="row">
        <div class="col-md-12">
          <button @click="loadclick" class="btn btn-primary btn-normal"><em class="fa fa-bolt fa-btn-icon"></em> AJAX Load</button>&nbsp;&nbsp;
          <button @click="alertclick" class="btn btn-primary btn-normal">Alert Dialog</button>&nbsp;&nbsp;
          <button @click="confirmclick" class="btn btn-primary btn-normal">Confirm Dialog</button>&nbsp;&nbsp;
          <button @click="dialogclick" class="btn btn-primary btn-normal">Show Dialog</button>&nbsp;&nbsp;
          <button @click="teleportclick" class="btn btn-primary btn-normal">Teleport Dialog</button>&nbsp;&nbsp;
          <button @click="resetclick" class="btn btn-primary btn-normal">Reset</button>&nbsp;&nbsp;
          <button @click="assertclick" class="btn btn-primary btn-normal">Assert</button>&nbsp;&nbsp;
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col-md-4">
          <label for="createdate">{{labels.createdate_label}}:</label>
          <InputDate v-model="localData.createdate" id="createdate" name="createdate" /> 
          <p>Input Date: {{localData.createdate}}</p>
        </div>
        <div class="col-md-4">
          <label>{{labels.editdate_label}}:</label>
          <input-date v-model="localData.editdate" class="form-control input-md" :disabled="localData.editdateDisabled" /> 
          <p>Input Date: {{localData.editdate}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label for="createtime">{{labels.createtime_label}}:</label>
          <InputTime v-model="localData.createtime" id="createtime" name="createtime" /> 
          <p>Input Time: {{localData.createtime}}</p>
        </div>
        <div class="col-md-3">
          <label for="edittime">{{labels.edittime_label}}:</label>
          <input-time v-model="localData.edittime" id="edittime" :disabled="localData.edittimeDisabled" /> 
          <p>Input Time: {{localData.edittime}}</p>
        </div>
        <div class="col-md-1"><button @click="toggleclick" class="btn btn-primary btn-toggle">{{ localData.edittimeDisabled?"Enabled":"Disabled"}}</button></div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label for="assets">{{labels.assets_label}}:</label>
          <InputNumber v-model="localData.assets" id="assets" name="assets" /> 
          <p>Input Number: {{localData.assets}}</p>
        </div>
        <div class="col-md-3">
          <label for="credit">{{labels.credit_label}}:</label>
          <InputMoney v-model="localData.credit" id="credit" name="credit" decimal="2" /> 
          <p>Input Money: {{localData.credit}}</p>
        </div>
        <div class="col-md-3">
          <label for="passcode">{{labels.passcode_label}}:</label>
          <InputMask v-model="localData.passcode" id="passcode" name="passcode" picture="XXXXXXXXXX" /> 
          <p>Input Mask: {{localData.passcode}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 pull-right text-right">
          <button @click="saveclick" class="btn btn-primary btn-normal"><em class="fa fa-save fa-btn-icon"></em>{{ labels.save_button }}</button>&nbsp;&nbsp;
          <button @click="updateclick" class="btn btn-primary btn-normal"><em class="fa fa-save fa-btn-icon"></em>{{ labels.update_button }}</button>&nbsp;&nbsp;
        </div>
      </div>
    </div>
  </div>

  <teleport to="#modaldialog">
    <div id="teleportdialog" class="modal fade pt-page pt-page-item" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xm">
        <div class="modal-content portal-area fa-portal-area">
          <div class="modal-header">
            <h4 class="modal-title" id="modalheadertitle">Teleport Dialog</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div id="teleportdialoglayer" class="entry-dialog-layer">
            Hello, Teleport Dialog<br/>
          </div>
          <div class="row-heighter modal-footer" >
            <input type="button" class="btn btn-dark btn-sm" data-dismiss="modal" :value="labels.cancel_button"/>
          </div>
        </div>
      </div>
    </div>        
  </teleport>

  <div id="ptsearchpager" class="pt-page pt-page-current pt-page-controller search-pager">
    <div id="searchpanel" class="panel-body">
      <div id="listpanel" class="table-responsive fa-list-panel">
        <DataTable ref="dataTable" :settings="tableSettings" :labels="labels" :dataset="dataset" @data-select="dataSelected" @data-sort="dataSorted" :formater="formatData" />
        <DataPaging ref="dataPaging" :settings="pagingSettings" @page-select="pageSelected" />
      </div>
    </div>
  </div>

  
</template>
<style>
#mainpanel { background-color: #E8FAF2; padding: 10px; margin-top: 10px; margin-bottom: 10px; }
.btn-toggle { min-width: 100px; margin-top: 30px; }
.btn-normal { min-width: 100px; }
.btn-space { margin-top: 30px; }
</style>
<script>
import { ref } from 'vue';
import $ from "jquery";
import InputFields from './components/InputFields.vue';
import PageHeader from './controls/PageHeader.vue';
import DataTable from './controls/DataTable.vue';
import DataPaging from "./controls/DataPaging.vue";
import { startWaiting, stopWaiting, submitFailure, alertDialog, confirmDialog, startApplication }  from './assets/apputil.js'
import { confirmUpdate, confirmSave, successbox } from './assets/apputil.js'
import InputDate from './controls/InputDate.vue';
import InputTime from './controls/InputTime.vue';
import InputNumber from './controls/InputNumber.vue';
import InputMoney from './controls/InputMoney.vue';
import InputMask from './controls/InputMask.vue';
import { DEFAULT_CONTENT_TYPE, getApiUrl }  from './assets/apputil.js';
import { getLabelModel } from "./assets/labelutil.js";
import { Paging } from "./assets/Paging.js";

export default {
  components: {
    InputFields, PageHeader, DataTable, DataPaging, InputDate, InputTime, InputNumber, InputMoney, InputMask
  },
  setup() {
    const formData = {
      account: '1-0-12345-6',
      amount: 100000,
      age: 1,
      gender: "M",
      domestic: "1",
      effectdate: "",
      effecttime: "",
      pincode: "",
      marrystatus: "S",
      licenses: ["CAR"],
      languages: ["TH"],
      createdate: "25/06/2024",
      createtime: "12:00:00",
      editdate: "25/06/2024",
      edittime: "12:00:00",
      remark: "",
      title: "",
      caption: "",
      editdateDisabled: true,
      edittimeDisabled: true,
      assets: 1,
      credit: 2500.55,
      passcode: "",
      counter: 0,
    };
    const dataCategory = {
      marrystatus: [{key: "S", text: "Single"}, {key: "M", text: "Married"},{key: "D", text: "Divorce"},{key: "W", text: "Widow"}],
      licenses: [{key: "CAR", text: "Car"},{key: "TRUCK", text: "Truck"},{key: "BOAT", text: "Boat"}],
      languages: [{key: "TH", text: "Thai"},{key: "EN", text: "English"},{key: "CN", text: "Chinese"},{key: "KR", text: "Korea"},{key: "JP", text: "Japan"}]
    };
    let localData = ref({...formData});
    let labels = ref(getLabelModel());
    let paging = new Paging();
    let pagingSettings = paging.setting;
    let filters = {};
    let tableSettings = {
        sequence: { label: "seqno_label" },
        columns: [
          {name: "account", type: "STRING", sorter: "account", label: "account_head", css: "text-center" },
          {name: "amount", type: "DECIMAL", sorter: "amount", label: "amount_head", css: "text-right" },
          {name: "age", type: "INTEGER", sorter: "age", label: "age_head", css: "text-right" },
          {name: "gender", type: "STRING", sorter: false, label: "gender_head", css: "text-center", unescape: true },
          {name: "effectdate", type: "DATE", sorter: "effectdate", label: "effectdate_head", css: "text-center" },
          {name: "effecttime", type: "TIME", sorter: "effecttime", label: "effecttime_head", css: "text-center" }
        ],        
        actions: [
          {type: "button", action: "edit"},
          {type: "button", action: "delete"},
        ],
    }
    return { labels, localData, formData, dataCategory, tableSettings, pagingSettings, paging, filters };
  },
  mounted() {
    console.log("App: on mounted ...");
    this.$nextTick(function () {
      startApplication();
    });
  },
  methods: {
    updateFormData(newData) {
      console.log("App: updateFormData",newData);
      console.log("App: updateFormData",JSON.stringify(newData));
      Object.assign(this.localData, newData);
    },
    assertclick() {
      console.log("Assert localData:", this.localData);
      console.log("Assert localData:", JSON.stringify(this.localData));        
      alert("localData\n\n"+JSON.stringify(this.localData));
    },
    alertclick() {
      console.log("VUE_APP_DEFAULT_LANGUAGE="+process.env.VUE_APP_DEFAULT_LANGUAGE);
      console.log("VUE_APP_BASE_STORAGE="+process.env.VUE_APP_BASE_STORAGE);
      alertDialog("Alert Boot Box Show");
    },
    confirmclick() {
      confirmDialog("Confirm Boot Box Show",function() { alert("OK click"); }, function() { alert("Cancel click"); });
      //warningbox("Warning Information");
    },
    dialogclick() {
      $("#fsmodaldialog").modal("show");
      $("#fsmodaldialog").find(".modal-dialog").draggable();
    },
    teleportclick() {
      $("#teleportdialog").modal("show");
      $("#teleportdialog").find(".modal-dialog").draggable();
    },
    toggleclick() {
      this.localData.editdateDisabled = !this.localData.editdateDisabled;
      this.localData.edittimeDisabled = !this.localData.edittimeDisabled;
    },
    resetclick() {
      this.localData = {...this.formData};
    },
    changeLanguage(lang) {
      let labelModel = getLabelModel(lang);
      this.labels = labelModel;
      this.$refs.inputFields.setLabel(labelModel);
    },
    loadclick() {
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/fetch/time",
        type: "POST",
        dataType: "html",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: function(data){
          stopWaiting();
          console.log("success",data);
          successbox();
        }
      });	
    },
    saveclick() {
      confirmSave(() => {
        let jsondata = {ajax: true};
        Object.assign(jsondata,this.localData);
        startWaiting();
        $.ajax({
          url: getApiUrl()+"/api/demo002/insert",
          data: jsondata,
          type: "POST",
          dataType: "html",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: function(data){
            stopWaiting();
            console.log("success",data);
            successbox();
          }
        });	
      });
    },
    retrieveclick() {
      this.retrieving({account: this.localData.account});
    },
    retrieving(keysets) {
      let jsondata = {ajax: true};
      Object.assign(jsondata,keysets);
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/demo002/retrieve",
        data: jsondata,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("success",data);
          successbox();
          if(data.body.dataset) {
            console.log("retrieveclick: localData",JSON.stringify(this.localData));
            //try to update form data
            this.updateFormData(data.body.dataset);
            //try to update child form data
            this.$refs.inputFields.reset(data.body.dataset);
          }
        }
      });	
    },
    updateclick() {
      confirmUpdate(() => { 
        let jsondata = {ajax: true};
        Object.assign(jsondata,this.localData);
        startWaiting();
        $.ajax({
          url: getApiUrl()+"/api/demo002/update",
          data: jsondata,
          type: "POST",
          dataType: "html",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: function(data){
            stopWaiting();
            console.log("success",data);
            successbox();
          }
        });	
      });
    },
    getOptions(settings = this.pagingSettings) {
      return {page: settings.page, limit: settings.limit, rowsPerPage: settings.rowsPerPage, orderBy: settings.orderBy?settings.orderBy:"", orderDir: settings.orderDir?settings.orderDir:"" };
    },
    searchclick() {
      this.pagingSettings.page = 1;
      this.pagingSettings.orderBy = "";
      this.pagingSettings.orderDir = "";
      let options = this.getOptions();
      this.filters = {account: this.localData.account};
      this.collecting(options,this.filters);
    },
    collecting(options,criterias) {
      console.log("collecting: options",options,", criteria",criterias);
      let jsondata = Object.assign({ajax: true},options);
      Object.assign(jsondata,criterias);
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/demo002/collect",
        data: jsondata,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("collecting: success",data);
          if(data.body) {
            this.$refs.dataTable.reset(data.body);
            this.$refs.dataPaging.reset(data.body?.offsets);
          }
        }
      });	
    },
    pageSelected(item) {
      console.log("App: pageSelected",item);
      this.pagingSettings.page = item.page;
      let options = this.getOptions();
      this.collecting(options,this.filters);
    },
    dataSelected(item,action) {
      console.log("App: dataSelected",item,"action",action);
      if("edit"==action) {
        this.retrieving({account: item.account});
      }
    },
    dataSorted(sorter,direction) {
      console.log("App: dataSorted",sorter,"direction",direction);
      this.pagingSettings.orderBy = sorter;
      this.pagingSettings.orderDir = direction;
      let options = this.getOptions();
      this.collecting(options,this.filters);
    },
    formatData(data,field) {
      console.log("App: formatData:",data,"field:",field);
      if(field.name=="gender") {
        if("M"==data) {
          //return this.labels.male_label; //"Male";
          return '<em class="fa fa-male"></em>';
        } else if("F"==data) {
          //return this.labels.female_label; //"Female";
          return '<em class="fa fa-female"></em>';
        } else return data;  
      }
      return this.$refs.dataTable.formatField(data,field);
    },
    showVersion(pid) {
      console.log("App: show version",pid);
    }
  }
};
</script>