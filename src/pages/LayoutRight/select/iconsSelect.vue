<template>
  <div>
    <div>
      <div style="display: inline-block; width: 20px; height: 20px; border: 1px solid black; text-align: center; line-height: 20px;">
        <i v-if="value" class="fa " :class="`fa-${value}`"></i>
      </div>
      <span @click="showlist = !showlist" style="margin-left: 5px; cursor: pointer; color: blue;">{{showlist ? '关闭' : '选择'}}</span>
    </div>
    <p class="list-icon" style="border: 1px solid black;" v-if="showlist">
      <i v-for="c in options" :key="c" class="fa " :class="`fa-${c}`" style="margin-left: 8px;" @click="value = c"></i>
    </p>
  </div>
</template>

<script>
const options = [ 
  'street-view', 
  'eyedropper', 
  'ambulance', 
  'asterisk', 
  'bars', 
  'certificate', 
  'clone', 
  'file-o', 
  'file-text-o', 
  'file-picture-o', 
  'file-pdf-o',
  'heart-o',
  'heartbeat',
  'medkit'
];
const getVal = (name) => {
  let r = ['jcst', 'setting', ...name.split('_')];
  return getJcstValue(r);
};
const setVal = (name, v) => {
  let r = ['jcst', 'setting', ...name.split('_')];
  setJcstValue(r, v);
}
export default {
  name: 'iconsSelect',
  props: {
    name: ''
  },
  data() {
    let value = getVal(this.name);
    return {
      value,
      showlist: false,
      options
    }
  },
  watch: {
    value() {
      setVal(this.name, this.value);
    }
  }
}
</script>

<style>

</style>