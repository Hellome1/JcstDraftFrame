<template>
  <div class="live-setting">
    <a style="color: blue; cursor: pointer;" @click="crouter('basic')" v-show="!show.basic">返回</a>
    <div class="basic" v-show="show.basic">
      <div class="live-s-toptip">
        <span>当前使用：<span style="color: orange;">{{'测试数据'}}</span></span><a style="margin-left: 10px;" href="#">设置数据</a>
      </div>
      <div class="live-s-item">
        <h3>{{dict.layout.title}}</h3>
        <div class="live-s-main">
          <label>{{dict.layout.leftW}}</label><el-input type="number" v-model="layout_leftW" v-highlight="'leftW,leftW-leftBgColor'"></el-input>
          <label>{{dict.layout.rightW}}</label><el-input type="number" v-model="layout_rightW" v-highlight="'rightW'"></el-input>
          <label>{{dict.layout.leftBgColor}}</label><el-color-picker v-model="layout_leftBgColor" v-highlight="'leftW-leftBgColor'"></el-color-picker>
          <br>
          <label>{{dict.layout.moduleHeadFontSize}}</label><el-input type="text" v-model="layout_moduleHeadFontSize" v-highlight="'moduleHeadFontSize-moduleHeadColor'"></el-input>
          <label>{{dict.layout.moduleHeadColor}}</label><el-color-picker v-model="layout_moduleHeadColor" v-highlight="'moduleHeadFontSize-moduleHeadColor'"></el-color-picker>
          <br>
          <label>{{dict.layout.displayModules}}</label><ShowModules/>
        </div>
      </div>
      <div class="live-s-item">
        <h3>{{dict.header.title}}</h3>
        <div class="live-s-main">
          <label>{{dict.header.isShow}}</label>
          <el-switch
            style="margin-left: 20px;"
            v-model="header_isShow"
            active-color="#13ce66"
            inactive-color="#eee">
          </el-switch>
          <h4>{{dict.header.product}}</h4>
          <Ttxt name="header_product"/>
          <h4>{{dict.header.hosName}}</h4>
          <Ttxt name="header_hosName"/>
          <h4>{{dict.header.patInfo}}</h4>
          <h5>{{dict.header.patInfo_birth}}</h5>
          <Ttxt name="header_patInfo_birth"/>
          <h5>{{dict.header.patInfo_gender}}</h5>
          <Ttxt name="header_patInfo_gender"/>
          <h5>{{dict.header.patInfo_hosReg}}</h5>
          <Ttxt name="header_patInfo_hosReg"/>
          <h5>{{dict.header.patInfo_name}}</h5>
          <Ttxt name="header_patInfo_name"/>
          <h4>{{dict.header.userInfo}}</h4>
          <h5>{{dict.header.userInfo_name}}</h5>
          <Ttxt name="header_userInfo_name"/>
          <h5>{{dict.header.userInfo_group}}</h5>
          <Ttxt name="header_userInfo_group"/>
          <h5>{{dict.header.userInfo_dept}}</h5>
          <Ttxt name="header_userInfo_dept"/>
          <label>{{dict.header.allergyData}}</label>
          <DataSelect name="header_allergyData"/>
        </div>
      </div>
    </div>
    
    <DataShow v-show="show.dataShow"/>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import ShowModules from './showModules/index.vue';
import Ttxt from './type/txt.vue';
import DataSelect from './type/dataSelect.vue';
import DataShow from './type/dataShow.vue';
const getData = () => {
  let obj = {};
  for (let k1 in jcst_setting) {
    let val = jcst_setting[k1];
    for (let k2 in val) {
      obj[`${k1}_${k2}`] = val[k2];
    }
  }
  return obj;
}
const data = getData();
data.dict = jcst_setting_lang_dict;
const getWatcher = () => {
  let obj = {};
  for (let k in data) {
    obj[k] = (v) => {
      let k1 = k.split('_')[0], k2 = k.split('_')[1];
      let ov = jcst_setting[k1][k2];
      if ('number' === typeof ov) v = parseInt(v);
      if ('boolean' === typeof ov) console.log(ov, v);
      jcst_setting[k1][k2] = v;
    }
  }
  return obj;
}
const watcher = getWatcher();
export default {
  name: 'live-setting',
  components: {
    ShowModules,
    Ttxt,
    DataSelect,
    DataShow
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
    ...inject('layoutRight')
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>