<template>
  <json-viewer :value="dataShow" :expand-depth="2"></json-viewer>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
export default {
  name: 'dataShow',
  data() {
    return {
    }
  },
  computed: {
    ...inject('layoutRight')
  }
}
</script>

<style>

</style>