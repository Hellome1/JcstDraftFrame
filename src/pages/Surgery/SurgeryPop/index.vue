<template>
  <div class="surgery-pop-index">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <h3 class="detail_header">{{ surgeryDetail.operationDesc }}</h3>
      </div>
      <!-- <div class="detail_item">
        <strong>手术类型</strong>
        <span>{{ cur_sugerapp.operationType }}</span>
      </div>
      <div class="detail_item">
        <strong>手术室</strong>
        <span>{{ cur_sugerapp.operationRoom }}</span>
      </div>
      <div class="detail_item">
        <strong>术前诊断</strong>
        <span>{{ cur_sugerapp.preOperDiagRemark }}</span>
      </div> -->
      <div class="detail_item">
        <strong>手术级别</strong>
        <span>{{ surgeryDetail.operationLevel }}</span>
      </div>
      <div class="detail_item">
        <strong>手术状态</strong>
        <span>{{ surgeryDetail.operationStatus }}</span>
      </div>
      <div class="detail_item">
        <strong>手术部位</strong>
        <span>{{ surgeryDetail.operationPosition }}</span>
      </div>
      <div class="detail_item">
        <strong>手术开始日期</strong>
        <span>{{ detail.operStartDate }}</span>
      </div>
      <div class="detail_item">
        <strong>手术开始时间</strong>
        <span>{{ detail.operStartTime }}</span>
      </div>
      <div class="detail_item">
        <strong>手术结束日期</strong>
        <span>{{ detail.operEndDate }}</span>
      </div>
      <div class="detail_item">
        <strong>手术结束时间</strong>
        <span>{{ detail.operEndTime }}</span>
      </div>
      <div class="detail_item">
        <strong>手术医生</strong>
        <span>{{ surgeryDetail.operDocName }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import { getSurgeryDetail } from '@/server/api.js';
export default {
  name: 'SurgeryPopIndex',
  data() {
    return {
      surgeryDetail: {}
    }
  },
  computed: {
    ...inject('surgery'),
    detail() {
      return this.surgeryData[0];
    }
  },
  created() {
    bus.$on('surgeryPop', cb => {
      cb && cb.call(this);
    });
    getSurgeryDetail();
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import './index.scss';
</style>