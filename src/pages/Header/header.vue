<template>
  <div class="emr-header">
    <div class="emr-header-content clear" shape="isShow" :style="isEmbeded || showLiveSetting ? { position: 'absolute', width: '100%' } : null">
      <div class="header-layout-flex">
        <div class="header-l-f-left">
          <div class="hospital">
            <div class="hos-logo">
              <img :src="isProd ? '/EMR/emrviewdoctor/resources/image/logo-hos.png' : require('@/assets/img/hosLogo.png')" alt="" />
            </div>
            <div class="hos-right">
              <div class="product" shape="product">
                <Txt :txtstyle="product.style">{{ product.text }}</Txt>
              </div>
              <div class="hos-name" shape="hosName">
                <Txt :txtstyle="hosName.style">{{ hosName.text }}</Txt>
              </div>
            </div>
          </div>
          <div class="patient-info">
            <TipBox :tipmsg="$t('header.allergy.icon.tipmsg')" :isFixed="!showLiveSetting">
              <i v-if="allergyData.length" shape="allergyIcon-allergyData" class="fa" :class="`fa-${allergyIcon}`" style="color: #ff5d5d; cursor: pointer" @click="showModal"></i>
            </TipBox>
            <Txt :txtstyle="stl(patInfo.name)" shape="patInfo_name">{{ txt(patInfo.name) }}</Txt>
            <Txt :txtstyle="stl(patInfo.gender)" shape="patInfo_gender">{{ txt(patInfo.gender) }}</Txt>
            <Txt :txtstyle="stl(patInfo.birth)" shape="patInfo_birth">{{ txt(patInfo.birth) }}</Txt>
            <Txt :txtstyle="stl(patInfo.hosReg)" shape="patInfo_hosReg">{{ txt(patInfo.hosReg) }}</Txt>
          </div>
        </div>
        <!-- <div class="header-l-f-center"></div> -->
        <div class="header-l-f-right">
          <div class="header-tool-box">
            <div class="htb-upper">
              <TipBox :isFixed="true" tipmsg="切换语言 | Switch Language">
                <span>
                  <span class="lang-tip">Lang</span>
                  <select :value='lang' ref="langSelect" @change="handleLangChange" style="border: none; outline: none;">
                    <option label="中文" value="zh"></option>
                    <option label="English" value="en"></option>
                  </select>
                </span>
              </TipBox>
            </div>
            <div class="htb-lower">
              <div style="position: relative; width: 150px; float: right;">
                <HeaderTipBox v-show="showHeaderSearchTip" :text="$t('header.globalSearch.tipmsg')" :fns="[$t('header.globalSearch.fns[0]'), $t('header.globalSearch.fns[1]')]">
                </HeaderTipBox>
                <div class="global-search-box" @mouseenter="showHeaderSearchTip = true" @mouseleave="showHeaderSearchTip = false">
                  <input 
                    type="text" 
                    ref="globalSearch" 
                    class="global-search"
                    @keyup="handleKeyup" 
                    @keyup.enter="globalSearch" 
                  >
                  <div class="gs-icon-box" @click="globalSearch">
                    <i class="el-icon-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-info">
            <p>
              <Txt class="user-name" :txtstyle="stl(userInfo.name)" shape="userInfo_name">{{ txt(userInfo.name) }}</Txt>
              <Txt class="user-group" :txtstyle="stl(userInfo.group)" shape="userInfo_group">{{ txt(userInfo.group) }}</Txt>
            </p>
            <p>
              <Txt class="user-dept" :txtstyle="stl(userInfo.dept)" shape="userInfo_dept">{{ txt(userInfo.dept) }}</Txt>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
import HeaderTipBox from './Tip/index.vue';

export default {
  name: 'jcstheader',
  components: {
    HeaderTipBox
  },
  data() {
    return {
      isProd: isProduction,
      lang: INIT_lang,
      search: '',
      showHeaderSearchTip: false
    }
  },
  watch: {
    allergyData(value) {
      if (value.length) this.showModal();
    }
  },
  computed: {
    ...inject('layout', 'header'),
  },
  created() {
    
  },
  methods: {
    showModal() {
      if (jcst.modal.dialogVisible) return;
      handleEvent(this.handleClick)
    },
    handleLangChange() {
      let select = this.$refs.langSelect;
      let lang = select.value;
      if (lang != this.lang) {
        changeSearchAndOpenSelf('lang', lang);
      }
    },
    handleKeyup() {
      let input = this.$refs.globalSearch;
      this.search = input.value;
    },
    globalSearch() {
      let search = this.search;
      if (!search.trim()) return;
      console.log('[header.vue 124] GlobalSearch:', search);
      let input = this.$refs.globalSearch;
      input.blur();

      let valuedate = '', searchMatch = '', mName = '', index = -1;
      for (let date in Times) {
        let moduleObj = Times[date];
        for (let moduleName in moduleObj) {
          if (valuedate) break;
          let values = moduleObj[moduleName];
          let result = values.filter((value, i) => {
            let flag = value.indexOf(search) > -1;
            if (flag && index === -1) {
              index = i;
              searchMatch = value;
            }
            return flag;
          })[0];
          if (result) valuedate = date, mName = moduleName;
        }
      }
      console.log('[header.vue 141] GlobalSearchResult valuedate:', valuedate, 'moduleName:', mName, 'index:', index);
      if (valuedate) {
        bus.$emit('wrapperSearch', mName, valuedate, searchMatch);
        selectPageFromDate(valuedate);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
