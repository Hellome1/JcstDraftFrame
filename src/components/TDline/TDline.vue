<template>
  <div ref="TDline_C" class="TDline_C" :class="DT.config.fontLight ? 'light' : ''" :style="initStyleObj.leftVal">
    <TipBox :tipmsg="DT.name + DT.title + time">
      <p ref="pMsg_TDline" class="msg_outer" :style="msg_outer_style" :class="pRight ? 'pRight' : ''">
        <span class="content">{{ DT.name }}</span>
        <span class="title" v-if="isTitle" :style="titleStyle">{{ DT.title }}</span>
        <span class="time">{{ time }}</span>
      </p>
    </TipBox>
    <div class="iconOuter" :style="initStyleObj.width">
      <i :class="initStyleObj.left >= 0 ? 'startPoint' : 'startPoint zero'" ></i>
      <div class="center"></div>
      <i class="endPoint"></i>
    </div>

    <!-- 模态框 -->
    <el-dialog
      title="闭环"
      :visible.sync="dialogVisible"
      width="800px"
      class="loop-modal"
      >
      <div v-if="loopLoading">加载中...</div>
      <div v-else ref="content">暂无数据</div>
    </el-dialog>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

export default {
  components: {},
  props: {
    DT: {
      type: Object,
      default: function() {
        return {
          title: 'MSG title',
          name: 'hello',
          startDate: '2021-1-22',
          startTime: '08:12:07',
          stopDate: '2021-1-23',
          stopTime: '12:22:07',
          isHighlight: false,
          config: {
            fontLight: false,
            isDetail: false,
            titleCfg: {
              isTitle: true,
              titleStyle: {
                color: '#84aaca'
              }
            }
          },
          loop: null,
          rowData: null // TDlineData传过来
        };
      }
    }
  },
  data() {
    return {
      isTitle: this.DT.config.titleCfg.isTitle,
      titleStyle: this.DT.config.titleCfg.titleStyle,
      start: this.DT.startDate + ' ' + this.DT.startTime,
      end: this.DT.stopDate + ' ' + this.DT.stopTime,
      pRight: false,
      showDetail: false,
      dialogVisible: false,
      loopLoading: false,
      detailDom: null
    };
  },
  watch: {
    pRight: function() {
      this.$nextTick(() => {
        this.$refs.TDline_C.style.paddingTop = this.$refs.pMsg_TDline.offsetHeight + 'px';
      });
    }
  },

  mounted() {},

  created() {},

  computed: {
    ...inject('pageSize', 'layout', 'timeline'),
    curdates() {
      return this.curdays.map(d => d.date);
    },
    time: function() {
      return '(' + this.start + '至' + this.end + ')';
    },
    initStyleObj: function() {
      let order = this.getOrder(this.DT.startDate);
      let timeDuration = this.getTimeDuration();
      let width = (timeDuration / (this.showDays * 24 * 60 * 60)) * this.timelineRightWidth;
      let left = this.getLeftVal(order);
      let height = null;
      width = left < 0 ? width + left : width;
      // console.log('initStyleObj', order, left);
      this.$nextTick(() => {
        if (this.$refs.pMsg_TDline.offsetHeight > 30) {
          this.pRight = true;
        }
      });
      return {
        left,
        leftVal: {
          paddingLeft: Math.round(left) + 'px',
          height
        },
        width: {
          width: Math.round(width) + 'px'
        }
      };
    },
    msg_outer_style() {
      return this.DT.isHighlight ? { backgroundColor: search_highlight_color } : {}
    },
    isDetail: function() {
      return this.DT.config.isDetail;
    },
    DTStyle: function() {
      return { left: this.initStyleObj.left < 0 ? 0 : Math.round(this.initStyleObj.left) + 'px' }
    }
  },

  methods: {
    getOrder: function(date) {
      let order = dayjs(date).diff(this.curdates[0], 'day');
      return order + 1;
    },
    getTimeDuration: function() {
      let dateTimee = this.DT.stopDate + ' ' + this.DT.stopTime;
      let dateTimes = this.DT.startDate + ' ' + this.DT.startTime;
      let d_diff = dayjs(dateTimee).unix() - dayjs(dateTimes).unix();
      return d_diff;
    },
    getLeftVal: function(order) {
      // let w = this.$store.state.timeSection.lengthOfTimesection;
      let w = this.timelineRightWidth / this.showDays;
      let dateTimes = this.DT.startDate + ' ' + this.DT.startTime;
      let dateTimeSt = this.DT.startDate + ' ' + '00:00:00';
      let transSec = dayjs(dateTimes).unix() - dayjs(dateTimeSt).unix();
      let preLeft = (transSec / (24 * 60 * 60)) * w;
      let left = preLeft + (order - 1) * w;
      // console.log(left);
      return left;
    }
  }
};
</script>

<style lang="scss" scoped>
.TDline_C {
  position: relative;
  padding-bottom: 8px;
  text-align: left;
  p {
    font-size: 16px;
    text-align: left;
    padding-left: 5px;
    .content,
    .time {
      font-size: 14px;
    }
  }
  .msg_outer {
    display: inline;
  }
  .msg_outer.pRight {
    position: absolute;
    top: 0;
    right: 0;
  }
  .detail_show {
    position: absolute;
    top: 30px;
    left: 0;
    // height: 28px;
    line-height: 26px;
    z-index: 30;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    font-weight: normal;
    .borderOut {
      display: inline-block;
      border: 1px solid black;
      padding: 0 5px;
      border-radius: 3px;
      // height: 26px;
      background-color: white;
      .content {
        font-size: 16px;
      }
      .title {
        font-size: 18px;
      }
    }
    .time {
      opacity: 0;
    }
  }
  .detail_show.right {
    left: auto;
    right: 0;
  }
  .iconOuter {
    height: 5px;
    bottom: 2px;
    background-color: #c9e3fa;
    position: relative;
    .startPoint,
    .endPoint {
      display: block;
      position: absolute;
      width: 4px;
      height: 9px;
      background-color: #669abf;
      top: -2px;
    }
    .startPoint {
      left: 0;
    }
    .startPoint.zero {
      width: 0;
    }
    .endPoint {
      right: 0;
    }
  }
}
.TDline_C.light {
  font-weight: lighter;
}
</style>
