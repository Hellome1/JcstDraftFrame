<template>
  <el-row>
    <el-col class="layout-left" :span="layout.leftW" :style="{ backgroundColor: layout.leftBgColor }">
      <div class="dept-check">
        {{ item.desc }}
        <el-checkbox-group v-model="checkDept" size="mini">
          <span v-for="(el, i) in dept" :key="i" class="dept-check-item pacs-check-item">
            <el-checkbox-button :label="el.code">{{ el.desc }}</el-checkbox-button>
          </span>
        </el-checkbox-group>
      </div>
    </el-col>
    <el-col :span="layout.rightW" class="layout-right">
      <el-row v-if="item.display == 'list'" class="module-content-list">
        <el-col v-for="day in layout.showDays" :key="day" :sm="3" :xs="3" class="">
          <div v-for="(data, d) in filDatas" :key="data[setting.labelConfig.name] + (data.isHighlight ? '1' + d : d)">
            <template v-if="data[setting.codeInData] === item.code && getDate(day) === data[setting.dateKey]">
              <Label :nullData="(nullData = false)" :param="data" :setting="setting" :right="day > 5 ? true : false" />
            </template>
          </div>
        </el-col>
      </el-row>
      <div v-if="item.display == 'line'" class="module-content-line">
        <div v-for="(data, d) in filDatas" :key="data[setting.TDlineConfig.name] + data[setting.TDlineConfig.startDate] + (data.isHighlight ? '1' + d : d) + tlCruSDate">
          <template v-if="data[setting.codeInData] === item.code && isShow(data)">
            <TDline :nullData="(nullData = false)" :data="data" :setting="setting" />
          </template>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Label from '@/components/Label/labelData.vue';
import TDline from '@/components/TDline/TDlineData.vue';

export default {
  components: {
    TDline,
    Label
  },
  props: {
    setting: {
      type: Object,
      required: true
    },
    item: {
      required: true
    },
    datas: {
      type: Array,
      required: true
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nullData: true,
      checkDept: [],
      dept: [],
      filDatas: []
    };
  },
  watch: {
    
  },

  mounted() {},

  updated() {},

  created() {
    
  },

  computed: {
    ...inject('layout', 'timeline', 'medicalOrder')
  },

  methods: {}
};
</script>
<style lang="scss" scoped></style>
