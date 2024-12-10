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
  'vitalsigns': translate.$t('vitalSigns.locIcon.tipmsg'),
  'medicalOrder': translate.$t('medicalOrder.locIcon.tipmsg'),
  'pacs': translate.$t('pacs.locIcon.tipmsg'),
  'lis': translate.$t('lis.locIcon.tipmsg'),
  'surgery': translate.$t('surgery.locIcon.tipmsg'),
  'consult': translate.$t('consult.locIcon.tipmsg')
};
const wordDict = {
  'vitalsigns': translate.$t('vitalSigns.locIcon.word'),
  'medicalOrder': translate.$t('medicalOrder.locIcon.word'),
  'pacs': translate.$t('pacs.locIcon.word'),
  'lis': translate.$t('lis.locIcon.word'),
  'surgery': translate.$t('surgery.locIcon.word'),
  'consult': translate.$t('consult.locIcon.word')
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
  watch: {
    showLocaIcon(value) {
      if (value) {
        loc_moduleTimeInfo(this.name);
      }
    }
  },
  computed: {
    ...inject('layout'),
    moduleTimeInfo() {
      return this.$store.state.moduleTimeInfo;
    },
    showLocaIcon() {
      let r = false;
      let moduleTimeInfo = this.moduleTimeInfo;
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