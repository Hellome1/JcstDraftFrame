<template>
  <el-collapse v-model="activeNames" class="modulerootindexref">
    <CollapseItem v-for="m in modules" :key="m.name" :name="m.name" :titleText="m.text" shape="displayModules">
      <DynamicImport :name="m.name" />
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
    this.activeNames = this.modules.map(m => m.name);
  },
  computed: {
    ...inject('layout'),
    modules() {
      return this.displayModules.map(key => ({name: key, text: jcst.setting[key][key+'Title'] }))
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>