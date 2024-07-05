<template>
<div class="header-layer">
    <nav class="program-controlbar navbar navbar-expand-sm navbar-top navbar-header-title">
        <h1 class="page-header-title"><div class="navbar-header"><label>{{ label.caption_title }}</label></div></h1>
        <ul class="navbar-nav navbar-right ml-auto program-control-layer">
          <li class="dropdown user-dropdown"><A href="javascript:void(0)" class="program-linker dropdown-toggle" data-toggle="dropdown"><span>{{ pageId }}</span></A>
            <ul class="dropdown-menu dropdown-menu-right page-header-menu" v-if="displayMenu">
              <slot></slot>
              <li v-if="displayVersion"><A href="javascript:void(0)" @click="showVersion" class="pagemenu-linker"><em class="fa fa-info-circle fa-class" aria-hidden="true"></em>&nbsp;<span>{{ label.version_label }}</span></A></li>
            </ul>
          </li>
        </ul>
    </nav>
</div>
</template>
<script>
import { ref } from 'vue';
import { Utilities } from '@/assets/Utilities';

export default {
  props: {
    pid: String,
    labels: Object,
    viewVersion: {
      type: Boolean,
      default: true,
    }
  },
  emits: ["show-version"],
  setup(props) {
    const label = ref({ ...props.labels });
    return { label };
  },
  computed: {
    pageId() { return this.$props.pid.toUpperCase(); },
    displayVersion() { return Utilities.parseBoolean(this.$props.viewVersion); },
    displayMenu() { 
      return this.$slots.default || this.displayVersion;
    },
  },
  methods: {
    setLabel(newLabel) {
      if(newLabel) this.label = {...newLabel};
    },
    showVersion() {
      console.log("show version: "+this.$props.pid);
      this.$emit('show-version', this.$props.pid);
    }
  },
};
</script>
