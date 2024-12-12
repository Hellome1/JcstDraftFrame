<template>
  <div class="module-content">
    <el-row>
      <el-col class="layout-left consul-left" :span="leftW" :style="{ backgroundColor: leftBgColor }">
        <div class="dept-check consul-check">
          <el-checkbox-group v-model="checkDept" size="mini">
            <span v-for="(el, i) in dept" :key="i" class="dept-check-item consul-check-item">
              <el-checkbox-button :label="el.code">{{ el.desc }}</el-checkbox-button>
            </span>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col class="layout-right" :span="rightW">
        <el-row class="module-content-list" >
          <el-col
            v-for="(day, i) in showDays"
            :key="i"
            :sm="3"
            :xs="3"
          >
            <div v-for="(item, d) in filDatas" :key="d">
              <Label 
                v-if="curdates[i] === item[date]" 
                :param="item" 
                :basic="{ name, date, time }"
                :labelConfig="labelConfig"
                :labelClick="{}"
                @click.native="showRecord(item)" 
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      :title="$t('consult.dialog.title')"
      width="80%"
      :visible.sync="dialogVisible"
    >
      <div class="consult-page" v-if="currentRecord">
        <div class="consult-page-section">
          <div class="cpso-row">
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p1')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.ecCategory }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p2')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.ecnDate }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p3')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.ecnPlace }}</span>
            </div>
          </div>
          <div class="cpso-row">
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p4')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.patientName }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p5')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.patGenderDesc }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p6')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.patBirthDate }}</span>
            </div>
          </div>
          <div class="cpso-row">
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p7')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.patMobPhone }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p8')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.hosPatRegNo }}</span>
            </div>
            <div class="cpso-col">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p9')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.hosInfo }}</span>
            </div>
          </div>
          <div class="cpso-row">
            <div class="cpso-col" style="border-bottom: 1px solid black;">
              <span class="cpso-col-l">{{$t('consult.detail.s1.p10')}}:</span>
              <span class="cpso-col-r">{{ currentRecord.diagnoseDescs }}</span>
            </div>
          </div>
        </div>
        <div class="consult-page-section">
          <div class="cpso-row">
            <div class="cpso-col cpso-col-h" style="background-color: #1890ff; text-align: center;">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p1')}}</span>
            </div>
          </div>
          <div class="cpso-row">
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p2')}}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p3')}}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p4')}}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p5')}}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-l">{{$t('consult.detail.s2.p6')}}</span>
            </div>
          </div>
          <div class="cpso-row" style="border-bottom: 1px solid black;">
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-r">{{ currentRecord.eccLocDescs }}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-r">{{ currentRecord.eccDocRanks }}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-r">{{ currentRecord.ecSubMars }}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-r">{{ currentRecord.eccDocDescs }}</span>
            </div>
            <div class="cpso-col cpso-col-h">
              <span class="cpso-col-r">{{ currentRecord.ecEvaDescs }}</span>
            </div>
          </div>
        </div>
        <div class="consult-page-section">
          <div class="cpso-row">
            <div class="cpso-col cpso-col-h" style="background-color: #1890ff; text-align: center;">
              <span class="cpso-col-l">{{$t('consult.detail.s3.p1')}}</span>
            </div>
          </div>
          <div class="cpso-row" style="border-bottom: 1px solid black;">
            <div class="cpso-col cpso-col-xh">
              <span class="cpso-col-r">{{ currentRecord.ectrePro }}</span>
            </div>
          </div>
        </div>
        <div class="consult-page-section">
          <div class="cpso-row">
            <div class="cpso-col cpso-col-h" style="background-color: #1890ff; text-align: center;">
              <span class="cpso-col-l">{{$t('consult.detail.s4.p1')}}</span>
            </div>
          </div>
          <div class="cpso-row" style="border-bottom: 1px solid black;">
            <div class="cpso-col cpso-col-xh">
              <span class="cpso-col-r">{{ currentRecord.ecPurpose }}</span>
            </div>
          </div>
        </div>
        <div class="consult-page-section">
          <div class="cpso-row">
            <div class="cpso-col cpso-col-h" style="background-color: #1890ff; text-align: center;">
              <span class="cpso-col-l">{{$t('consult.detail.s5.p1')}}</span>
            </div>
          </div>
          <div class="cpso-row" style="border-bottom: 1px solid black;">
            <div class="cpso-col cpso-col-xh">
              <span class="cpso-col-r">{{ currentRecord.ecOpinions }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import { getConsult } from '@/server/api';
import Label from '@/components/Label/labelData.vue';

export default {
  name: 'consult',
  components: {
    Label
  },
  data() {
    return {
      loading: true,
      checkDept: [],
      dept: [],
      datas: [], // 符合就诊的数据
      filDatas: [], // 显示的数据
      dialogVisible: false,
      currentRecord: null
    };
  },
  watch: {
    tlCruSDate: function() {
      this.setDept(this.datas);
    },
    checkDept: function () {
      this.filter();
    },
  },

  mounted() {},

  created() {
    bus.$on('consult', cb => cb && cb.call(this));
    getConsult();
  },

  computed: {
    ...inject('layout', 'timeline', 'consult'),
    curdates() {
      return this.curdays.map(d => d.date);
    }
  },

  methods: {
    setDept(dataArr) {
      let dpArr = [];
      let checkArr = [];
      dataArr.forEach(m => {
        // m.consulDesc = m.ecrUserDesc + ' ' + m.ecrDate + ' ' + m.ecrTime + ' ' + m.ecPurpose;
        if (m[this.leftKey] === '') m[this.leftKey] = $t(this.noClassifyText);
      });
      dataArr.forEach(m => {
        let deptFlag = true;
        for (let i = 0; i < dpArr.length; i++) {
          if (dpArr[i].desc == m[this.leftKey]) deptFlag = false;
        }
        if (deptFlag) {
          dpArr.push({
            desc: m[this.leftKey],
            code: m[this.leftKey]
          });
          checkArr.push(m[this.leftKey]);
        }
      });
      this.dept = dpArr;
      this.checkDept = checkArr;
    },
    filter() {
      let filArr = [];
      for (let i = 0; i < this.checkDept.length; i++) {
        this.datas.forEach(item => {
          if (this.checkDept[i] == item[this.leftKey]) filArr.push(item);
        });
      }
      if (filArr.length) this.filDatas = filArr;
      else this.filDatas = null;
    },
    /* 显示会诊记录 */
    showRecord(item) {
      this.dialogVisible = true;
      this.currentRecord = item;
    }
  }
};
</script>
<style lang="scss" >
.consul-dialog {
  .el-dialog__body {
    padding: 15px 20px;
  }
}
.consul-record-container {
  .consul-record-row {
    text-align: initial;
    .consul-record-header {
      font-size: 16px;
      font-weight: bold;
      padding: 0 15px;
      border: 1px solid #ddd;
      background-color: #eee;
    }
    .consul-record-content {
      border: 1px solid #eee;
      padding: 5px 10px;
    }
  }
}

.consult-page {
  max-height: 600px;
  overflow: auto;
  .consult-page-section {
    margin-bottom: 20px;

    .cpso-row {
      display: flex;
  
      .cpso-col {
        height: 30px;
        line-height: 30px;
        padding: 0 8px;
        text-align: left;
        flex: 1;
        border-left: 1px solid black;
        border-top: 1px solid black;
        box-sizing: border-box;
  
        .cpso-col-l {
          font-weight: bold;
          margin-right: 10px;
          color: #000;
        }
      }
      .cpso-col:last-of-type {
        border-right: 1px solid black;
      }
      .cpso-col.cpso-col-h {
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .cpso-col.cpso-col-xh {
        height: 100px;
        line-height: 20px;
        padding: 5px 20px;
      }
    }
  }
}
</style>
