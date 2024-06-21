<template>
  <el-collapse-item class="module-item" :name="name">
    <template slot="title">
      <h4 class="module-title" :style="{ fontSize: moduleHeadFontSize, color: moduleHeadColor }">{{titleText}}</h4>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';

export default {
  name: 'collapseItem',
  props: {
    name: '',
    titleText: ''
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...inject('layout')
  },
  methods: {
  }
}
</script>

<style>

</style>