<template>
  <div class="module-content" v-loading="loading">
    <el-row>
      <el-col :span="leftW" :style="{ backgroundColor: leftBgColor }" class="layout-left">
        <div class="dept-check emr-check">
          <el-checkbox-group v-model="checkTypes" size="mini">
            <span v-for="(el, i) in emrTypes" :key="i" class="dept-check-item pacs-check-item">
              <el-checkbox-button :label="el.type" @change="handleCheck" :checked="true">{{ el.desc }}</el-checkbox-button>
            </span>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="rightW" class="layout-right">
        <el-row class="module-content-list">
          <el-col v-for="(day, i) in showDays" :key="i" :sm="3" :xs="3" class="">
            <template v-if="emrDocs">
              <div v-for="(data, j) in emrDocs[0]" :key="'data_' + j">
                <template v-if="curdates[i] === data[date]">
                  <Label v-if="data.display" :param="data" :basic="{ name, date, time }" :labelConfig="labelConfig" :labelClick="labelClick" @click.native="handleClick(data)" />
                </template>
              </div>
            </template>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog v-if="dialogVisible" class="elDialog1" :title="emrTitle || $t(setting.noEMRTitlePlaceholder)" :visible.sync="dialogVisible" width="70%">
      <div style="height: 100%;" v-loading="iframeLoading">
        <iframe ref="iframe" :src="targetSrc" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import Label from '@/components/Label/labelData.vue';
import { getEmr } from '@/server/api.js';

let bind = false;
export default {
  components: {
    Label
  },
  data() {
    return {
      loading: true,
      iframeLoading: false,
      checkTypes: [],
      emrTypes: [],
      emrDocs: [],
      hasDocs: true,
      dialogVisible: false,
      targetSrc: '',
      emrTitle: ''
    };
  },
  created() {
    bus.$on('EMR', cb => cb && cb.call(this));
    getEmr();
  },
  watch: {
    dialogVisible(value) {
      if (value && !bind) {
        this.$nextTick(() => {
          let dom = this.$refs.iframe;
          console.log("dom", dom);
          dom.onload = () => {
            this.iframeLoading = false;
          }
        })
      }
    }
  },
  computed: {
    ...inject('layout', 'timeline', 'EMR'),
    curdates() {
      return this.curdays.map(d => d.date);
    }
  },
  methods: {
    handleCheck(value, e) {
      let name = e.target.value;
      this.emrTypes.forEach(item => {
        let { type, location } = item;
        if (name === type) {
          location.forEach(s => {
            this.emrDocs[s[0]][s[1]].display = value;
          });
        }
      });
    },
    handleClick(data) {
      this.targetSrc = data.targetSrc;
      this.emrTitle = data.desc;
      this.dialogVisible = true;
      this.iframeLoading = true;
    }
  }
};
</script>

<style lang="scss">
.elDialog1 {
  margin-top: calc(56px - 12vh);
  overflow: hidden;
  .el-dialog {
    height: 85%;
    .el-dialog__body {
      box-sizing: border-box;
      height: calc(100% - 55px);
    }
  }
}
</style>
