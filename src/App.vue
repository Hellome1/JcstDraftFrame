<template>
  <div id="app">
    <el-row>
      <el-col :span="showLiveSetting ? 16 : 24" :style="isShow ? { position: 'relative' } : { position: 'relative', top: '-56px' }">
        <div class="tipbox-scroll-ignore">
          <el-container :style="isEmbeded || showLiveSetting ? { position: 'relative' } : ''">
            <el-header class="header clear" :style="isEmbeded || showLiveSetting ? { position: 'absolute', top: 0, left: 0 } : ''">
              <Header v-if="isShow"></Header>
              <Timeline />
            </el-header>

            <el-main class="main">
              <Modules />
            </el-main>
          </el-container>

          <div class="common">
            <Modal />
            <ModalTwo />
            <TipBoxShow />
            <HighLightBox />
          </div>
        </div>

        <div id="patient_view-footer">
          <!-- <img style="width: auto; height: 11px;display: inline-block;margin-bottom: 4px; vertical-align: middle" id="btlogoimg" src="/EMR/emrviewdoctor/resources/image/btlogo.png"> -->
          <img style="width: auto; height: 11px;display: inline-block;margin-bottom: 4px; vertical-align: middle" id="btlogoimg" :src="imgsrc">
          ©东华医为科技有限公司版权所有2024 临床数据中心患者集成视图PatiView R2.4
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
import HighLightBox from '@/components/highLightBox/index.vue';

export default {
  name: 'index',
  components: {
    Header,
    Timeline,
    TipBoxShow,
    Modules,
    LayoutRight,
    Table,
    HighLightBox
  },
  props: {},
  data() {
    return {
      imgsrc: isProduction ? './btlogo.png' : '/btlogo.png'
    };
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
<style lang="scss">
.tipbox-scroll-ignore {
  position: relative;
  height: calc(100vh - 24px);
  overflow: auto;
}
</style>
