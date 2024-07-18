<template>
  <div class="module-content">
    <el-row>
      <el-col class="layout-left pacs-left" :span="leftW" :style="{ backgroundColor: leftBgColor }">
        <div class="dept-check pacs-check">
          <el-checkbox-group v-if="!nullData" v-model="checkDept" size="mini">
            <span v-for="(el, i) in dept" :key="i" class="dept-check-item pacs-check-item">
              <el-checkbox-button :label="el.code">{{ el.desc }}</el-checkbox-button>
            </span>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col class="layout-right" :span="rightW">
        <el-empty v-if="nullData" :description="$t('pacs.noDataDesc')"></el-empty>
        <el-row class="module-content-list" :class="nullData ? 'nullData' : ''">
          <el-col v-for="(day, i) in showDays" :key="i" :sm="3" :xs="3">
            <div v-for="(item, d) in filteredData" :key="'_data' + d">
              <template v-if="getDate(day) === item[dateKey]">
                <!-- <Label v-if="item" :nullData="(nullData = false)" :param="item" :setting="setting" /> -->
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
import { getPacs } from '@/server/api';

export default {
  name: 'pacs',
  components: {
    // Label
  },
  data() {
    return {
      checkDept: [],
      dept: [],
      data: [],
      filteredData: [],
      nullData: true
    };
  },
  watch: {
    
  },

  mounted() {},

  created() {
    this.busOn();
    getPacs();
  },

  computed: {
    ...inject('layout', 'timeline', 'pacs')
  },

  methods: {
    busOn() {
      bus.$on('pacs', cb => {
        cb && cb.call(this);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
