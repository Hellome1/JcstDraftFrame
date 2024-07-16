<template>
  <el-collapse-item class="module-item" :name="name">
    <template slot="title">
      <h4 class="module-title" shape="moduleHeadFontSize-moduleHeadColor-vitalsignsTitle" :style="{ fontSize: moduleHeadFontSize, color: moduleHeadColor }">{{titleText}}</h4>
      <div class="func-area">
        <TipBox :tipmsg="tipmsg" :isFixed="true">
          <span class="tl-icon type1" ref="detailBoxPosi1" @click.stop="handleClickIconBox"> L </span>
        </TipBox>
      </div>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

const tipdict = {
  'vitalsigns': '点位到生命体征位置'
};
export default {
  name: 'collapseItem',
  props: {
    name: '',
    titleText: ''
  },
  data() {
    const tipmsg = tipdict[this.name]
    return {
      tipmsg
    }
  },
  computed: {
    ...inject('layout')
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