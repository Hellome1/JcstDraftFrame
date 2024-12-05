<template>
  <div class="module-content">
    <Label v-if="handledParam" :labelClick="labelClick" :param="handledParam" :row="param" />
  </div>
</template>

<script>
import Label from '@/components/Label/label.vue';

export default {
  name: 'labelData',
  components: {
    Label
  },
  props: {
    labelConfig: {
      type: Object,
      required: true
    },
    labelClick: {
      type: Object
    },
    basic: {
      type: Object,
      required: true
    },
    // 传过来的原数据
    param: {
      type: Object,
      required: true
    },
    care: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  watch: {},

  mounted() {},

  created() {
    
  },

  computed: {
    handledParam() {
      return this.handleData(this.param, this.handleBasic());
    }
  },

  methods: {
    handleBasic() {
      let basic = this.cp(this.basic);
      let { name } = basic;
      if (/{\w+}/.test(name)) {
        basic.name = name.replace(/{\w+}/gi, (match, index) => {
          let key = match.replace(/{|}/g, '');
          return this.param[key];
        });
      }
      return Object.assign({}, this.labelConfig, basic);
    },
    // 处理数据，返回经过筛选的数据
    handleData(data, opt = {}) {
      let labelParam = {};
      if (data.isHighlight) {
        labelParam.isHighlight = true;
      }
      let config = opt.config;
      var repels = ['config', 'loop'];
      for (let key in opt) {
        if (repels.indexOf(key) === -1) {
          if (opt[key] in data) {
            labelParam[key] = data[opt[key]];
          } else {
            labelParam[key] = opt[key];
          }
        }
      }
      config = this.handleCare(labelParam['name'], config);
      if (config) {
        labelParam.config = config;
      }
      if (opt.loop) {
        labelParam.loop = opt.loop;
        labelParam.rowData = data;
      }

      return labelParam;
    },
    // 处理关注的部分
    handleCare(labelDesc, config) {
      let care = this.care;
      if (!care || !(care instanceof Array) || !care.length) return config;
      let nconfig = this.cp(config) || {};
      let color = care[0];
      if (!color) return config;
      let careList = care.slice(1);
      let isCare = careList.filter(itm => new TalkingTheSame(itm, labelDesc).result).length > 0;
      if (!isCare) return config;
      let pStyle = nconfig['pStyle'] || {};
      pStyle.color = color;
      nconfig.pStyle = pStyle;
      return nconfig;
    }
  }
};
</script>
<style lang="scss" scoped></style>
