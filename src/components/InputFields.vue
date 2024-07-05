<!-- InputFields.vue -->
<template>
  <div id="entrydialoglayer" class="entry-dialog-layer">
    <div class="row row-height">
      <div class="col-height col-md-3">
        <label for="account">{{ label.account_label }}:</label>
        <input type="text" v-model="localData.account" id="account" name="account" class="form-control input-md" required />
        <p>{{ localData.account }}</p>
      </div>
      <div class="col-height col-md-3">
        <label for="amount">{{ label.amount_label }}:</label>
        <input type="text" v-model="localData.amount" id="amount" name="amount" class="form-control input-md imoney" decimal="2" required />
        <!--<input type="number" v-model="localData.amount" id="amount" name="amount" class="form-control input-md" required />-->
        <p>{{ localData.amount }}</p>
      </div>
      <div class="col-height col-md-3">
        <label for="account">{{ label.pincode_label }}:</label>
        <input type="text" v-model="localData.pincode" id="pincode" name="pincode" class="form-control input-md" picture="XXXXXXXX" required />
        <p>{{ localData.pincode }}</p>
      </div>
    </div>
    <div class="row row-height">
      <div class="col-height col-md-3">
        <label for="effectdate">{{ label.effectdate_label }}:</label>
        <div class="input-group-container">
          <div class="input-group input-group-calendar">
            <input type="text" v-model="localData.effectdate" id="effectdate" name="effectdate" class="form-control input-md idate" picture='99/99/9999' maxlength="10" editable="true" readonly />
            <A href="javascript:void(0)" NAME="LKeffectdate" ID="LKeffectdate" tabIndex="-1" class="input-group-addon input-group-append input-group-text input-group-lookup"><i class="fa fa-calendar" aria-hidden="true"></i></a>
            <A href="javascript:void(0)" NAME="CLReffectdate" ID="CLReffectdate" tabIndex="-1" class="input-group-addon input-group-append input-group-text input-group-clear"><i class="fa fa-times" aria-hidden="true"></i></a>
          </div>
        </div>
    <p>{{ localData.effectdate }}</p>
      </div>
      <div class="col-height col-md-3">
        <label for="testdate">{{ label.effecttime_label }}:</label>
        <input type="text" v-model="localData.effecttime" id="effecttime" name="effecttime" class="form-control input-md itime" />
    <p>{{ localData.effecttime }}</p>
      </div>
    </div>
    <div class="row row-height">
      <div class="col-height col-md-1">
        <label for="amount">{{ label.age_label }}:</label>
      </div>
      <div class="col-height col-md-2">
        <input type="text" v-model="localData.age" id="age" name="age" class="form-control input-md iint" required />
        <p>{{ localData.age }}</p>
      </div>
      <div class="col-height col-md-5">
        <div class="form-check">
        <input type="checkbox" id="domestic" :true-value="1" :false-value="0" v-model="localData.domestic" class="form-control input-md form-check-input"/>
        <label for="domestic" class="form-check-label">{{ label.domestic_label }}</label>
        </div>
    <p>{{ localData.domestic }}</p>
      </div>
    </div>
    <div class="row row-height">
      <div class="col-height col-md-1">
        <label>{{ label.gender_label }}:</label>&nbsp;&nbsp;
      </div>
      <div class="col-height col-md-2">
        <div class="form-check">
        <input type="radio" id="male" value="M" v-model="localData.gender" class="form-control input-md form-check-input"/>
        <label for="male" class="form-check-label">{{ label.male_label }}</label>
        </div>
      </div>
      <div class="col-height col-md-2">
        <div class="form-check">
        <input type="radio" id="female" value="F" v-model="localData.gender" class="form-control input-md form-check-input"/>
        <label for="female" class="form-check-label">{{ label.female_label }}</label>
        </div>
      </div>
      <p>{{ localData.gender }}</p>
    </div>
    <div class="row row-height">
      <div class="col-height col-md-1">
        <label>{{ label.licenses_label }}:</label>&nbsp;&nbsp;
      </div>    
    <template v-for="item in dataCategory.licenses" :key="item.key">
      <div class="col-height col-md-2">
        <div class="form-check">
          <input type="checkbox" :id="item.key" :value="item.key" v-model="localData.licenses" class="form-control input-md form-check-input"/>
          <label :for="item.key" class="form-check-label">{{item.text}}</label>
        </div>
      </div>
    </template>
    <p>{{ localData.licenses }}</p>
    </div>
    <div class="row row-height">
      <div class="col-height col-md-3">
        <label>{{ label.marrystatus_label }}:</label>
        <select v-model="localData.marrystatus" class="form-control input-md">
          <option value=""></option>          
          <option v-for="item in dataCategory.marrystatus" :key="item.key" :value="item.key">{{item.text}}</option>
        </select>
    <p>{{ localData.marrystatus }}</p>
      </div>
      <div class="col-height col-md-3">
        <label>{{ label.languages_label }}:</label>
        <select v-model="localData.languages" class="form-control input-md" multiple>
          <option v-for="item in localCategory.languages" :key="item.key" :value="item.key">{{item.text}}</option>
        </select>
    <p>{{ localData.languages }}</p>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-md-12 pull-right text-right">
        <button @click="assertclick" class="btn btn-primary btn-normal">Assert</button>&nbsp;&nbsp;
        <button @click="setlangclick" class="btn btn-primary btn-normal">Set Language</button>&nbsp;&nbsp;
        <button @click="assignclick" class="btn btn-primary btn-normal">Set Language List</button>&nbsp;&nbsp;
        <button @click="resetclick" class="btn btn-primary btn-normal">Reset</button>&nbsp;&nbsp;
        <button @click="submitclick" class="btn btn-primary btn-normal">Submit Form</button>&nbsp;&nbsp;
      </div>
    </div>
  </div>
