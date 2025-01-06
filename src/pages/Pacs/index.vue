<template>
  <div class="module-content" v-loading="loading">
    <el-row>
      <el-col class="layout-left pacs-left" :span="leftW" :style="{ backgroundColor: leftBgColor }">
        <div class="dept-check pacs-check">
          <el-checkbox-group v-model="checkDept" size="mini">
            <span v-for="(el, i) in dept" :key="i" class="dept-check-item pacs-check-item">
              <el-checkbox-button :label="el.code">{{ el.desc }}</el-checkbox-button>
            </span>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col class="layout-right" :span="rightW">
        <el-row class="module-content-list">
          <el-col v-for="(day, i) in showDays" :key="i" :sm="3" :xs="3">
            <div v-for="(item, d) in filteredData" :key="d">
              <template v-if="curdates[i] === item[date]">
                <Label v-if="item" :param="item" :labelClick="labelClick" :basic="{ name, date, time }" :labelConfig="labelConfig" />
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Label from '@/components/Label/labelData.vue';
import { getPacs } from '@/server/api';

export default {
  name: 'pacs',
  components: {
    Label
  },
  data() {
    return {
      loading: true,
      resdata: [],
      checkDept: []
    };
  },
  created() {
    bus.$on('pacs', cb => {
      cb && cb.call(this);
    });
    getPacs();
  },
  computed: {
    ...inject('layout', 'timeline', 'pacs'),
    curdates() {
      return this.curdays.map(d => d.date);
    },
    dept() {
      var codeKey = this.leftKey, descKey = this.leftKey;
      var noClassifyText = this.noClassifyText;

      // arr用来存放有多少科室
      var arr = [];
      this.resdata.forEach((item) => {
        var code = item[codeKey];
        var desc = item[descKey] || this.$t(noClassifyText);
        var obj = {
          code: code,
          desc: desc
        };
        // 若科室名不重复则push到arr，初始push到checkDept全选
        var pushFlag = true;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].desc == desc) pushFlag = false;
        }
        if (pushFlag) {
          arr.push(obj);
        }
      });
      this.checkDept = arr.map(itm => itm.code);
      return arr;
    },
    filteredData() {
      var dateKey = this.date, timeKey = this.time;

      let dataArr = this.resdata;
      for (let i = 0; i < dataArr.length - 1; i++) {
        for (let j = i + 1; j < dataArr.length; j++) {
          if (getTime(dataArr[i]) > getTime(dataArr[j])) {
            let a = dataArr[i];
            dataArr[i] = dataArr[j];
            dataArr[j] = a;
          }
        }
      }

      if (dataArr.length) {
        moduleTimeInfo['pacs'] = {
          0: [dataArr[0][dateKey]]
        };
      }
      // 日期不存在则设置为数组最早日期
      for (let i = 0; i < dataArr.length; i++) {
        let dataItm = dataArr[i];
        if (!dataItm[dateKey]) {
          dataItm[dateKey] = dataArr[0][dateKey];
        }
      }

      return dataArr.filter(itm => this.checkDept.includes(itm[this.leftKey]));

      function getTime(timeObj) {
        if (!timeObj[dateKey]) return 999999999999;
        let examDate = timeObj[dateKey],
          examTime = timeObj[timeKey],
          time = examDate + ' ' + examTime;
        return dayjs(time).unix();
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
