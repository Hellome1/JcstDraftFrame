<template>
  <span ref="root" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'UseTipBox',
  props: {
    tipmsg: '',
    fns: [],
    isFixed: false
  },
  methods: {
    handleMouseEnter() {
      const root = this.$refs.root;
      const tar = this.$slots.default[0] && this.$slots.default[0].elm;
      const pos = this.getDomAbsPosition(tar || root);
      console.log('position', pos);
      let { left, top } = pos;
      let style = {};
      if (this.isFixed) {
        style.position = 'fixed';
        let scrollTop = document.documentElement.scrollTop;
        console.log('scrllTop', scrollTop);
        top += scrollTop;
      }
      style = { left: left + 'px', top: top + 'px' };
      jcst.tipbox.style = style;
      jcst.tipbox.text = this.tipmsg;
      jcst.tipbox.fns = this.fns;
    },
    handleMouseLeave() {
      jcst.tipbox.text = '';
    }
  }
}
</script>

<style>

</style>