</template>
<style>
  #entrydialoglayer { background-color: #E8FAF2; padding: 10px; margin-left: 0px; margin-right: 0px; margin-top: 10px; margin-bottom: 10px; }
</style>
<script>
import $ from "jquery";
import { ref, watch } from 'vue';

export default {
  props: {
    labels: Object,
    formData: Object,
    dataCategory: Object
  },
  setup(props, { emit }) {
    const label = ref({...props.labels});
    const localData = ref({ ...props.formData }); // Create a local copy
    const localCategory = ref({...props.dataCategory});
    // Watch for changes in the prop and update the local copy
    watch(() => props.formData, (newData) => {
        console.log("props.formData: watch: newData",newData);
      Object.assign(localData, newData);
    });
    // Emit an event when localData changes
    watch(localData, (newLocalData) => {
        console.log("InputFields.vue: watch: newLocalData",newLocalData);
      emit('update:formData', newLocalData);
    });

    return { label, localData, localCategory };
  },
  mounted() {
    console.log("InputFields: on mounted ...");
    const curData = this.localData;
    //this.$nextTick(function () {
      $("#effectdate").data("afterSelectDatePicker",function(input) { 
        curData.effectdate = input;
      });
      $("#effecttime").data("afterSelectTimePicker",function() { 
        curData.effecttime = $("#effecttime").val();
      });
    //});
  },  
  methods: {
    reset(newData) {
      if(newData) this.localData = {...newData};
    },
    setLabel(newLabel) {
      if(newLabel) this.label = {...newLabel};
    },
    assertclick() {
        // Handle form submission if needed
        console.log("localData", JSON.stringify(this.localData));
        console.log("formData", JSON.stringify(this.formData));
        alert("localData\n\n"+JSON.stringify(this.localData)+"\n\nformData\n\n"+JSON.stringify(this.formData));
    },
    resetclick() {
        this.reset(this.formData);
    },
    submitclick() {      
        console.log("submit clicked: formData", this.formData);
        console.log("submit clicked: localData", this.localData);
        this.$emit('update:formData', this.localData);
    },
    assignclick() {
      this.localCategory.languages = [{key: "EN", text: "English"},{key: "CN", text: "Chinese"},{key: "KR", text: "Korea"},{key: "JP", text: "Japan"}, {key: "VN", text: "Vietnames"}];
    },
    setlangclick() {
      this.localData.languages = ["TH","EN"];
    },
  }
};
</script>
