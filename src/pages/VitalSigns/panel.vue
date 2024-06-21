<template>
  <div v-show="panelData.clocks.length" class="vts-panel" ref="vtsPanel" :style="isTouchWindowRight ? {left: parseInt(posi.left) - (width + 20) + 'px', top: posi.top} : posi">
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
    panelData: {
      type: Object,
      required: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    posi: {
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
    }
  },
  watch: {
    posi(n) {
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