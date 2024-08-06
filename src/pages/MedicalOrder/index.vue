<template>
  <div class="module-content">
    <Mdc
      ref="mdc"
      v-for="(item, i) in items"
      :key="i"
      :item="item"
      :datas="classifyObjFilter[item.code] ? classifyObjFilter[item.code] : []"
    />
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Mdc from './mdc.vue';

export default {
  components: {
    Mdc
  },
  data() {
    return {
      datas: [],
      keyArr: [],
      classifyObj: {},
      classifyObjFilter: {},
      dataFilterObj: {},
      memory: {
        index: 0,
        key: '',
        val: ''
      }
    };
  },
  watch: {
    
  },

  mounted() {},

  updated() {},

  created() {
    this.getData();
    this.busOn();
  },

  computed: {
    ...inject('layout', 'timeline', 'medicalOrder')
  },

  methods: {
    busOn() {
      bus.$on('medicalOrder', cb => (cb && cb.call(this)));
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  display: flex;
  .layout-left {
    height: inherit;
  }
}
</style>
