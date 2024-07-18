<template>
  <div>
    <label>{{dict.text}}</label><el-input type="text" v-model="text" :disabled="disabled"></el-input>
    <p v-for="(v, k) in styleDict" :key="k">
      <label>{{v}}</label>
      <el-color-picker v-if="k.indexOf('olor') > -1" v-model="style[k]"></el-color-picker>
      <el-input v-else type="text" v-model="style[k]"></el-input>
    </p>
  </div>
</template>

<script>
const getVal = (name) => {
  let ns = name.split('_');
  let k1 = ns[0], k2 = ns[1], k3 = ns[2];
  return k3 ? jcst.setting[k1][k2][k3] :jcst.setting[k1][k2];
}
export default {
  name: 't-txt',
  props: {
    name: '',
    disabled: false
  },
  data() {
    let obj = getVal(this.name);
    return {
      dict: jcst_type_text_dict,
      styleDict: jcst_type_text_style_dict,
      text: obj && obj.text || '',
      style: obj && obj.style || {}
    }
  },
  created() {
  },
  watch: {
    text() {
      let obj = getVal(this.name);
      obj.text = this.text;
    }
  }
}
</script>

<style>

</style>