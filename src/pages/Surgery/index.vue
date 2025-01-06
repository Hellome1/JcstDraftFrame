<template>
  <div class="module-content" :style="loading ? { minHeight: '36px' } : {}" v-loading="loading">
    <el-row>
      <el-col :span="leftW" :style="{ backgroundColor: leftBgColor }" class="layout-left"></el-col>
      <el-col :span="rightW" class="layout-right">
        <el-row class="module-content-list" :class="''">
          <el-col v-for="(day, i) in showDays" :key="i" :sm="3" :xs="3">
            <div v-for="(item, d) in surgeryData" :key="'_data' + d">
              <template v-if="curdates[i] === item[date]">
                <Label v-if="item" :param="item" :labelClick="labelClick" :basic="{ name, date, time: '' }" :labelConfig="labelConfig" />
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Label from '@/components/Label/labelData.vue';

export default {
  name: 'surgery',
  components: {
    Label
  },
  computed: {
    ...inject('layout', 'timeline', 'surgery'),
    curdates() {
      return this.curdays.map(d => d.date);
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
</style>
