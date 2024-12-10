<template>
  <div>
    <h3 style="text-align: center;">{{title}}</h3>
    <div class="pop_subTitles">
      <div class="subTitleCon" ref="subCol" v-for="(sub, i) in subTitles" :key="'sub_' + i">
        <span class="subTitle">{{ sub.title }}</span
        >:
        <span class="subVal">{{ sub.val }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
export default {
  name: 'LisPopHead',
  data() {
    const { selectedRow } = jcst;
    return {
      subTitles: [
        'setting.lis.labelConfig.popUpWindow.subTitles[0].left|hosInspRptId',
        'setting.lis.labelConfig.popUpWindow.subTitles[1].left|inspRptDeptName',
        'setting.lis.labelConfig.popUpWindow.subTitles[2].left|inspRptVerifyDocName',
        'setting.lis.labelConfig.popUpWindow.subTitles[3].left|inspSpecmCode',
        'setting.lis.labelConfig.popUpWindow.subTitles[4].left|inspRptVerifyDate',
        'setting.lis.labelConfig.popUpWindow.subTitles[5].left|inspRptVerifyTime'
      ].map(itm => ({ title: translate.$t(itm.split('|')[0]), val: selectedRow[itm.split('|')[1]] }))
    };
  },
  computed: {
    ...inject('lis'),
    title() {
      const { selectedRow } = jcst;
      return selectedRow[this.name];
    }
  }
};
</script>

<style lang="scss">
.pop_subTitles {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 20px;
  .subTitleCon {
    box-sizing: border-box;
    width: 33.3%;
    padding: 8px 5px;
    word-break: break-all;
  }
}
</style>