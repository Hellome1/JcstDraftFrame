<template>
  <div>
    <div class="labelClass" @contextmenu.prevent.stop="contextmenu">
      <div class="iconArrowOuter" v-if="isArrow">
        <i ref="iLabel" :style="{ left: arrowStyle.left }" :title="timeTitle" class="arrowUpCustom">
          <i :style="{ borderBottomColor: arrowStyle.color }" class="up"></i>
          <i :style="{ backgroundColor: arrowStyle.color }" class="down"></i>
        </i>
      </div>
      <TipBox :tipmsg="MSG['name']">
        <p ref="pLabel" :style="MSG['pStyle']" :title="isDetail ? '' : MSG.title">
          <i v-if="isIcon" :class="MSG['iconClass']"></i>
          {{ MSG.name }}
        </p>
      </TipBox>

    </div>

    <!-- 模态框 -->
    <el-dialog
      :title="$t('label.loopDialog.title')"
      :visible.sync="dialogVisible"
      width="800px"
      class="loop-modal"
      @click.native.stop=""
      >
      <div v-if="loopLoading">{{$t('label.loopDialog.loadingText')}}</div>
      <div v-else ref="content">{{$t('label.loopDialog.noDataDesc')}}</div>
    </el-dialog>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import {getLoop} from '@/server/api.js';
import { AllLoop } from '@/components/allLoopStaticTest/loop.js';
export default {
  name: 'lable',
  props: {
    MSG: {
      type: Object,
      default: function() {
        return {
          title: 'title msg',
          name: 'information',
          date: '2021-1-20',
          time: '08:06:25',
          isHighlight: false,
          detailTop: false,
          detailInRight: false,
          isArrow: true,
          isIcon: true,
          iconClass: 'fa fa-file-text',
          isDetail: true,
          pStyle: {
            color: 'white',
            backgroundColor: '#59b272',
            border: '1px solid #59b272',
            borderTopLeftRadius: '',
            textAlign: 'left',
            cursor: 'initial',
          },
          arrowStyle: {
            color: '#59b272',
            left: 0,
          },
          loop: null,
          rowData: null
        };
      }
    },
    param: null
  },
  data() {
    return {
      detailShow: false,
      vm: null,
      vmshow: true,
      dialogVisible: false,
      loopLoading: false,
      actionsTip: [],
      detailDom: null
    };
  },
  created() {},
  computed: {
    ...inject('pageSize', 'timeline'),
    timeTitle: function() {
      return this.MSG.date + ' ' + this.MSG.time;
    },
    isArrow: function() {
      return this.MSG['isArrow'] && this.MSG.time;
    },
    isIcon: function() {
      return this.MSG['isIcon'];
    },
    isDetail: function() {
      return this.MSG['isDetail'];
    },
    arrowStyle: function() {
      return this.MSG['pStyle']['border']
        ? {
            color: this.MSG['pStyle']['border'].split(' ')[2],
            left: this.MSG['arrowStyle']['left']
          }
        : this.MSG['pStyle']['backgroundColor']
        ? {
            color: this.MSG['pStyle']['backgroundColor'],
            left: this.MSG['arrowStyle']['left']
          }
        : this.MSG['arrowStyle'];
    }
  },
  watch: {
    showDays() {
      this.updateArrowPosition();
    },
    timelineRightWidth() {
      this.updateArrowPosition();
    }
  },
  mounted() {
    if (this.param) this.setParam(this.param);

    if (this.param.isHighlight) this.MSG['pStyle']['backgroundColor'] = '#ff8d00';
  
    if (this.isArrow) this.updateArrowPosition();
  },
  methods: {
    setParam(param) {
      for (let keyOuter in param) {
        let itemOuter = param[keyOuter];
        if (keyOuter == 'pStyle') {
          this.MSG['pStyle'] = Object.assign({}, this.MSG['pStyle'], itemOuter);
        } else {
          if (keyOuter in this.MSG) {
            this.MSG[keyOuter] = param[keyOuter];
          }
        }
      }
    },
    updateArrowPosition() {
      // 初始化箭头位置以匹配时间
      if (!this.$refs.iLabel) return;
      let borderRadius = this.MSG['pStyle']['borderRadius'];
      let secW = this.timelineRightWidth / this.showDays;
      let iW = this.$refs.iLabel.clientWidth;

      let dateTimes = this.MSG.date + ' ' + this.MSG.time;
      let dateTimeSt = this.MSG.date + ' ' + '00:00:00';
      let tm = dayjs(dateTimes).unix() - dayjs(dateTimeSt).unix();
      if (!tm) return;
      if (tm > 24 * 60 * 60) {
        this.MSG.time = '24:00:00';
        tm = 24 * 60 * 60;
      } else if (tm < 0) {
        this.MSG.time = '00:00:00';
        tm = 0;
      }
      let centerValue = parseInt((secW / (24 * 60 * 60)) * tm);

      let leftValue = centerValue - 12 / 2;
      borderRadius = borderRadius || window.getComputedStyle(this.$refs.pLabel, null).borderRadius;
      if (leftValue <= parseInt(borderRadius)) this.MSG['pStyle']['borderTopLeftRadius'] = 0;
      if (leftValue >= secW - parseInt(borderRadius) - iW) this.MSG['pStyle']['borderTopRightRadius'] = 0;
      this.MSG['arrowStyle']['left'] = leftValue + 'px';
    },
    contextmenu() {
      if (this.MSG.loop) {
        this.dialogVisible = true;
        const { url, param, cb } = this.MSG.loop.getParam.call(this, this.MSG.rowData, AllLoop);
        this.loopLoading = true;
        getLoop(url, param).then(cb);
      }
    }
  }
};
</script>
<style lang="scss">
.labelClass {
  font-size: 0;
  padding-top: 4px;
  text-align: left;
  position: relative;
  // overflow: hidden;
  cursor: default;
  .iconArrowOuter {
    position: relative;
    width: 100%;
    height: 12px;
    overflow: hidden;
    .iconfont {
      font-size: 12px;
      position: absolute;
      line-height: 100%;
      top: 1px;
    }
    .fa {
      font-size: 12px;
      position: absolute;
      line-height: 100%;
      top: 1px;
    }
    .arrowUpCustom {
      display: block;
      position: absolute;
      z-index: 20;
      left: 20px;
      width: 12px;
      height: 12px;
      .up {
        content: '';
        display: block;
        position: absolute;
        bottom: 3px;
        box-sizing: border-box;
        border: 8px solid green;
        border-left-width: 6px;
        border-right-width: 6px;
        border-left-color: rgba(0, 0, 0, 0);
        border-top-color: rgba(0, 0, 0, 0);
        border-right-color: rgba(0, 0, 0, 0);
        padding: 0;
        z-index: 30;
      }
      .down {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 3px;
        width: 6px;
        height: 4px;
        background: green;
      }
    }
  }
  p {
    position: relative;
    z-index: 1;
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    padding: 1px 3px;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: default;
    .iconfont {
      font-size: 14px;
    }
  }
  .detail_in_label {
    position: absolute;
    font-size: 16px;
    // top: 44px;
    left: 0px;
    padding: 2px 8px;
    color: black;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 3px;
    z-index: 33;
    white-space: nowrap;
  }
  .detail_in_label.top {
    top: -30px;
  }
  .detail_in_label.right {
    left: unset;
    right: 0;
  }
}
</style>
