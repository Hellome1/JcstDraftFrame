<template>
  <div class="glb-tip-box" :style="posStyle" v-show="text">
    <p class="tip-mian">{{text}}</p>
    <ul class="tip-fns">
      <li class="tip-fn-item" v-for="(fn, i) in fns" :key="fn">{{ getFnText(i, fn) }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TipBox',
  computed: {
    ...mapState(['tipbox']),
    text() {
      return this.tipbox.text;
    },
    fns() {
      return this.tipbox.fns;
    },
    posStyle() {
      let { left, top } = this.tipbox.pos;
      return { left: left + 'px', top: top + 'px' };
    }
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