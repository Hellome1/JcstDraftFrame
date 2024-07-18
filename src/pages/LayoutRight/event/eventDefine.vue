<template>
  <div>
    <div>
      <el-select size="mini" style="margin-left: 15px;" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <a style="cursor: pointer; color: blue;" @click="handleClick">查看事件</a>
    </div>
  </div>
</template>

<script>
const options = [
  {
    label: '打开模态框',
    value: 'modal'
  }
];
const getVal = (name) => {
  let r = ['jcst', 'setting', ...name.split('_')];
  return getJcstValue(r);
};
const getValue = (name) => {
  let value = getVal(name);
  let keys = [];
  for (let k in value) {
    let key = k.split('.')[0];
    if (!keys.includes(key)) keys.push(key);
  }
  console.log('keys', keys);
  return keys[0];
}
export default {
  name: 'eventDefine',
  props: {
    name: ''
  },
  data() {
    let value = getValue(this.name);
    return {
      options,
      value
    }
  },
  methods: {
    handleClick() {
      jcst_config.eventShow = this.name;
      this.crouter('eventShow');
    }
  }
}
</script>

<style>

</style>