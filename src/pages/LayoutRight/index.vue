<template>
  <div class="live-setting">
    <div class="live-s-toptip">
      <span>当前使用：<span style="color: orange;">{{'测试数据'}}</span></span><a style="margin-left: 10px;" href="#">设置数据</a>
    </div>
    <div class="live-s-item">
      <h3>布局</h3>
      <div class="live-s-main">
        <label>左侧宽度</label><el-input type="number" v-model="i_leftW"></el-input>
        <label>右侧宽度</label><el-input type="number" v-model="i_rightW"></el-input>
        <label>左侧背景颜色</label><el-color-picker v-model="i_leftBgColor"></el-color-picker>
        <br>
        <label>模块头部字体大小</label><el-input type="text" v-model="i_moduleHeadFontSize"></el-input>
        <label>模块头部字体颜色</label><el-color-picker v-model="i_moduleHeadColor"></el-color-picker>
        <br>
        <label>展示模块</label><ShowModules/>
      </div>
    </div>
    <div class="live-s-item">
      <h3>布局</h3>
      <div class="live-s-main">
        <label>左侧宽度</label><el-input type="number" v-model="i_leftW"></el-input>
        <label>右侧宽度</label><el-input type="number" v-model="i_rightW"></el-input>
        <label>左侧背景颜色</label><el-color-picker v-model="i_leftBgColor"></el-color-picker>
        <br>
        <label>模块头部字体大小</label><el-input type="text" v-model="i_moduleHeadFontSize"></el-input>
        <label>模块头部字体颜色</label><el-color-picker v-model="i_moduleHeadColor"></el-color-picker>
        <br>
        <label>展示模块</label><ShowModules/>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import ShowModules from './showModules/index.vue';
const getData = () => {
  let obj = {};
  const { layout } = setting;
  for (let k in layout) {
    obj[`i_${k}`] = layout[k];
  }
  return obj;
}
const data = getData();
const getWatcher = () => {
  let obj = {};
  for (let k in data) {
    obj[k] = (v, o) => {
      let ov = setting.layout[k.split('_')[1]];
      if ('number' === typeof ov) v = parseInt(v);
      setting.layout[k.split('_')[1]] = v;
    }
  }
  return obj;
}
const watcher = getWatcher();
export default {
  name: 'live-setting',
  components: {
    ShowModules
  },
  data() {
    return data
  },
  created() {
  },
  watch: {
    ...watcher
  },
  computed: {
    ...inject('layout', 'header')
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>