<template>
  <div class="usePop">
    <div class="button" @click="popUpWindow">popUp</div>
  </div>
</template>

<script>
import popUpWindow from './popUpWindow.vue';
import Vue from 'vue';
export default {
  components: {},
  data() {
    return {
      title: 'helloT',
      vm: null,
      vmshow: true
    };
  },
  methods: {
    popUpWindow() {
      if (this.vm) {
        this.vmshow = true;
      } else {
        let _this = this;
        this.vm = new Vue({
          render: h =>
            h(popUpWindow, {
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
.usePop {
  .button {
    width: 200px;
    height: 50px;
    border: 1px solid black;
    border-radius: 5px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
