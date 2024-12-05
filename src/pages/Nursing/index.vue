<template>
  <div class="module-content">
    <el-row v-for="(item, i) in items" :key="i">
      <el-col :span="leftW" :style="{ backgroundColor: leftBgColor }" class="layout-left">{{ item.desc }} {{item.unit ? `(${item.unit})` : ''}}</el-col>
      <el-col :span="rightW" class="layout-right">
        <el-row class="module-content-list">
          <el-col v-for="(day, i) in showDays" :key="day" :sm="3" :xs="3">
            <p v-for="(el, j) in item.data" :key="'data_' + j">
              <span v-if="el.vitalSignMeasDate == curdates[i]">{{ el.vitalSignMeasValue }}</span>
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import { getVitals } from '@/server/api';

export default {
  components: {},
  data() {
    return {
      items: [],
      itemCodes: [],
      nursingItems: {},
      data: {},
      isNullData: true // 是否数据为空
    };
  },
  created() {
    bus.$on('nursing', (cb) => cb && cb.call(this));
    getVitals({ from: 'vitalsignsNursing' }, nursing_data);
  },
  mounted() {},
  watch: {
    curdates() {
      this.handleData();
    }
  },
  computed: {
    ...inject('layout', 'timeline', 'nursing'),
    curdates() {
      return this.curdays.map(d => d.date);
    }
  },
  methods: {
    handleData() {
      let showAllItems = this.showAllItems;
      this.items = showAllItems && this.allItems || [];
      for (const key in this.data) {
        let data = this.data[key];
        if (this.nursingItems[key]) {
          this.nursingItems[key].data = data.filter(item => {
            let { vitalSignMeasDate: date } = item;
            return this.curdates.includes(date);
          });
          if (showAllItems) {
            this.items.forEach(itm => {
              if (itm.code === key) {
                itm.data = this.nursingItems[key].data;
              }
            });
          } else this.items.push(this.nursingItems[key]);
        }
      }
      console.log('[nursing.vue 72] this.items:',this.items);
      if (this.items.length) this.isNullData = false;
      this.$forceUpdate();
    },
  }
};
</script>
<style lang="css"></style>
