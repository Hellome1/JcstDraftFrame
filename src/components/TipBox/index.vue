<template>
  <div class="glb-tip-box" ref="root" :style="useStyle" v-show="text">
    <p class="tip-mian">{{text}}</p>
    <ul class="tip-fns">
      <li class="tip-fn-item" v-for="(fn, i) in fns" :key="fn">{{ getFnText(i, fn) }}</li>
    </ul>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
export default {
  name: 'TipBox',
  data() {
    return {
      useStyle: {}
    }
  },
  watch: {
    style(value) {
      this.useStyle = value;
    },
    text() {
      this.$nextTick(() => this.reComp())
    }
  },
  computed: {
    ...inject('tipbox')
  },
  methods: {
    getFnText(index, fn) {
      let tmp = '{order}、{fn}'
      return tmp.replace('{order}', index + 1).replace('{fn}', fn);
    },
    reComp() {
      let style = this.style, offsetHeight = this.offsetHeight;
      let pageHeight = document.documentElement.offsetHeight;
      let { left, top } = style;
      let topNum = parseInt(top);
      let rootDom = this.$refs.root;
      let rootDomHeight = rootDom && rootDom.offsetHeight || 0;
      let rootDomWidth = rootDom && rootDom.offsetWidth || 0;
      
      let tipIgnore = document.querySelector('.tipbox-scroll-ignore');
      let tipScroll = tipIgnore.scrollTop;
      if (topNum + rootDomHeight - tipScroll > pageHeight - 24) {
        top = (topNum - offsetHeight - rootDomHeight) + 'px';
      }
      this.useStyle = { left, top };
      if (rootDomHeight > 70 && rootDomHeight > rootDomWidth / 4) {
        this.useStyle = { top: (parseInt(top) + rootDomHeight - 35) + 'px', right: 0 };
      }
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>