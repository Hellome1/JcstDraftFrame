<template>
  <div class="emr-header">
    <div class="emr-header-content clear" shape="isShow" :style="isEmbeded ? { position: 'absolute', width: '100%' } : null">
      <div class="header-layout-flex">
        <div class="header-l-f-left">
          <div class="hospital">
            <div class="hos-logo">
              <img :src="require('@/assets/img/hosLogo.png')" alt="" />
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
            <TipBox tipmsg="点击查看过敏记录" :isFixed="true">
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
  computed: {
    ...inject('header'),
  },
  created() {
    
  },
  methods: {
    showModal() {
      handleEvent(this.handleClick)
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
