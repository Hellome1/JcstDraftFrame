<template>
  <div v-show="panelData.clocks.length" class="vts-panel" ref="vtsPanel" :style="isTouchWindowRight ? {left: parseInt(panelPosition.left) - (width + 20) + 'px', top: panelPosition.top} : panelPosition">
    <p class="vts-panel-title">{{panelData.date}}</p>
    <div class="vts-panel-header">
      <span class="panel-header-desc panel-header-item">时间</span>
      <span class="panel-header-item" v-for="clock in panelData.clocks" :key="clock">{{clock}}</span>
    </div>
    <div class="vts-panel-body">
      <div v-for="(itm, k) in panelData.datas" :key="k" :class="['panel-bar', k]">
        <div class="panel-desc panel-row-item">{{itm.desc[0]}}</div>
        <div class="panel-value panel-row-item" v-for="(valo, ind) in itm.data" :key="valo.value + valo.time + ind">{{valo.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vtsPanel',
  props: {
    smtz_data: {
      type: Object,
      require: true
    },
    checkList: {
      type: Array,
      require: true
    },
    mouseIndex: {
      type: Number,
      require: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    panelPosition: {
      type: Object,
      default: function() {
        return {
          left: 0,
          top: 0
        }
      }
    }
  },
  data() {
    return {
      isTouchWindowRight: false
    }
  },
  computed: {
    width() {
      let offset = 40 + 50;
      return this.panelData.clocks.length * 40 + offset;
    },
    currentDate() {
      return jcst_timeline.curdays.map(itm => itm.date)[this.mouseIndex] || '';
    },
    panelData() {
      let o = {
        datas: [],
        clocks: []
      }, clocks = [];
      for (let k in this.smtz_data) {
        if (!this.checkList.includes(k)) continue;
        let itm = this.smtz_data[k];
        let data = itm['data'] && itm['data'].filter(dataitm => dataitm.date === this.currentDate) || [];
        data.forEach(dataitm => {
          let clock = dataitm.time.split(':')[0];
          dataitm.clock = clock;
          if (!clocks.includes(clock)) clocks.push(clock);
        })
        let desc = itm['module'] && itm['module']['desc'] || ['unknown'];
        desc = desc.map(d => this.$t(d));
        o.datas.push({ data, desc });
      }
      clocks = clocks.sort((a,b) => a - b);
      for (let k in o['datas']) {
        let obj = o['datas'][k], data = obj['data'], ndata;
        ndata = clocks.map(clock => {
          let index = data.map(dataitm => dataitm.clock).indexOf(clock);
          if (index > -1) {
            return data[index]
          } else {
            return { time: '-', value: '-' }
          }
        })
        obj['data'] = ndata;
      }
      o['clocks'] = clocks;
      o['date'] = o.datas[0] && o.datas[0].data[0] && o.datas[0].data[0].date || '';
      return o;
    }
  },
  watch: {
    panelPosition(n) {
      let windowVisibleWith = document.documentElement.clientWidth;
      let left = parseInt(n.left);
      // console.log('posi:', this.width, left, windowVisibleWith);
      this.isTouchWindowRight = this.width + left > windowVisibleWith;
    }
  },
  created() {
    // console.log('panelData from Panel:', this.panelData);
  },
  mounted() {
    if (this.appendToBody) this.componentAppendToBody();
  },
  methods: {
    componentAppendToBody() {
      // console.log(this.$refs.vtsPanel);
      let target = this.$refs.vtsPanel, pNode = target.parentNode;
      pNode && pNode.removeChild(target);
      document.body.appendChild(target);
    }
  }
}
</script>

<style lang="scss" scoped>
.vts-panel {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  position: absolute;
  // width: 300px;
  .vts-panel-title {
    text-align: center;
    font-size: 18px;
  }
  .vts-panel-header {
    
    .panel-header-item {
      margin-right: 10px;
      display: inline-block;
      width: 30px;
      text-align: center;
      // border-left: 1px solid #eee;
    }
    .panel-header-desc {
      display: inline-block;
      width: 40px;
    }
  }
  .vts-panel-body {
    border-top: 1px solid #eee;
    .panel-bar {
      .panel-row-item {
        display: inline-block;
        margin-right: 10px;
        text-align: center;
        // border-left: 1px solid #eee;
      }
      .panel-desc {
        width: 40px;
      }
      .panel-value {
        width: 30px;
      }
    }
  }
}
</style>