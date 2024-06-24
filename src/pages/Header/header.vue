<template>
  <div class="emr-header">
    <div class="emr-header-content clear" :style="isEmbeded ? { position: 'absolute', width: '100%' } : null">
      <div class="header-layout-flex">
        <div class="header-l-f-left">
          <div class="hospital">
            <div class="hos-logo">
              <img :src="require('@/assets/img/hosLogo.png')" alt="" />
            </div>
            <div class="hos-right">
              <div class="product">
                <Txt :txtstyle="product.style">{{ product.text }}</Txt>
              </div>
              <div class="hos-name">
                <Txt :txtstyle="hosName.style">{{ hosName.text }}</Txt>
              </div>
            </div>
          </div>
          <div class="patient-info">
            <TipBox tipmsg="点击查看过敏记录" :isFixed="true">
              <i v-if="allergyData.length" class="fa fa-street-view" style="color: #ff5d5d; cursor: pointer" @click="showModal"></i>
            </TipBox>
            <Txt :txtstyle="stl(patInfo.name)">{{ txt(patInfo.name) }}</Txt>
            <Txt :txtstyle="stl(patInfo.gender)">{{ txt(patInfo.gender) }}</Txt>
            <Txt :txtstyle="stl(patInfo.birth)">{{ txt(patInfo.birth) }}</Txt>
            <Txt :txtstyle="stl(patInfo.hosReg)">{{ txt(patInfo.hosReg) }}</Txt>
          </div>
        </div>
        <!-- <div class="header-l-f-center"></div> -->
        <div class="header-l-f-right">
          <div class="user-info">
            <p>
              <Txt class="user-name" :txtstyle="stl(userInfo.name)">{{ txt(userInfo.name) }}</Txt>
              <Txt class="user-group" :txtstyle="stl(userInfo.group)">{{ txt(userInfo.group) }}</Txt>
            </p>
            <p>
              <Txt class="user-dept" :txtstyle="stl(userInfo.dept)">{{ txt(userInfo.dept) }}</Txt>
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
      handleEvent(this.header.handleClick)
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
