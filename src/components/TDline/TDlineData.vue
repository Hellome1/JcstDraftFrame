<template>
  <div class="TDlineData">
    <TDline :DT="param" />
  </div>
</template>

<script>
import TDline from './TDline.vue';
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    setting: {
      type: Object,
      required: true
    }
  },
  components: {
    TDline
  },
  data() {
    return {
      param: {}
    };
  },
  created() {
    this.param = this.handleData(this.data);
  },
  methods: {
    handleData(data) {
      let param = {};
      if (data.isHighlight) param.isHighlight = true;
      for (let key in this.setting.TDlineConfig) {
        if (data[this.setting.TDlineConfig[key]]) {
          param[key] = data[this.setting.TDlineConfig[key]];
        } else if (typeof this.setting.TDlineConfig[key] == 'string' && this.setting.TDlineConfig[key].indexOf(' + ') > -1) {
          let value = '';
          this.setting.TDlineConfig[key].split(' + ').forEach(item => {
            value += data[item];
          });
          param[key] = value;
        } else {
          param[key] = this.setting.TDlineConfig[key];
        }
      }
      param.rowData = data;
      // console.log(param);
      return param;
    }
  }
};
</script>

<style></style>
