<template>
  <span>
    <el-select size="mini" style="margin-left: 15px;" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    存在
    <a style="margin-left: 15px; color: blue; cursor: pointer;" @click="viewData">查看数据</a>
  </span>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
const dict = jcst_Data_name_dict;
const getVal = (name) => {
  let ns = name.split('_');
  let k1 = ns[0], k2 = ns[1], k3 = ns[2];
  return k3 ? jcst.setting[k1][k2][k3] :jcst.setting[k1][k2];
}
const getKey = (name) => {
  let key = '';
  let obj = getVal(name);
  for (let k in Data) {
    if (obj === Data[k]) key = k;
  }
  return key;
}
const getOptions = () => {
  return Object.keys(Data).map(k => ({value: k, label: dict[k]}));
}
export default {
  name: 'dataSelect',
  props: {
    name: ''
  },
  data() {
    let key = getKey(this.name);
    return {
      value: key,
      options: getOptions()
    }
  },
  computed: {
    ...inject('layoutRight')
  },
  methods: {
    viewData() {
      jcst_config.dataShow = Data[this.value];
      this.crouter('dataShow');
    }
  }
}
</script>

<style>

</style>