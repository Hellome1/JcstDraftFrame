<template>
  <el-collapse-item class="module-item" :name="name">
    <template slot="title">
      <h4 class="module-title" shape="moduleHeadFontSize-moduleHeadColor-vitalsignsTitle" :style="{ fontSize: moduleHeadFontSize, color: moduleHeadColor }">{{titleText}}</h4>
      <div class="func-area">
        <div class="loca-icon" v-if="showLocaIcon">
          <TipBox :tipmsg="tipmsg">
            <span class="tl-icon" @click.stop="handleClickIconBox"> {{word}} </span>
          </TipBox>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

const tipdict = {
  'vitalsigns': '定位到生命体征位置',
  'medicalOrder': '定位到用药医嘱位置',
  'pacs': '定位到检查位置',
  'lis': '定位到检验位置',
  'surgery': '定位到手术位置',
  'consult': '定位到会诊位置'
};
const wordDict = {
  'vitalsigns': '生',
  'medicalOrder': '药',
  'pacs': '查',
  'lis': '验',
  'surgery': '手',
  'consult': '会'
};
export default {
  name: 'collapseItem',
  props: {
    name: '',
    titleText: ''
  },
  data() {
    const name = this.name;
    const tipmsg = tipdict[name];
    return {
      timeinfo: moduleTimeInfo[name],
      tipmsg,
      word: wordDict[name] || 'L'
    }
  },
  computed: {
    ...inject('layout'),
    showLocaIcon() {
      let r = false;
      let { moduleTimeInfo } = this.$store.state;
      let timeinfo = moduleTimeInfo[this.name];
      for (let k in timeinfo) {
        r = true;
      }
      // console.log('moduleTimeInfo', moduleTimeInfo, this.name, r);
      return r;
    }
  },
  methods: {
    handleClickIconBox() {
      let timeInfo = moduleTimeInfo[this.name];
      let firstDate = '';
      for (let k in timeInfo) {
        let v = timeInfo[k];
        if (v[0]) {
          firstDate = v[0];
          break;
        }
      }
      selectPageFromDate(firstDate);
    }
  }
}
</script>

<style>

</style>