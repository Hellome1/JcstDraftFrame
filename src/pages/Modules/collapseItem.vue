<template>
  <el-collapse-item class="module-item" :name="name">
    <template slot="title">
      <h4 class="module-title" shape="moduleHeadFontSize-moduleHeadColor-vitalsignsTitle" :style="{ fontSize: moduleHeadFontSize, color: moduleHeadColor }">{{titleText}}</h4>
      <div class="func-area">
        <div class="loca-icon" v-if="showLocaIcon">
          <TipBox :tipmsg="tipmsg">
            <span class="tl-icon" @click.stop="handleClickIconBox"> L </span>
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
  'pacs': '定位到检查位置',
  'lis': '定位到检验位置'
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
      tipmsg
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