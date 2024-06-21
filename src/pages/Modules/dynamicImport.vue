<script>
const dict = {
  'vitalsigns': 'VitalSigns/index.vue'
}
export default {
  name: 'dynamicImport',
  props: {
    name: ''
  },
  render(h) {
    const path = dict[this.name];
    return h(
      require('@/pages/' + path).default,
      {},
      ''
    )
  }
}
</script>