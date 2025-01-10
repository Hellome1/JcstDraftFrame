<template>
  <el-row>
    <el-col class="layout-left" :span="leftW" :style="{ backgroundColor: leftBgColor }">
      <div class="dept-check">
        {{ item.desc }}
        <el-checkbox-group v-model="checkDept" size="mini">
          <span v-for="(el, i) in dept" :key="i" class="dept-check-item pacs-check-item">
            <el-checkbox-button :label="el.code">{{ el.desc }}</el-checkbox-button>
          </span>
        </el-checkbox-group>
      </div>
    </el-col>
    <el-col :span="rightW" class="layout-right" :style="item.display === 'line' ? { borderLeft: '1px solid #ddd' } : {}" >
      <el-row v-if="item.display == 'list'" class="module-content-list">
        <el-col v-for="(day, i) in showDays" :key="day" :sm="3" :xs="3" class="">
          <Wrapper 
            :length="filDatas.filter(data => data[classifyKey] === item.code && curdates[i] === data[date]).length"
            :maxShowRow="3"
          >
            <div v-for="(data, d) in filDatas" :key="data[name] + (data.isHighlight ? '1' + d : d) + curFirstDate">
              <Label 
                v-if="data[classifyKey] === item.code && curdates[i] === data[date]" 
                :basic="{ name, date, time }" 
                :labelConfig="labelConfig" 
                :param="data" 
              />
            </div>
          </Wrapper>
        </el-col>
      </el-row>
      <div v-if="item.display == 'line'" class="module-content-line">
        <div v-for="(data, d) in filDatas" :key="data[name] + data[date] + (data.isHighlight ? '1' + d : d) + curFirstDate">
          <template v-if="data[classifyKey] === item.code && isShow(data)">
            <TDline 
              :basic="{ name, startDate: date, startTime: time }" 
              :TDlineConfig="TDlineConfig" 
              :data="data" 
            />
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
    item: {
      required: true
    },
    datas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      checkDept: [],
      dept: [],
      filDatas: []
    };
  },
  watch: {
    curdates() {
      this.classifyMed();
    },
    checkDept() {
      this.filter();
    }
  },

  mounted() {},

  updated() {},

  created() {
    this.classifyMed();
  },

  computed: {
    ...inject('layout', 'timeline', 'medicalOrder'),
    curdates() {
      return this.curdays.map(d => d.date);
    },
    curFirstDate() {
      return this.curdates[0];
    }
  },

  methods: {
    classifyMed() {
      let arr = [];
      let deptArr = [];
      this.datas.forEach(item => {
        let push = false;
        if (this.item.display === 'list' && this.curdates.filter(date => date === item[this.date]).length) push = true;
        if (this.item.display === 'line' && this.isShow(item)) push = true;
        for (let i = 0; i < arr.length; i++) {
          if (item[this.classifyKey] == arr[i].desc) push = false;
        }
        if (push) {
          deptArr.push(item[this.classifyKey]);
          arr.push({
            code: item[this.classifyKey],
            desc: item[this.classifyKey]
          });
        }
      });
      
      this.checkDept = deptArr;
      this.dept = arr;
    },
    filter() {
      let arr = [];
      this.datas.forEach(m => {
        let push = false;
        this.checkDept.forEach(item => {
          if (item == m[this.classifyKey]) push = true;
        });
        if (push) {
          arr.push(m);
        }
      });

      // console.log('filDatas', arr);
      this.filDatas = arr;
    },
    isShow(item) {
      let curdates = this.curdates;
      let startDate = curdates[0], endDate = curdates[curdates.length - 1];
      let diffS_1 = dayjs(item[this.date]).diff(endDate);
      let diffE_2 = dayjs(item[this.stopDate]).diff(startDate);
      // console.log('diffE_2', diffE_2, item[this.stopDate]);
      if (diffS_1 <= 0 && diffE_2 >= 0) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
