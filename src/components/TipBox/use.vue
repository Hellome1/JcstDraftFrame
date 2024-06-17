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
    fns: []
  },
  methods: {
    handleMouseEnter() {
      const root = this.$refs.root;
      const tar = this.$slots.default[0] && this.$slots.default[0].elm;
      const pos = this.getDomAbsPosition(tar || root);
      console.log('position', pos);
      let tipbox = setting.tipbox;
      tipbox.pos = pos;
      tipbox.text = this.tipmsg;
      tipbox.fns = this.fns;
    },
    handleMouseLeave() {
      setting.tipbox.text = '';
    }
  }
}
</script>

<style>

</style>