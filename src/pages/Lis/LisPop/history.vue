<template>
  <div class="lisnorm-history">
    <div class="lh-header">
      <h3>{{ $t('lis.modal.lisnormHistory') }}</h3>
      <span class="lh-back" v-show="showBack" @click="handleBack"><i class="el-icon-back"></i>返回</span>
      <el-select
        v-model="ordItemCodeList" 
        multiple 
        size="mini"
        collapse-tags
      >
        <el-option
          v-for="(opt, i) in selectOptions"
          :key="i"
          :label="opt.label"
          :value="opt.value"
        ></el-option>
      </el-select>
    </div>
    <div v-loading="loading">
      <div class="lh-main" ref="main">
        <canvas id="main" :width="width - 80" :height="height"></canvas>
      </div>
      <el-table :data="data" border size="mini" max-height="150" style="width: 100%">
        <el-table-column prop="inspItemDesc" label="项目名称" :width="width / 5"> </el-table-column>
        <el-table-column prop="inspRptVerifyDate" label="日期" :width="width / 5"> </el-table-column>
        <el-table-column prop="inspectionValue" label="值" :width="width / 5"> </el-table-column>
        <el-table-column prop="inspResultUnitCode" label="单位" :width="width / 5"> </el-table-column>
        <el-table-column prop="inspAbnoFlag" label="异常标志"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { inject } from '@/common/vuePrototypeMethods.js';
import { ajax } from '@/server/api.js';

export default {
  name: 'lisnormHistory',
  data() {
    return {
      loading: false,
      height: 500,
      width: 800,
      data: [],
      ordItemCodeList: []
    };
  },
  watch: {
    clickedRow(value) {
      console.log('clickedRow', this.cp(value));
      if (value) {
        this.ordItemCodeList = [value.inspItemCode];
      }
    },
    ordItemCodeList(value) {
      if (value.length) {
        this.getLisnorm();
      }
    }
  },
  computed: {
    ...inject('lisnormHistory'),
    selectOptions() {
      return this.selectOptionsSource.map(itm => ({ label: itm.inspItemDesc, value: itm.inspItemCode }));
    }
  },
  methods: {
    getLisnorm() {
      this.loading = true;
      let ordItemCodeList = this.ordItemCodeList;
      ajax({ 
        action: 'MES0023', 
        query: { from: 'lisnormHistory', hdcEncId: '', hosEncId: '', inspOrdInfo: { ordItemCodeList } } }
      ).then(res => {
        this.loading = false;
        res = lisnorm_history_data(res);
        let { data = [] } = res;
        console.log('lisnormHistory data', this.cp(data));
        this.data = data;
        this.setWidth();
        this.$nextTick(() => {
          this.initChart();
        });
      });
    },
    setWidth() {
      let dom = this.$refs.main;
      this.width = dom.offsetWidth;
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'));
      if (!this.data.length) return;
      let legend_data = [];
      let series = this.ordItemCodeList.map(code => {
        let history = this.data.filter(itm => itm.inspItemCode === code);
        let name = history[0] && history[0].inspItemDesc || '';
        legend_data.push(name);
        return {
          name: name,
          type: 'line',
          symbol: 'circle',
          smooth: true,
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold'
          },
          data: history.map(itm => [itm.inspRptVerifyDate + ' ' + itm.inspRptVerifyTime, itm.inspectionValue])
        }
      });
      let xAxis = {
        type: 'time',
        axisLabel: {
          show: true
        },
        minInterval: 1000,
        scale: true,
        splitLine: {
          show: false
        }
      };
      let option = {
        legend: {
          data: legend_data
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          axisPointer: {
            type: 'line',
            axis: 'x',
            snap: true,
            label: {
              show: true
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                borderColor: 'rgba(255, 123, 0, 1)',
                borderWidth: 1.5
              },
              emphasis: {
                iconStyle: {
                  // textPosition: 'left',
                  textAlign: 'right'
                }
              }
            }
          }
        },
        xAxis: xAxis,
        yAxis: {
          type: 'value',
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'weakFilter'
          },
          {
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'none'
          }
        ],
        series: series
      };
      // 绘制图表
      console.log('series', series);
      myChart.setOption(option, true);
    },
    handleBack() {
      jcst.setting.lisnormHistory.clickedRow = null;
    }
  }
};
</script>

<style lang="scss">
.lisnorm-history {
  .lh-header {
    text-align: center;
    margin-bottom: 15px;
    position: relative;

    .lh-back {
      position: absolute;
      left: 10px;
      top: 10px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>