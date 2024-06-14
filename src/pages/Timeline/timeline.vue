<template>
  <div class="timeline">
    <el-row>
      <el-col class="tl-select" :span="leftW">
        <div class="tl-top">
          <div class="showSetting">
            <div v-if="iconShow" class="tl-icons-box">
              <span class="tl-icon type1" ref="detailBoxPosi1" v-if="hasSurgeryInfo" @click="handleClickIconBox">{{$t('timeline.iconBox.type1.text')}}</span>
            </div>
          </div>

          <div>
            <el-button class="tl-fold" type="primary" size="mini">{{ $t('timeline.foldBtn.foldTxt') }}</el-button>
          </div>
        </div>
        <div class="tl-bottom">
          <i class="el-icon-caret-left" :class="selectPage > 1 ? 'clickable' : 'btn-disabled'" @click="() => { selectPage > 1 ? selectPage-- : null }"></i>
          <el-select
            class="select-week"
            size="mini"
            popper-class="select-week-dropdown"
            v-model="selectPage"
            :placeholder="$t('timeline.selectPage.placeholder')"
          >
            <el-option
              v-for="week in pages"
              :label="$t('timeline.selectPage.beforePageText') + ' ' + week + ' ' + $t('timeline.selectPage.afterPageText')"
              :value="week"
              :key="week"
              >{{ $t('timeline.selectPage.beforePageText') + ' ' + week + ' ' + $t('timeline.selectPage.afterPageText') }}</el-option
            >
          </el-select>
          <i class="el-icon-caret-right clickable" :class="selectPage < pages ? 'clickable' : 'btn-disabled'" @click="() => { selectPage < pages ? selectPage++ : null }"></i>
        </div>
      </el-col>
      <el-col class="tl-list" :span="rightW">
        <el-row>
          <el-col
            :sm="3"
            :xs="3"
            v-for="(day, i) in curdays"
            :key="i"
            class="tl-day"
          >
            <div class="tl-top" :class="day.className">
              <template v-if="day.showText">
                <p>{{ day.showText }}</p>
                <p>{{ `${day.date}(${weekContract(day.week)})` }}</p>
              </template>
            </div>
            <div class="tl-bottom" :class="day.className">
              <template v-if="day.showText">
                <span v-for="(el, i) in 24 / interval" :key="i">{{ el * interval - topTimeSubTract }}</span>
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'timeline',
  data() {
    return {
      selectPage: 1
    };
  },
  mounted() {
    
  },
  created() {
    
  },
  watch: {
    selectPage(v) {
      this.handle_selectPage_change();
    }
  },
  computed: {
    ...mapState(['timeline', 'surgery']),
    interval() {
      return this.timeline.interval;
    },
    leftW() {
      return this.timeline.leftW;
    },
    rightW() {
      return this.timeline.rightW;
    },
    pages() {
      return this.timeline.pages;
    },
    curdays() {
      return this.timeline.curdays;
    },
    topTimeSubTract() {
      return this.timeline.topTimeSubTract;
    },
    iconShow() {
      return this.timeline.iconShow;
    },
    hasSurgeryInfo() {
      return this.surgery.surgeryInfo.length;
    }
  },
  methods: {
    handle_selectPage_change() {
      selectPage(this.selectPage);
    },
    handleClickIconBox() {
      let page = selectPageFromDate(setting.surgery.surgeryInfo[0].surgeryDate);
      this.selectPage = page;
    }
  }
};
</script>
<style lang="scss">
@import './timeline.scss';
</style>
