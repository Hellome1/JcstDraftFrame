<template>
  <div class="module-content" v-loading="loading">
    <el-row>
      <el-col :span="leftW" :style="{ backgroundColor: leftBgColor }" class="layout-left">
      </el-col>
      <el-col :span="rightW" class="layout-right">
        <el-row class="module-content-list">
          <el-col v-for="(day, i) in showDays" :key="i" :sm="3" :xs="3">
            <Wrapper :length="filteredData.filter(item => curdates[i] === item[date]).length">
              <div v-for="(item, d) in filteredData" :key="d + (item.abno ? 'abno' : '')">
                <Label 
                  v-if="curdates[i] === item[date]" 
                  :param="item" 
                  :labelClick="labelClick" 
                  :basic="{ name, date, time }" 
                  :labelConfig="item.labelConfig" 
                  @click.native="handleClick(item)"
                />
              </div>
            </Wrapper>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Label from '@/components/Label/labelData.vue';
import { getLisnorm } from '@/server/api';

export default {
  name: 'lisnorm',
  components: {
    Label
  },
  props: {},
  data() {
    return {
      loading: true,
      resdata: [],
      checkDept: []
    };
  },
  created() {
    bus.$on('lisnorm', cb => cb && cb.call(this) );
    getLisnorm();
  },
  computed: {
    ...inject('layout', 'timeline', 'lisnorm'),
    curdates() {
      return this.curdays.map(d => d.date);
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
          if (dataArr[i][dateKey] == dataArr[j][dateKey] && !dataArr[i].abno && dataArr[j].abno) {
            let a = dataArr[i];
            dataArr[i] = dataArr[j];
            dataArr[j] = a;
          }
        }
      }

      if (dataArr.length) {
        
      }
      // 日期不存在则设置为数组最早日期
      for (let i = 0; i < dataArr.length; i++) {
        let dataItm = dataArr[i];
        if (!dataItm[dateKey]) {
          dataItm[dateKey] = dataArr[0][dateKey];
        }
        let labelConfig = this.cp(this.labelConfig);
        if (dataItm.abno) {
          labelConfig.pStyle = { textAlign: 'center', backgroundColor: 'red', border: '1px solid red' };
        }
        dataItm.labelConfig = labelConfig;
      }

      return dataArr;

      function getTime(timeObj) {
        if (!timeObj[dateKey]) return 999999999999;
        let examDate = timeObj[dateKey],
          examTime = timeObj[timeKey],
          time = examDate + ' ' + examTime;
        return dayjs(time).unix();
      }
    }
  },
  methods: {
    handleClick(row) {
      jcst.setting.lis.showBack = false;
      jcst.setting.lis.clickedLisnormRow = row;
    }
  }
};
</script>

<style lang="scss" scoped></style>
