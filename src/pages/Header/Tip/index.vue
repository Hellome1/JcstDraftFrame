<template>
  <div class="glb-tip-box" ref="root" style="left: 0; top: 20px; text-align: left; width: 200px;" v-show="text">
    <p class="tip-mian">{{text}}</p>
    <ul class="tip-fns">
      <li class="tip-fn-item" v-for="(fn, i) in fns" :key="fn">{{ getFnText(i, fn) }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderTipBox',
  props: {
    text: '',
    fns: []
  },
  data() {
    return {
      
    }
  },
  watch: {
    
  },
  computed: {
    
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