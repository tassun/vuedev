<template>
<table id="datatable" class="table table-bordered table-hover table-striped tablesorter">
	<thead id="datatableheader">
		<tr>
			<th class="text-center th-sequence"><label id="seqno_headerlabel">{{ label.seqno_label }}</label></th>
			<th class="text-center th-data"><a href="javascript:void(0)" class="alink-sorter fa-data-sort" data-sorter="account" @click="dataSort('account')"><label>{{ label.account_head }}</label></a></th>
			<th class="text-center th-data"><a href="javascript:void(0)" class="alink-sorter fa-data-sort" data-sorter="amount" @click="dataSort('amount')"><label>{{ label.amount_head }}</label></a></th>
			<th class="text-center th-data"><a href="javascript:void(0)" class="alink-sorter fa-data-sort" data-sorter="age" @click="dataSort('age')"><label>{{ label.age_head }}</label></a></th>
			<th class="text-center th-data"><a href="javascript:void(0)" class="alink-sorter fa-data-sort" data-sorter="effectdate" @click="dataSort('effectdate')"><label>{{ label.effectdate_head }}</label></a></th>
			<th class="text-center th-data"><a href="javascript:void(0)" class="alink-sorter fa-data-sort" data-sorter="effecttime" @click="dataSort('effecttime')"><label>{{ label.effecttime_head }}</label></a></th>
			<th class="text-center th-action"><em class="fa fa-bolt" aria-hidden="true"></em></th>
		</tr>
	</thead>
	<tbody id="datatablebody">
    <template v-if="hasDataSet">
        <tr v-for="(item,index) in datas?.rows" :key="index">
            <td class="text-center"><label>{{ page.recordsNumber(index+1) }}</label></td>
            <td><a href="javascript:void(0)" class="alink-data fa-data-edit" :data-key="item.account" @click="dataSelect(item)">{{ item.account }}</a></td>
            <td><a href="javascript:void(0)" class="alink-data fa-data-edit" :data-key="item.account" @click="dataSelect(item)">{{ item.amount }}</a></td>
            <td><a href="javascript:void(0)" class="alink-data fa-data-edit" :data-key="item.account" @click="dataSelect(item)">{{ item.age }}</a></td>
            <td><a href="javascript:void(0)" class="alink-data fa-data-edit" :data-key="item.account" @click="dataSelect(item)">{{ item.effectdate }}</a></td>
            <td><a href="javascript:void(0)" class="alink-data fa-data-edit" :data-key="item.account" @click="dataSelect(item)">{{ item.effecttime }}</a></td>
            <td class="text-center">
                <button class="btn-edit fa-data-edit" :data-key="item.account" @click="dataSelect(item)"></button>
                <button class="btn-delete fa-data-delete" :data-key="item.account" @click="dataSelect(item,'delete')"></button>
            </td>
        </tr>
    </template>
    <template v-if="recordNotFound">
        <tr>
            <td class="text-center" colspan="7">
                {{ label.record_notfound }}
            </td>
        </tr>
    </template>
	</tbody>
</table>	
</template>
<script>
import { ref } from 'vue';
import { Paging } from "../assets/pageutil.js";

export default {
  props: {
    labels: Object,
    dataset: Object,
  },
  setup(props) {
    const label = ref({ ...props.labels });
    const datas = ref({ ...props.dataset }); 
    const page = new Paging(props.dataset?.offsets);
    const sorting = ref({});
    return { label, datas, page, sorting };
  },
  computed: {
    hasDataSet() {
        return this.datas?.rows?.length > 0;
    },
    recordNotFound() {
      return this.datas?.rows?.length == 0;
    }
  },
  emits: ["data-select","data-sort"],
  methods: {
    reset(newData) {
      if(newData) {
        this.datas = {...newData};
        this.page.reset(newData?.offsets);
      }
    },
    setLabel(newLabel) {
      if(newLabel) this.label = {...newLabel};
    },
    dataSelect(item,action='edit') {
      this.$emit('data-select', item,action);
    },
    getDirection(orderDir) {
      if(orderDir) {
        return "ASC"==orderDir?"DESC":"ASC";
      }
      return "ASC";
    },
    dataSort(sorter) {
      let direction = this.getDirection(this.sorting[sorter]);
      this.sorting[sorter] = direction;
      this.$emit('data-sort', sorter, direction);
    }
  }
};
</script>
