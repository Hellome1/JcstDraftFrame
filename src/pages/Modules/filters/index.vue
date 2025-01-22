<template>
  <div class="module-filters">
    <FilterItem
      v-for="(op, i) in filterOptions"
      :key="i"
      :type="op.type"
      :value="op.value"
      :options="op.options"
      :placeholder="op.placeholder"
      :dataProperty="op.dataProperty"
      :moduleName="filterOptionsName"
    />
  </div>
</template>

<script>
import FilterItem from './filter.vue';

export default {
  name: 'moduleFilters',
  props: {
    filterOptionsName: ''
  },
  components: {
    FilterItem
  },
  data() {
    return {
      filterOptions: moduleFilterOptions[this.filterOptionsName]
    }
  },
  created() {
    if (this.filterOptions && this.filterOptions.length) {
      bus.$on('moduleFilterIndex', (moduleName, cb) => {
        if (moduleName === this.filterOptionsName && cb) cb.call(this);
      });
    }
  }
}
</script>

<style lang="scss">
.module-filters {
  display: flex;
  gap: 10px;
}
</style>