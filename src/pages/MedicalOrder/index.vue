<template>
  <div class="module-content">
    <el-row v-if="nullData">
      <el-col :span="leftW" :style="{ backgroundColor: leftBgColor }" class="layout-left"></el-col>
      <el-col :span="rightW" class="layout-right">
        <el-empty :description="$t('medicalOrder.noDataDesc')"></el-empty>
      </el-col>
    </el-row>
    <Mdc
      ref="mdc"
      v-show="!nullData"
      v-for="(item, i) in setting.items"
      :key="i"
      :item="item"
      :setting="setting"
      :last="i == setting.items.length - 1 ? true : false"
      :datas="classifyObjFilter[item.code] ? classifyObjFilter[item.code] : []"
      @nullData="nullData = false"
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
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      datas: [],
      nullData: true,
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
    tlCruSDate: function() {
      this.nullData = true;
    }
  },

  mounted() {},

  updated() {},

  created() {
    this.getData();
    this.busOn();
  },

  computed: {
    ...inject('layout', 'timeline')
  },

  methods: {
    
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
