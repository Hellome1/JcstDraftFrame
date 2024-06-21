<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <!-- <CollapseItem name="1" titleText="生命体征">
      <VitalSigns class="vitalSigns"/>
    </CollapseItem> -->

    <CollapseItem v-for="m in modules" :key="m.name" :name="m.name" :titleText="m.text">
      <DynamicImport :name="m.name"/>
    </CollapseItem>
  </el-collapse>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import CollapseItem from './collapseItem.vue';
import DynamicImport from './dynamicImport.vue';
export default {
  name: 'modules',
  components: {
    CollapseItem,
    DynamicImport
  },
  data() {
    return {
      activeNames: []
    }
  },
  created() {
    console.log('modules', this.modules);
    this.activeNames = this.modules.map(m => m.name);
  },
  computed: {
    ...inject('layout'),
    modules() {
      return this.displayModules.map(key => ({name: key, text: setting[key].title }))
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style>

</style>