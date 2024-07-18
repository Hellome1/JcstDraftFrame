<template>
  <div class="pop_mask" @click.self="handleClose">
    <div ref="popUpWindow" class="popUpWindow">
      <div class="topRightArea">
        <i v-if="dt.popTwo" class="fa fa-envelope-o" @click="popUpWindowTwo"></i>
        <i class="fa fa-close" @click="handleClose"></i>
      </div>
      <h3 class="pop_title">{{ dt.title }}</h3>
      <div class="pop_subTitles">
        <div class="subTitleCon" ref="subCol" v-for="(sub, i) in dt.subTitles" :key="'sub_' + i">
          <span class="subTitle">{{ sub.title }}</span
          >:
          <span class="subVal">{{ sub.val }}</span>
        </div>
      </div>
      <div class="pop_divideLine"></div>
      <div v-if="dt.style == 1" class="pop_main">
        <div class="main_sec" v-for="(m, i) in dt.main" :key="'main_' + i">
          <span class="main_title">{{ m.title }}</span
          >:
          <p class="main_val">&nbsp;&nbsp;&nbsp;&nbsp;{{ m.val }}</p>
        </div>
      </div>
      <div v-else-if="dt.style == 2" class="pop_main">
        <el-table v-loading="loading" :data="tableData" :row-style="setRowStyle" :cell-style="setCellStyle" max-height="500" border style="width: 100%;">
          <el-table-column align="center" v-for="(k, i) in row" :key="i" :prop="i" :label="k"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import popUpWindowTwo from './popUpWindowTwo.vue';
import Vue from 'vue';
export default {
  props: {
    dt: {
      type: Object,
      default: function() {
        return {
          title: 'Title',
          subCol: 2,
          width: '50%',
          style: 1,
          popTwo: true,
          subTitles: [
            {
              title: 'doc',
              val: 'fangfangfangfangfangfangfangfangfangfang'
            },
            {
              title: 'sex',
              val: 'nan'
            },
            {
              title: 'saying',
              val: 'hello'
            }
          ],
          main: [
            {
              title: 'words',
              val: "It's not about what you said,it' about what you did.It's not about what you said,it' about what you did."
            },
            {
              title: 'likes',
              val: 'puppy and foods.'
            }
          ]
        };
      }
    },
    setting: {
      type: Object
    }
  },

  data() {
    return {
      vm: null,
      vmshow: true,
      tableData: [],
      row: {},
      loading: true
    };
  },

  mounted() {
    this.$refs.subCol.forEach(item => {
      item.style.width = parseFloat(100 / this.dt.subCol) + '%';
    });
    this.$refs.popUpWindow.style.width = this.dt.width;
  },

  created() {
    this.dt.style = this.dt.style ? this.dt.style : 1;
  },

  watch: {
    lisNorm: function(newVal) {
      // console.log(newVal);
      if (newVal.tableData) this.tableData = newVal.tableData;
      if (newVal.row) {
        this.row = newVal.row;
        this.loading = false;
      }
      // 异常字段位置
      if (newVal.abnIndex) this.abnIndex = newVal.abnIndex;
    },
    title: function(newVal) {
      console.log(newVal);
    }
  },

  computed: {
    lisNorm: function() {
      return this.dt.lisNorm;
    },
    title: function() {
      return this.dt.title;
    },
    gridAbnormal: function() {
      return this.dt.gridAbnormal;
    },
    abNormalBgc: function() {
      return this.gridAbnormal ? this.gridAbnormal.rowBgColor : '#fff1f0';
    }
  },

  methods: {
    log(msg) {
      console.log(msg);
    },
    handleClose() {
      this.$emit('close');
    },
    isAbnormal(r) {
      let flags = this.gridAbnormal.flags;
      for (let i = 0; i < flags.length; i++) {
        if (r == flags[i].value) {
          return i + 1;
        }
      }
      return false;
    },
    setRowStyle(rowO) {
      // console.log(rowO);
      let style = '';
      let bgrd = {
        backgroundColor: this.abNormalBgc
      };
      style = this.isAbnormal(rowO.row[this.gridAbnormal.key]) ? bgrd : '';
      return style;
    },
    setCellStyle(O) {
      if (O.columnIndex == this.abnIndex) {
        if (this.isAbnormal(O.row[this.gridAbnormal.key])) {
          return this.gridAbnormal.flags[this.isAbnormal(O.row[this.gridAbnormal.key]) - 1].cellStyle;
        }
      }
      return '';
    },
    popUpWindowTwo() {
      if (this.vm) {
        this.vmshow = true;
      } else {
        let _this = this;
        this.vm = new Vue({
          render: h =>
            h(popUpWindowTwo, {
              style: {
                display: this.vmshow ? 'flex' : 'none'
              },
              on: {
                close: function() {
                  _this.vmshow = false;
                }
              },
              props: {
                tt: this.title
              }
            })
        }).$mount();
        document.body.appendChild(this.vm.$el);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pop_mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  .popUpWindow {
    background-color: white;
    width: 50%;
    position: relative;
    border-radius: 5px;
    box-sizing: border-box;
    padding-bottom: 10px;
    .topRightArea {
      position: absolute;
      right: 10px;
      top: 10px;
      i {
        margin-left: 8px;
      }
      i.fa {
        cursor: pointer;
      }
    }
    h3.pop_title {
      text-align: center;
    }
    .pop_subTitles {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 20px;
      .subTitleCon {
        box-sizing: border-box;
        width: 50%;
        padding: 8px 5px;
        word-break: break-all;
      }
    }
    .pop_divideLine {
      width: 100%;
      height: 1px;
      background-color: #aaa;
    }
    .pop_main {
      margin: 20px 20px;
      .main_sec {
        margin: 8px 0;
        .main_title {
          font-size: 16px;
          font-weight: bold;
        }
        .main_val {
          padding: 2px 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
