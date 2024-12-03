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
    basic: {
      type: Object,
      required: true
    },
    TDlineConfig: {
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
      let TDlineConfig = Object.assign({}, this.TDlineConfig, this.basic);
      if (data.isHighlight) param.isHighlight = true;
      for (let key in TDlineConfig) {
        if (data[TDlineConfig[key]]) {
          param[key] = data[TDlineConfig[key]];
        } else if (typeof TDlineConfig[key] == 'string' && TDlineConfig[key].indexOf(' + ') > -1) {
          let value = '';
          TDlineConfig[key].split(' + ').forEach(item => {
            value += data[item];
          });
          param[key] = value;
        } else {
          param[key] = TDlineConfig[key];
        }
      }
      param.rowData = data;
      // console.log(param);
      if (!param.config) {
        param.config = {
          fontLight: false,
          isDetail: false,
          titleCfg: {
            isTitle: true,
            titleStyle: {
              color: '#84aaca'
            }
          }
        };
      }
      return param;
    }
  }
};
</script>

<style></style>
