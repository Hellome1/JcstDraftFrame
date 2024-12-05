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
        } else if (/{\w+}/.test(TDlineConfig[key])) {
          param[key] = TDlineConfig[key].replace(/{\w+}/ig, (match, index) => {
            let key = match.replace(/{|}/g, '');
            return data[key];
          });
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
