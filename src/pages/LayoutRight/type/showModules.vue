<template>
  <div class="show-modules">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="t in list" :key="t" :label="t"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
const dict = {};
let excludes = ['layout', 'header', 'timeline'];
let displayModules = [];
for (let k in jcst.setting) {
  if (!excludes.includes(k)) {
    displayModules.push(k);
    let title = jcst.setting[k].title || k;
    dict[k] = title;
  }
}
const getList = (arr) => {
  return arr.map(key => dict[key]);
}
const getKey = (arr) => {
  return arr.map(v => {
    let key = '';
    for (let k in dict) {
      if (v === dict[k]) key = k;
    }
    return key;
  })
}
export default {
  name: 'show-modules',
  data() {
    return {
      checkList: [],
      list: getList(displayModules)
    }
  },
  created() {
    this.checkList = this.cp(
      getList(this.displayModules)
    );
  },
  watch: {
    checkList() {
      jcst_layout.displayModules = getKey(this.checkList);
    }
  },
  computed: {
    ...inject('layout')
  }
}
</script>

<style>

</style>