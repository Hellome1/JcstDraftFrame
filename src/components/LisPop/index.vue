<template>
  <div>
    <Head />
    <hr>
    <Table />
  </div>
</template>

<script>
import Head from './head.vue';
import Table from '../Table/index.vue';
export default {
  name: 'LisPop',
  components: {
    Head,
    Table
  }
}
</script>

<style>

</style>