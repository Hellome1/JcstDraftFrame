<template>
  <div class="module-filter-item">
    <template v-if="type === 'text'">
      <el-input type="text" v-model="value"></el-input>
    </template>
    <template v-else>
      <el-select 
        v-model="innerValue" 
        size="mini"
        @change="handleChange"
        :placeholder="placeholder"
        clearable
      >
        <el-option
          v-for="(op, i) in options"
          :key="i"
          :label="op.label"
          :value="op.value"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  name: 'moduleFilterItem',
  props: {
    type: '',
    value: '',
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    placeholder: '',
    dataProperty: '',
    moduleName: ''
  },
  data() {
    return {
      innerValue: ''
    }
  },
  created() {
    this.innerValue = this.value;
  },
  watch: {
    value(v) {
      this.innerValue = v;
    }
  },
  methods: {
    handleChange() {
      console.log('change', this.moduleName, this.dataProperty, this.innerValue);
      var res = this.cp(Data[this.moduleName]);
      if (this.innerValue) res.data = res.data.filter(itm => itm[this.dataProperty] === this.innerValue);
      medicalOrder_data(res);
    }
  }
}
</script>

<style>

</style>