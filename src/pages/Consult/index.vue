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

    <el-dialog :visible.sync="dialogVisible" :title="$t('consult.dialog.title')" width="80%" custom-class="consul-dialog">
      <div class="consul-record-container" v-if="currentRecord">
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[0].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ecCategory + ' ' + currentRecord.ecrLocDesc }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[1].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ecrUserDesc + ' ' + currentRecord.ecrDate + ' ' + currentRecord.ecrTime }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[2].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ecnDate + ' ' + currentRecord.ecnTime }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[3].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ecPurpose || $t('consult.dialog.row[3].noValPlaceholder') }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[4].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ectrePro || $t('consult.dialog.row[4].noValPlaceholder') }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[5].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.consultItems.map(itm => itm.ecOpinion).join('；') || $t('consult.dialog.row[5].noValPlaceholder') }}</div>
        </div>
        <div class="consul-record-row">
          <div class="consul-record-header">{{ $t('consult.dialog.row[6].title') }}</div>
          <div class="consul-record-content">{{ currentRecord.ecnPlace || $t('consult.dialog.row[6].noValPlaceholder') }}</div>
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
        m.consulDesc = m.ecrUserDesc + ' ' + m.ecrDate + ' ' + m.ecrTime + ' ' + m.ecPurpose;
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
</style>
