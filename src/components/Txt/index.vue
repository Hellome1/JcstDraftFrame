<template>
  <span :style="txtstyle || {}">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    txtstyle: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style>

</style>