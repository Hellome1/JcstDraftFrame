<template>
  <div class="pop_mask">
    <div class="popUpWindow">
      <i class="fa fa-close" @click="handleClose"></i>
      <h3 class="pop_title">{{ dt.title }}</h3>
      <div class="pop_subTitles">
        <div class="subTitleCon" ref="subCol" v-for="(sub, i) in dt.subTitles" :key="'sub_' + i">
          <span class="subTitle">{{ sub.title }}</span
          >:
          <span class="subVal">{{ sub.val }}</span>
        </div>
      </div>
      <div class="pop_divideLine"></div>
      <div class="pop_main">
        <div class="main_sec" v-for="(m, i) in dt.main" :key="'main_' + i">
          <span class="main_title">{{ m.title }}</span
          >:
          <p class="main_val">&nbsp;&nbsp;&nbsp;&nbsp;{{ m.val }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dt: {
      type: Object,
      default: function() {
        return {
          title: 'pop-title-two',
          subCol: 2,
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
    dtr: {
      type: Object
    },
    setting: {
      type: Object
    }
  },

  data() {
    return {};
  },

  mounted() {
    this.$refs.subCol.forEach(item => {
      item.style.width = parseFloat(100 / this.dt.subCol) + '%';
    });
  },

  created() {},

  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.pop_mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .popUpWindow {
    background-color: white;
    width: 50%;
    position: relative;
    border-radius: 5px;
    box-sizing: border-box;
    padding-bottom: 10px;
    i.fa-close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
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
      margin: 10px 20px;
      .main_sec {
        margin: 8px 0;
        .main_title {
          font-size: 16px;
          font-weight: bold;
        }
        .main_val {
          padding: 2px 5px;
        }
      }
    }
  }
}
</style>
