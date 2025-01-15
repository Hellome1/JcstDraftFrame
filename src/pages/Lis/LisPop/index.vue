<template>
  <div class="lis-pop-index" ref="root">
    <div class="lis-panels" :style="{ width: panelsWidth + 'px', transform: 'translate(' + translate + 'px)'}">
      <div class="lis-panel-itm" :style="{ width: itmWidth + 'px' }">
        <Head v-if="dialogVisible"/>
        <hr>
        <Table />
      </div>
      <div class="lis-panel-itm" :style="{ width: itmWidth + 'px' }">
        <History :width="itmWidth" />
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Head from './head.vue';
import Table from '@/components/Table/index.vue';
import History from './history.vue';

export default {
  name: 'LisPop',
  components: {
    Head,
    Table,
    History
  },
  data() {
    return {
      panelsWidth: 1000,
      translate: 0,
      itmWidth: 1000
    }
  },
  watch: {
    clickedRow(value) {
      if (value) {
        this.translate = -this.itmWidth;
      } else {
        this.translate = 0;
      }
    },
    dialogVisible(value) {
      if (!value) this.translate = 0;
    }
  },
  computed: {
    ...inject('modal', 'lis', 'lisnormHistory')
  },
  mounted() {
    let root = this.$refs.root;
    console.log('root', root.offsetWidth);
    this.panelsWidth = root.offsetWidth * 2;
    this.itmWidth = root.offsetWidth;
  }
}
</script>

<style lang="scss">
.lis-pop-index {
  overflow: hidden;
}
.lis-panels {
  transition: .3s;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .lis-panel-itm {
    width: 1000px;
    float: left;
  }
}
</style>