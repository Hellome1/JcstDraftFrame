<template>
  <div class="module-content vitalSigns" style="position: relative;" v-loading="isLoading">
    <div>
      <el-row>
        <el-col class="layout-left vital-left" :span="leftW" shape="leftW-leftBgColor" :style="{ backgroundColor: leftBgColor }">
          <div class="vital-check">
            <el-checkbox-group v-model="checkList" size="mini">
              <p v-for="(el, i) in vitalsignsItems" :key="i" class="vital-check-item">
                <el-checkbox-button :label="el.name" :style="{ color: el.color }">{{ $t(el.desc[0]) }}</el-checkbox-button>
              </p>
            </el-checkbox-group>
          </div>
          <div class="vital-coords">
            <ul v-for="(item, i) in vitalsignsItems" :key="i" :style="{ color: item.color }">
              <li v-for="(el, j) in item.scale" :key="j" :style="{ height: rowHeight + 'px', lineHeight: rowHeight + 'px' }">{{ el }}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="rightW" shape="rightW" class="layout-right vital-chart-outer">
          <!-- <div v-if="nullData" class="nullDataFloat">
            <el-empty :description="$t('vitalSigns.noDataDesc')"></el-empty>
          </div> -->
          <canvas 
            :height="canvas_h"
            :width="canvas_w" 
            shape="rowHeight" 
            class="vital-chart" 
            @mousemove="handleMousemove"
            @mouseenter="isPanelShow = true"
            @mouseleave="isPanelShow = false"
          ></canvas>
        </el-col>
      </el-row>
      <div class="panelArea">
        <Panel 
          v-if="isPanelShow"
          :smtz_data="smtz_data" 
          :checkList="checkList" 
          :mouseIndex="mouseIndex" 
          :panelPosition="panelPosition" 
        />
      </div>
    </div>

  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import { getVitals } from '@/server/api.js';
import { Draw } from './draw';
import Panel from './panel.vue';

export default {
  name: 'vitalsigns',
  components: {
    Panel
  },
  data() {
    return {
      canvas_h: 300,
      canvas_w: 800,
      max_scale: 0,
      space: 0,
      isLoading: false,
      nullData: true,
      itemsObj: {},
      checkList: [],
      smtz_data: {},
      panelPosition: { left: 0, top: 0 },
      isPanelShow: false,
      mouseIndex: -1
    };
  },
  watch: {
    curdays() {
      this.reDraw();
    },
    checkList() {
      let { smtz_data } = this;
      for (var name in smtz_data) {
        smtz_data[name].display = this.checkList.includes(name);
      }
      this.reDraw();
    },
    showLiveSetting() {
      this.setCanvasW();
      this.$nextTick(() => {
        this.reDraw();
      })
    },
    timelineRightWidth() {
      this.setCanvasW();
      this.$nextTick(() => {
        this.reDraw();
      })
    },
    rowHeight() {
      this.$nextTick(() => {
        this.setCanvasH();
        this.$nextTick(() => {
          this.reDraw();
        })
      })
    }
  },
  computed: {
    ...inject('layout', 'vitalsigns', 'timeline', 'layoutRight', 'pageSize')
  },
  created() {
    this.busOn();
    getVitals({ from: 'vitalsigns' });
  },
  updated() {
    this.setCanvasW();
    this.reDraw();
  },
  mounted() {
    this.initChart();
  },
  methods: {
    busOn() {
      bus.$on('vitalsigns', cb => {
        cb && cb.call(this);
      });
    },
    handleMousemove(e) {
      let panelOffset = 10;
      let index, pointerX = e.offsetX, canvasW = e.target.offsetWidth, singleW = canvasW / jcst_timeline.showDays;
      index = Math.floor(pointerX / singleW);
      this.mouseIndex = index;
      this.panelPosition = { left: e.pageX + panelOffset + 'px', top: e.pageY + panelOffset + 'px' }
    },
    setCanvasH() {
      let coordinates = document.querySelector('.vital-coords');
      let height = parseFloat(getComputedStyle(coordinates).getPropertyValue('height'));
      this.canvas_h = height;
    },
    setCanvasW() {
      let coordinates = document.querySelector('.vital-chart-outer');
      let width = parseFloat(getComputedStyle(coordinates).getPropertyValue('width'));
      this.canvas_w = width;
    },
    //描点
    plotPoint() {
      let startDate = this.curdays[0] && this.curdays[0].date || '';
      let { rowHeight } = this;
      let getXY = (element, module) => {
        let { value, date, time } = element;
        let dateTime = date + ' ' + time;
        let diff_date = dayjs(dateTime).unix() - dayjs(startDate).unix();
        let diff_value = 0;
        let x = (diff_date / (60 * 60) / this.interval) * this.space;
        if (value < module.endValue) {
          diff_value = (value - module.startValue) / module.interval;
        }
        let y = this.canvas_h - diff_value * rowHeight - rowHeight / 2;
        return { x, y };
      };
      for (let key in this.smtz_data) {
        let { data = [], module = {}, display } = this.smtz_data[key];
        if (display) {
          for (let i = 0, len = data.length; i < len; i++) {
            let ele = data[i];
            let { x = 0, y = 0 } = getXY(ele, module);
            Draw.drawPoint(x, y, { fillColor: module.color });
            Draw.drawText(x - 5, y - 4, ele.value, { fillColor: module.color });
            if (i !== len - 1) {
              let { x: x_next, y: y_next } = getXY(data[i + 1], module);
              Draw.drawLine(x, y, x_next, y_next, { strokeColor: module.color });
            }
          }
        }
      }
    },
    drawGrid() {
      let { rowHeight, rowLine, columnLine } = this;
      let showDays = this.showDays;
      // 横轴
      for (let i = 0; i < this.max_scale; i++) {
        let y = i * rowHeight + rowHeight / 2;
        Draw.drawLine(0, y, this.canvas_w, y, { isDashed: rowLine == 'dashed' ? true : false });
      }
      // 纵轴
      let space = (this.canvas_w / showDays / (24 / this.interval)).toFixed(2); //时间间隔宽度
      // console.log('space:', space);
      this.space = space;
      for (let j = 1; j <= Math.ceil(this.canvas_w / space); j++) {
        let x = j * space;
        Draw.drawLine(x, 0, x, this.canvas_h, { isDashed: columnLine == 'dashed' ? true : false });
      }
    },
    reDraw() {
      Draw.ctx.clearRect(0, 0, this.canvas_w, this.canvas_h);
      this.drawGrid();
      this.plotPoint();
    },
    initChart() {
      this.setCanvasW();
      this.setCanvasH();
      Draw.initCtx('.vital-chart');
      this.$nextTick(() => {
        this.drawGrid();
      });
    }
  }
};
</script>

<style lang="scss">
@import './vitalsign.scss';
</style>
