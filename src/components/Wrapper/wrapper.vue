<template>
  <ul class="label-wrapper" :style="style" @mousewheel.prevent="handleMouseWheel">
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
    }
  }
}
</script>

<style>

</style>