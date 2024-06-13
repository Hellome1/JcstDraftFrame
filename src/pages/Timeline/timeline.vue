<template>
  <div class="timeline">
    <el-row>
      <el-col class="tl-select" :span="leftW">
        <div class="tl-top">
          <div>
            <el-button class="tl-fold" type="primary" size="mini">{{ $t('timeline.foldBtn.foldTxt') }}</el-button>
          </div>
        </div>
        <div class="tl-bottom">
          <i class="el-icon-caret-left" :class="selectWeek > 1 ? 'clickable' : 'btn-disabled'" @click="() => { selectWeek > 1 ? selectWeek-- : null }"></i>
          <el-select
            @change="handleChange"
            class="select-week"
            size="mini"
            popper-class="select-week-dropdown"
            v-model="selectWeek"
            :placeholder="$t('timeline.selectWeek.placeholder')"
          >
            <el-option
              v-for="week in weeks"
              :label="$t('timeline.selectWeek.beforePageText') + ' ' + week + ' ' + $t('timeline.selectWeek.afterPageText')"
              :value="week"
              :key="week"
              >{{ $t('timeline.selectWeek.beforePageText') + ' ' + week + ' ' + $t('timeline.selectWeek.afterPageText') }}</el-option
            >
          </el-select>
          <i class="el-icon-caret-right clickable" :class="selectWeek < weeks ? 'clickable' : 'btn-disabled'" @click="() => { selectWeek < weeks ? selectWeek++ : null }"></i>
        </div>
      </el-col>
      <el-col class="tl-list" :span="rightW">
        <el-row>
          <el-col
            :sm="3"
            :xs="3"
            v-for="(day, i) in days"
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'timeline',
  data() {
    return {
      selectWeek: 1
    };
  },
  mounted() {
    
  },
  created() {
    
  },
  watch: {
    selectWeek(v) {
      this.handle_selectWeek_change();
    }
  },
  computed: {
    ...mapState(['timeline']),
    interval() {
      return this.timeline.interval;
    },
    leftW() {
      return this.timeline.leftW;
    },
    rightW() {
      return this.timeline.rightW;
    },
    weeks() {
      return this.timeline.weeks;
    },
    days() {
      return this.timeline.days;
    },
    topTimeSubTract() {
      return this.timeline.topTimeSubTract;
    }
  },
  methods: {
    handleChange() {
      return;
      let selectWeek = this.selectWeek;
      let days = STATE.get('tlDays');
      let showDays = setting.timeline.showDays;
      let ndays = days.filter((_, i) => (showDays * (selectWeek - 1) <= i && i < showDays * selectWeek));
      setting.timeline.days = ndays;
    },
    handle_selectWeek_change() {
      let selectWeek = this.selectWeek;
      let days = STATE.get('tlDays');
      let showDays = setting.timeline.showDays;
      let ndays = days.filter((_, i) => (showDays * (selectWeek - 1) <= i && i < showDays * selectWeek));
      setting.timeline.days = ndays;
    }
  }
};
</script>
<style lang="scss">
@import './timeline.scss';
</style>
