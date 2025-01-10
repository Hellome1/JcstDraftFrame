<template>
  <div class="lisnorm-pop">
    <canvas id="lisnormHistoryCanvas"></canvas>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

export default {
  name: 'lisnormPop',
  watch: {
    clickedRow(value) {
      console.log('clickedRow watch', value);
    }
  },
  computed: {
    ...inject('lisnorm')
  },
  mounted() {
    console.log('clickedRow', this.clickedRow);
  },
  methods: {
    initChart() {}
  }
}
</script>

<style>

</style>