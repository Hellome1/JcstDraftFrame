<template>
  <div class="glb-tip-box" :style="style" v-show="text">
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
  computed: {
    ...inject('tipbox')
  },
  methods: {
    getFnText(index, fn) {
      let tmp = '{order}、{fn}'
      return tmp.replace('{order}', index + 1).replace('{fn}', fn);
    }
  }
}
</script>

<style>
@import './index.scss';
</style>