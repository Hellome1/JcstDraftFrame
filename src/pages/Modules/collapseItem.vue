<template>
  <el-collapse-item class="module-item" :name="name">
    <template slot="title">
      <h4 class="module-title" shape="moduleHeadFontSize-moduleHeadColor-vitalsignsTitle" :style="{ fontSize: moduleHeadFontSize, color: moduleHeadColor }">{{titleText}}</h4>
      <div class="func-area" v-if="showLocaIcon">
        <div class="loca-icon">
          <TipBox :tipmsg="tipmsg">
            <span class="tl-icon" @click.stop="handleClickIconBox"> {{word}} </span>
          </TipBox>
        </div>
        <div v-if="name === 'lis'" class="loca-icon">
          <TipBox :tipmsg="lisAbno ? $t('lis.moduleTitle.tipmsg.normal') : $t('lis.moduleTitle.tipmsg.abno')">
            <span class="module-title-func-btn" :class="lisAbno ? 'normal' : ''" @click.stop="handleLisAbno">{{ lisAbno ? $t('lis.moduleTitle.switchabno.norm') : $t('lis.moduleTitle.switchabno.abno') }}</span>
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
  'consult': translate.$t('consult.locIcon.tipmsg'),
  'EMR': translate.$t('EMR.locIcon.tipmsg'),
};
const wordDict = {
  'vitalsigns': translate.$t('vitalSigns.locIcon.word'),
  'medicalOrder': translate.$t('medicalOrder.locIcon.word'),
  'pacs': translate.$t('pacs.locIcon.word'),
  'lis': translate.$t('lis.locIcon.word'),
  'surgery': translate.$t('surgery.locIcon.word'),
  'consult': translate.$t('consult.locIcon.word'),
  'EMR': translate.$t('EMR.locIcon.word'),
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
      word: wordDict[name] || 'L',
      lisAbno: false
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
      if (!timeinfo) return false;
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
    },
    handleLisAbno() {
      this.lisAbno = !this.lisAbno;
      let lisData = Data.lisData;
      let abnoData = lisData.filter((itm, i) => (itm.abno || !this.lisAbno));
      bus.$emit('lis', function() {
        this.resdata = this.cp(abnoData);
      });
    }
  }
}
</script>

<style lang="scss">
.func-area {
  display: flex;
  
  >div {
    margin: 0 5px;

    .module-title-func-btn {
      color: white;
      padding: 1px 5px;
      font-size: 12px;
      background-color: red;
      border: 2px solid blue;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      top: 1px;

      &:hover {
        background-color: rgb(216, 0, 0);
      }
    }
    .module-title-func-btn.normal {
      background-color: #449bff;
      
      &:hover {
        background-color: #2d7eda;
      }
    }
  }
}
</style>