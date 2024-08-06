<template>
  <div>
    <ul class="pacspop-items">
      <li class="pacspop-item" v-for="(data, i) in datas" :style="checkCurRqt(data) ? { borderLeft: '3px solid red' } : {}" :key="i">
        <div class="pacspop-item-left">
          <span class="pacspop-a1" v-for="(itm, index) in head" :key="index">
            <span class="pacspop-a1-l">{{itm['label']}} : </span><span class="pacspop-a1-r">{{data[itm['code']]}}</span>
          </span>
        </div>
        <div class="pacspop-item-middle">
          <TipBox tipmsg="点击查看PDF报告" :isFixed="true">
            <i class="fa fa-file-pdf-o" style="color: #ff5d5d; cursor: pointer" @click="handleClick(data)"></i>
          </TipBox>
        </div>
        <div class="pacspop-item-right">
          <div class="pacspop-a2" v-for="(itm, index) in body" :key="index">
            <p class="pacspop-a2-t">{{itm['label']}} : </p>
            <div class="cover-scrollbar">
              <TipBox :tipmsg="data[itm['code']]" :isFixed="true" >
                <p class="pacspop-a2-b">{{data[itm['code']]}}</p>
              </TipBox>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

export default {
  name: 'pacsPop',
  data() {
    return {
      datas: jcst.datas['pacs'] || [],
      head: [
        {
          label: '项目名称',
          code: 'examItemName'
        },
        {
          label: '检查号',
          code: 'examId'
        },
        {
          label: '检查科室',
          code: 'examDeptName'
        },
        {
          label: '检查医生',
          code: 'examDocName'
        },
        {
          label: '审核医生',
          code: 'examRptDocName'
        },
        {
          label: '检查日期',
          code: 'examDate'
        },
        {
          label: '报告日期',
          code: 'examRptDate'
        },
        {
          label: 'HIS医嘱号',
          code: 'hosOrdId'
        }
      ],
      body: [
        {
          label: '检查所见',
          code: 'examSymptom'
        },
        {
          label: '诊断建议',
          code: 'diagnoseComments'
        }
      ]
    };
  },
  created() {
    this.busOn();
    this.handleClickedRow();
  },
  watch: {
    dialogVisible() {
      this.handleClickedRow();
    }
  },
  computed: {
    ...inject('modal', 'pacs')
  },
  methods: {
    busOn() {
      bus.$on('pacspop', cb => cb && cb.call(this));
    },
    handleClickedRow() {
      let selectedRow = jcst.selectedRow;
      if (selectedRow) {
        let datas = jcst.datas['pacs'];
        let filres = datas.filter(itm => (itm[this.name] === selectedRow[this.name]));
        console.log('filres', this.cp(filres));
        this.datas = filres;
      }
    },
    checkCurRqt(itm) {
      let selectedRow = jcst.selectedRow;
      let { name, date, time } = this;
      if (selectedRow) {
        return itm[name] + itm[date] + itm[time] === selectedRow[name] + selectedRow[date] + selectedRow[time];
      }
      return false;
    },
    handleClick(data) {
      jcst.currentClickedRow = data;
      let path = getPacsPDFPath();
      jcst.iframe['src'] = path;
      jcst.modalTwo.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>