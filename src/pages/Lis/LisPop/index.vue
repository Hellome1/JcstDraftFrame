<template>
  <div>
    <Head v-if="dialogVisible"/>
    <hr>
    <Table />
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Head from './head.vue';
import Table from '@/components/Table/index.vue';
export default {
  name: 'LisPop',
  components: {
    Head,
    Table
  },
  computed: {
    ...inject('modal')
  }
}
</script>

<style>

</style>