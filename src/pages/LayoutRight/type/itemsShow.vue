<template>
  <div>
    <h4>Items配置</h4>
    <div class="jcst-table-config">
      <div style="display: flex;">
        <div>
          <p style="width: 40px;margin-right: 8px; font-weight: bold; line-height: 28px;">键值</p>
          <p style="height: 60px; width: 40px;margin-right: 8px; font-weight: bold; line-height: 28px;">描述</p>
          <p style="margin-right: 8px; font-weight: bold; line-height: 28px;">颜色</p>
          <p style="height: 50px; margin-right: 8px; font-weight: bold;">区间</p>
          <p style="margin-right: 8px; font-weight: bold; line-height: 28px;">间隔</p>
        </div>
        <div style="display: flex;">
          <span v-for="c in items" :key="c.name" style="margin-right: 8px;">
            <span style="display: flex; flex-direction: column;">
              <input type="text" v-model="c.name" disabled >
              <span style="height: 50px;">
                <span v-for="(d, index) in c.desc" :key="d">
                  <input type="text" v-model="c.desc[index]">
                </span>
              </span>
              <el-color-picker v-model="c.color" @change="handleChange"></el-color-picker>
              <span>
                <el-input type="number" size="mini" v-model="c.startValue" @change="handleChange(c, 'startValue')" />
                <el-input type="number" size="mini" v-model="c.endValue" @change="handleChange(c, 'endValue')" />
              </span>
              <el-input type="number" size="mini" v-model="c.interval" @change="handleChange(c, 'interval')" />
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
export default {
  name: 'itemsShow',
  data() {
    return {
      items: []
    }
  },
  created() {
    console.log('itemsShow:', this.itemsShow);
    const items = this.getValue();
    console.log('items', this.cp(items));
    this.items = items;
  },
  computed: {
    ...inject('layoutRight')
  },
  methods: {
    getValue() {
      let name = this.itemsShow;
      return getJcstValue(['jcst_setting', ...name.split('_')]);
    },
    setValue(v) {
      let name = this.itemsShow;
      setJcstValue(['jcst_setting', ...name.split('_')], v);
    },
    handleChange(c, k) {
      if (c && k) {
        c[k] = parseInt(c[k]);
      }
      console.log('items', this.cp(this.items));
      this.setValue(this.cp(this.items));
    }
  }
}
</script>

<style>

</style>