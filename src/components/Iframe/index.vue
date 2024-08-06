<template>
  <div class="iframe-outer">
    <iframe :src="src" width="100%" :height="height" frameborder="0"></iframe>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
export default {
  name: 'Iframe',
  computed: {
    ...inject('iframe')
  }
}
</script>

<style>

</style>