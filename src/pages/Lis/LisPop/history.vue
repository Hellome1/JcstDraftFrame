<template>
  <div class="lisnorm-history">
    <div class="lh-header">
      <h3>历史数据对比</h3>
      <span class="lh-back" @click="handleBack"><i class="el-icon-back"></i>返回</span>
    </div>
    <div class="lh-main" ref="main">
      <canvas id="main" :width="width - 80" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { inject } from '@/common/vuePrototypeMethods.js';
import { getLisnorm } from '@/server/api.js';

export default {
  name: 'lisnormHistory',
  props: {
    width: {
      type: Number
    }
  },
  data() {
    return {
      height: 550,
      data: []
    };
  },
  watch: {
    clickedLisnormRow(value) {
      console.log('clickedRow', this.cp(value));
      if (value) {
        this.getLisnorm();
      }
    }
  },
  computed: {
    ...inject('lis')
  },
  mounted() {
    
  },
  methods: {
    getLisnorm() {
      let hdcInspRptId = this.clickedLisnormRow.hdcInspRptId;
      getLisnorm({ from: 'lisnormHistory', inspOrdInfo: { hdcInspRptId: hdcInspRptId } }).then(res => {
        res = lisnorm_data(res);
        let { data = [] } = res;
        console.log('lisnormHistory data', this.cp(data));
        this.data = data;
        this.$nextTick(() => {
          this.initCharts();
        })
      });
    },
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'));
      let name = this.data[0] && this.data[0].inspItemDesc || '';
      let series = [
        {
          name: name,
          type: 'line',
          symbol: 'circle',
          smooth: true,
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold'
          },
          data: this.data.map(itm => [itm.inspRptVerifyDate ,parseInt(itm.inspectionValue)])
        }
      ];
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
        title: {
          text: ''
        },
        legend: {
          data: [name]
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
      jcst.setting.lis.clickedLisnormRow = null;
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