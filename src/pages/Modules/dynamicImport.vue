<script>
const dict = {
  'vitalsigns': 'VitalSigns/index.vue',
  'medicalOrder': 'MedicalOrder/index.vue',
  'nursing': 'Nursing/index.vue',
  'pacs': 'Pacs/index.vue',
  'lis': 'Lis/index.vue',
  'surgery': 'Surgery/index.vue',
  'consult': 'Consult/index.vue'
};
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