<template>
  <div id="app">
    <el-container :style="isEmbeded ? { position: 'relative' } : ''">
      <el-header class="header clear" :style="isEmbeded ? { position: 'absolute', top: 0, left: 0 } : ''">
        <Header v-if="isHeaderShow"></Header>
        <Timeline />
      </el-header>

      <el-main class="main">
      </el-main>
    </el-container>

    <div class="common">
      <Modal />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/pages/Header/header.vue';
import Timeline from '@/pages/Timeline/timeline.vue';

export default {
  name: 'index',
  components: {
    Header,
    Timeline
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
    ...mapState(['header']),
    isHeaderShow() {
      return this.header.isShow
    },
    isEmbeded() {
      return this.header.isEmbeded
    }
  },
  methods: {
    
  }
};
</script>
<style lang="css"></style>
