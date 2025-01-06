<template>
  <div class="module-content" :style="loading ? { minHeight: '36px' } : {}" v-loading="loading">
    <Mdc
      ref="mdc"
      v-for="(item, i) in items"
      :key="i"
      :item="item"
      :datas="classifyObj[item.code] ? classifyObj[item.code] : []"
    />
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import { getMedicalOrder } from '@/server/api.js';
import Mdc from './mdc.vue';

export default {
  components: {
    Mdc
  },
  data() {
    return {
      loading: true,
      datas: [],
      keyArr: [],
      classifyObj: {},
      dataFilterObj: {},
      items: []
    };
  },
  created() {
    bus.$on('medicalOrder', cb => (cb && cb.call(this)));
    getMedicalOrder();
  },
  computed: {
    ...inject('layout', 'timeline', 'medicalOrder')
  },
  methods: {
    handleData(data) {
      let _this = this;
      // 排序，去重，日期加显示字段不重复
      let arr = [];

      // 时间排序
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (getTime(data[i]) > getTime(data[j])) {
            let tmp = data[i];
            data[i] = data[j];
            data[j] = tmp;
          }
        }
      }

      // 去重
      data.forEach((item, index) => {
        item.vid = index;
        if (item[this.classifyKey] != 'S' && item[this.classifyKey] != 'OMST') {
          let key1 = item[this.name] + item[this.date] + item[this.classifyKey];
          let pushFlag = true;
          for (let i = 0; i < arr.length; i++) {
            let key2 = arr[i][this.name] + arr[i][this.date] + arr[i][this.classifyKey];
            if (key1 == key2) pushFlag = false;
          }
          if (pushFlag) arr.push(item);
        } else {
          arr.push(item);
        }
      });

      // 按 this.classifyKey 字段分类
      let classifyObj = {};
      arr.forEach(item => {
        if (classifyObj[item[this.classifyKey]]) {
          classifyObj[item[this.classifyKey]].push(item);
        } else {
          classifyObj[item[this.classifyKey]] = [item];
        }
      });
      this.classifyObj = classifyObj;
      
      return arr;

      function getTime(singleData) {
        let time = singleData[_this.date] + ' ' + singleData[_this.time];
        return dayjs(time);
      }
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
