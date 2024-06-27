<template>
  <div id="app">
    <el-row>
      <el-col :span="showLiveSetting ? 16 : 24" :style="isShow ? { position: 'relative' } : { position: 'relative', top: '-56px' }">
        <el-container :style="isEmbeded ? { position: 'relative' } : ''">
          <el-header class="header clear" :style="isEmbeded ? { position: 'absolute', top: 0, left: 0 } : ''">
            <Header v-if="isShow"></Header>
            <Timeline />
          </el-header>

          <el-main class="main">
            <Modules />
          </el-main>
        </el-container>

        <div class="common">
          <Modal />
          <TipBoxShow />
        </div>
      </el-col>
      <el-col v-if="showLiveSetting" :span="showLiveSetting ? 8 : 0">
        <LayoutRight />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Header from '@/pages/Header/header.vue';
import Timeline from '@/pages/Timeline/timeline.vue';
import TipBoxShow from '@/components/TipBox/index.vue';
import Modules from '@/pages/Modules/index.vue';
import LayoutRight from '@/pages/LayoutRight/index.vue';
import Table from '@/components/Table/index.vue';

export default {
  name: 'index',
  components: {
    Header,
    Timeline,
    TipBoxShow,
    Modules,
    LayoutRight,
    Table
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  beforeCreate() {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  computed: {
    ...inject('layout', 'header')
  },
  methods: {
    
  }
};
</script>
<style lang="css"></style>
