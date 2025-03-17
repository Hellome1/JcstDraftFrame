<template>
  <ul ref="root" class="label-wrapper" :style="style" @mousewheel.prevent="handleMouseWheel">
    <slot></slot>
  </ul>
</template>

<script>
const perHeight = 44;
const offset = 30;
export default {
  name: 'labelWrapper',
  props: {
    length: {
      type: Number
    },
    maxShowRow: {
      type: Number,
      default: 4
    },
    moduleName: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    datas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      transform: 0
    }
  },
  computed: {
    style() {
      return { 
        height: (perHeight * this.length) + 'px', 
        transform: `translateY(${this.transform ? this.transform + 10 : this.transform}px)`,
        maxHeight: `${this.maxShowRow * perHeight + offset}px` 
      };
    }
  },
  created() {
    bus.$on('wrapperSearch', (moduleName, date, text) => {
      if (this.moduleName === moduleName && this.date === date) this.highlight(text);
    })
  },
  methods: {
    handleMouseWheel(e) {
      let { wheelDelta } = e;
      let transform = this.transform;
      if (wheelDelta < 0) {
        transform -= perHeight;
      } else {
        transform += perHeight;
      }
      let minLength = this.length - this.maxShowRow > 0 ? this.length - this.maxShowRow : 0;
      transform = transform > 0 ? 0 : transform < -(perHeight * minLength) ? -(perHeight * minLength) : transform;
      this.transform = transform;
    },
    highlight(text) {
      let pos = this.getDomPosition(this.$refs.root);
      console.log('pos', pos);
      if (pos) {
        let scrollDom = document.querySelector('.tipbox-scroll-ignore');
        scrollDom.scrollTop = pos;
      }
      this.toTransform(text);
    },
    toTransform(text) {
      let index = -1;
      let names = this.datas.map((d, i) => {
        if (index === -1 && d[this.name] === text) index = i;
        return d[this.name];
      });
      if (index === -1) return;
      index++;
      console.log('highlight', text, names, index, this.maxShowRow);
      if (index > this.maxShowRow) this.transform = (this.maxShowRow - index) * perHeight;
      jcst_layout.labelHighlightCondition = [this.moduleName, this.date, index - 1];
    },
    getDomPosition(node) {
      if (!node) return;
      let marginTop = 110 + 20 + 30; // marginTop + padding + moduleHeaderHeight
      let x = node.offsetLeft, y = node.offsetTop;
      while (node.offsetParent) {
        node = node.offsetParent;
        x += node.offsetLeft;
        y += node.offsetTop;
        if (node.className === 'tipbox-scroll-ignore') {
          break;
        }
      }
      return y - marginTop;
    }
  }
}
</script>

<style>

</style>