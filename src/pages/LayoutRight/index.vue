<template>
  <div class="live-setting" ref="liveSetting" @scroll="handleScroll">
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
          <label>{{dict.layout.moduleHeadFontSize}}</label><el-input type="text" v-model="layout_moduleHeadFontSize" v-highlight="'moduleHeadFontSize-moduleHeadColor-vitalsignsTitle'"></el-input>
          <label>{{dict.layout.moduleHeadColor}}</label><el-color-picker v-model="layout_moduleHeadColor" v-highlight="'moduleHeadFontSize-moduleHeadColor-vitalsignsTitle'"></el-color-picker>
          <br>
          <label>{{dict.layout.displayModules}}</label><ShowModules v-highlight="'displayModules'"/>
        </div>
      </div>
      <div class="live-s-item">
        <h3>{{dict.header.title}}</h3>
        <div class="live-s-main">
          <label>{{dict.header.isShow}}</label>
          <el-switch
            v-highlight="'isShow'"
            style="margin-left: 20px;"
            v-model="header_isShow"
            active-color="#13ce66"
            inactive-color="#eee">
          </el-switch>
          <h4>{{dict.header.product}}</h4>
          <Ttxt name="header_product" disabled v-highlight="'product'"/>
          <h4>{{dict.header.hosName}}</h4>
          <Ttxt name="header_hosName" v-highlight="'hosName'"/>
          <h4>{{dict.header.allergyTitle}}</h4>
          <label>{{dict.header.allergyIcon}}</label><IconsSelectVue name="header_allergyIcon" v-highlight="'allergyIcon-allergyData'"/>
          <label>{{dict.header.allergyData}}</label><DataSelect name="header_allergyData" v-highlight="'allergyIcon-allergyData'"/>
          <br>
          <!-- 定义事件 -->
          <label>{{dict.header.handleClick}}</label><EventDefine name="header_handleClick" v-highlight="'allergyIcon-handleClick'"/>
          <h4>{{dict.header.patInfo}}</h4>
          <h5>{{dict.header.patInfo_name}}</h5>
          <Ttxt name="header_patInfo_name" disabled v-highlight="'patInfo_name'"/>
          <h5>{{dict.header.patInfo_gender}}</h5>
          <Ttxt name="header_patInfo_gender" disabled v-highlight="'patInfo_gender'"/>
          <h5>{{dict.header.patInfo_birth}}</h5>
          <Ttxt name="header_patInfo_birth" disabled v-highlight="'patInfo_birth'"/>
          <h5>{{dict.header.patInfo_hosReg}}</h5>
          <Ttxt name="header_patInfo_hosReg" disabled v-highlight="'patInfo_hosReg'"/>
          <h4>{{dict.header.userInfo}}</h4>
          <h5>{{dict.header.userInfo_name}}</h5>
          <Ttxt name="header_userInfo_name" v-highlight="'userInfo_name'"/>
          <h5>{{dict.header.userInfo_group}}</h5>
          <Ttxt name="header_userInfo_group" v-highlight="'userInfo_group'"/>
          <h5>{{dict.header.userInfo_dept}}</h5>
          <Ttxt name="header_userInfo_dept" v-highlight="'userInfo_dept'"/>
        </div>
      </div>
      <div class="live-s-item">
        <h3>{{dict.timeline.title}}</h3>
        <label>{{dict.timeline.iconShow}}</label>
        <el-switch
          v-highlight="'iconShow'"
          style="margin-left: 20px;"
          v-model="timeline_iconShow"
          active-color="#13ce66"
          inactive-color="#eee">
        </el-switch>
        <br>
        <label>{{dict.timeline.showDays}}</label><el-input type="number" v-model="timeline_showDays" v-highlight="'showDays'"></el-input>
        <label>{{dict.timeline.interval}}</label>
        <el-select size="mini" style="margin-left: 15px;" v-model="timeline_interval" v-highlight="'interval'" placeholder="请选择">
          <el-option
            v-for="item in [{label: '2', value: 2}, {label: '3', value: 3}, {label: '4', value: 4}, {label: '6', value: 6}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br>
        <label>{{dict.timeline.topTimeSubTract}}</label><el-input type="number" v-model="timeline_topTimeSubTract" v-highlight="'interval'"></el-input>
      </div>
      <div class="live-s-item">
        <h3>{{dict.vitalsigns.title}}</h3>
        <label>{{dict.vitalsigns.vitalsignsTitle}}</label><el-input v-model="vitalsigns_vitalsignsTitle" v-highlight="'moduleHeadFontSize-moduleHeadColor-vitalsignsTitle'"></el-input>
        <label>{{dict.vitalsigns.rowHeight}}</label><el-input type="number" v-model="vitalsigns_rowHeight" v-highlight="'rowHeight'"></el-input>
      </div>
    </div>
    
    <DataShow v-show="show.dataShow"/>

    <EventShow v-if="show.eventShow"/>


  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import ShowModules from './type/showModules.vue';
import Ttxt from './type/txt.vue';
import DataSelect from './select/dataSelect.vue';
import DataShow from './type/dataShow.vue';
import IconsSelectVue from './select/iconsSelect.vue';
import EventDefine from './event/eventDefine.vue';
import EventShow from './event/eventShowV.vue';
let dom = null, scrollTop = 0;
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
    DataShow,
    IconsSelectVue,
    EventShow,
    EventDefine
  },
  data() {
    return data
  },
  created() {
  },
  watch: {
    ...watcher,
    basic() {
      if (this.basic && dom && scrollTop) {
        this.$nextTick(() => {
          dom.scrollTop = scrollTop;
        })
      }
    }
  },
  computed: {
    ...inject('layoutRight'),
    basic() {
      return this.show.basic;
    }
  },
  methods: {
    handleScroll() {
      if (this.show.basic) {
        dom = this.$refs.liveSetting;
        scrollTop = dom.scrollTop;
      }
    },
    viewItems(name) {
      jcst_config.itemsShow = name;
      this.crouter('itemsShow');
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>