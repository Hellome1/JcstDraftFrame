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
      let style = { left: left + 'px', top: top + 'px' };
      if (this.isFixed) style.position = 'fixed';
      tipbox.style = style;
      tipbox.text = this.tipmsg;
      tipbox.fns = this.fns;
    },
    handleMouseLeave() {
      tipbox.text = '';
    }
  }
}
</script>

<style>

</style>