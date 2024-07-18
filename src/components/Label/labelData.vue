<template>
  <div class="module-content">
    <Label v-if="handledParam" :param="handledParam" @getLisNorm="getLisN" />
  </div>
</template>

<script>
import Label from '@/components/Label/label.vue';
import { getLisNorm } from '@/server/api';
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
      return this.handleData(this.param, Object.assign({}, this.labelConfig, this.basic));
    }
  },

  methods: {
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
    },
    // 请求并处理数据
    getLisN(vm) {
      let hosIdk = this.setting.lisNormId || 'hosInspRptId';
      let hosId = this.param['businessFieldCode'] + '_' + this.param[hosIdk];
      getLisNorm({
        rows: 50,
        page: 1,
        inspOrdInfo: {
          hdcInspRptId: hosId
        }
      }).then(res => {
        let lis = this.handleLisN(res.data);
        this.$set(vm, 'lisNorm', lis);
      });
    },
    // 处理检验数据
    handleLisN(data) {
      // console.log(data);
      let lis = {
        tableData: [],
        row: this.setting.lisNormGrid
      };
      let gridAbnormal = this.setting.gridAbnormal;
      data.forEach(item => {
        let tbi = {};
        for (let key in lis.row) {
          lis.row[key] = this.$t(lis.row[key]);
          let val = item[key];
          if (key == gridAbnormal.key) {
            for (let i = 0; i < gridAbnormal.replaces.length; i++) {
              if (val.toLowerCase() == gridAbnormal.replaces[i].split('|')[0]) {
                val = gridAbnormal.replaces[i].split('|')[1];
                break;
              }
            }
          }
          tbi[key] = val;
        }
        lis.tableData.push(tbi);
      });

      // 携带异常位置
      let index = -1;
      for (let key in lis.row) {
        index++;
        if (key == gridAbnormal.key) break;
      }
      lis.abnIndex = index;

      return lis;
    }
  }
};
</script>
<style lang="scss" scoped></style>
