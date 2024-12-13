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
              <TipBox tipmsg="切换语言 | Switch Language">
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
              <TipBox :tipmsg="$t('header.globalSearch.tipmsg')" :fns="[$t('header.globalSearch.fns[0]'), $t('header.globalSearch.fns[1]')]">
                <div style="width: 150px; float: right;">
                  <div class="global-search-box" :style="isFocus ? { width: '150px' } : {}">
                      <input 
                        type="text" 
                        ref="globalSearch" 
                        class="global-search"
                        @focus="isFocus = true" 
                        @blur="isFocus = false" 
                        @keyup="handleKeyup" 
                        @keyup.enter="globalSearch" 
                      >
                      <div class="gs-icon-box" @click="globalSearch">
                        <i class="el-icon-search"></i>
                      </div>
                  </div>
                </div>
              </TipBox>
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

export default {
  name: 'jcstheader',
  data() {
    return {
      isProd: isProduction,
      lang: INIT_lang,
      search: '',
      isFocus: false
    }
  },
  watch: {
    allergyData(value) {
      // if (value.length) this.showModal();
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
        let searchs = location.search.split('&');
        let searchsWithoutLang = searchs.filter(itm => itm.indexOf('lang=') === -1);
        searchsWithoutLang.push('lang=' + lang);
        let nsearch = searchsWithoutLang.join('&');
        nsearch = nsearch.indexOf('?') > -1 ? nsearch : '?' + nsearch;
        nsearch = nsearch.replace('?&', '?');
        console.log('nsearch', nsearch);
        let path = location.pathname;
        let nurl = path + nsearch;
        window.open(nurl, '_self');
      }
    },
    handleKeyup() {
      let input = this.$refs.globalSearch;
      this.search = input.value;
    },
    globalSearch() {
      let search = this.search;
      console.log('search', search);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
