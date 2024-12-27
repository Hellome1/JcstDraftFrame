<template>
  <div class="tl-switch" ref="root" >
    <div class="tl-list-control">
      <span @click="showList = !showList">切换就诊</span>
    </div>

    <div class="tl-enc-list" v-show="showList">
      <div class="enc-type-select" ref="typeSelect">
        <span 
          v-for="(t, i) in encTypes" 
          :key="i" 
          class="enc-type-item" 
          :class="t.type"
          :style="t.type != 'placeholder' && { cursor: 'pointer' }"
          @click="t.type != 'placeholder' && handleCheck(t.type)"
        >
          <span class="circle" :style="{ backgroundColor: selectedEncTypes.includes(t.type) ? t.backgroundColor : 'white', borderColor: t.borderColor }"></span>
          <span class="desc">{{ t.desc }}</span>
        </span>
      </div>
      <ul 
        ref="ul"
      >
        <li 
          class="tls-item" 
          :class="t.check ? 'check' : ''" 
          v-for="(t, i) in tls" 
          :style="t.style || {}" 
          :key="i"
          @click="handleClick(t)"
        >{{ t.desc }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getVisitAll } from '@/server/api.js';

export default {
  name: 'tlSwitch',
  data() {
    return {
      rawtls: [],
      encTypes: [],
      selectedEncTypes: [],
      showList: false
    };
  },
  watch: {
    
  },
  computed: {
    tls() {
      return this.rawtls.filter(itm => this.selectedEncTypes.includes(itm.type));
    }
  },
  created() {
    getVisitAll({ from: 'tlSwitch', hdcEncId: '' });
    bus.$on('tlSwitch', cb => cb && cb.call(this));
  },
  methods: {
    getVisitAll() {
      getVisitAll({ from: 'tlSwitch', hdcEncId: '' });
    },
    handleCheck(type) {
      let selectedEncTypes = this.selectedEncTypes;
      console.log(selectedEncTypes, type);
      if (selectedEncTypes.includes(type)) {
        selectedEncTypes = selectedEncTypes.filter(itm => itm != type);
      } else {
        selectedEncTypes.push(type);
      }
      this.selectedEncTypes = selectedEncTypes;
    },
    handleClick(itm) {
      console.log('itm', this.cp(itm));
      let hdcEncId = itm.hdcEncId || '';
      changeSearchAndOpenSelf('hdcEncId', hdcEncId);
    }
  }
}
</script>

<style lang="scss">
.tl-switch{
  width: 100%;
  position: relative;
  user-select: none;
  
  .tl-list-control {
    position: absolute;
    top: -1px;
    right: -1px;
    padding: 1px 8px;
    font-size: 12px;
    border-radius: 3px;
    color: white;
    background-color: rgb(65, 173, 240);
    z-index: 999;
    cursor: pointer;
    span {
      line-height: 14px;
    }
    &:hover {
      background-color: rgb(48, 151, 216);
    }
  }
  .tl-enc-list {
    position: absolute;
    top: 16px;
    right: -1px;
    z-index: 1;
    border: 1px solid #eee;
    background-color: white;
    .enc-type-select {
      width: 100px;
      padding: 0 8px;
      border: 2px solid rgb(0, 13, 201);
      display: flex;
      justify-content: space-between;
      .enc-type-item {
        font-size: 0;
        flex: 1;
        &:hover {
          .desc {
            color: #3483df;
          }
        }
        .circle {
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 2px solid red;
          border-radius: 50%;
          background-color: white;
          vertical-align: sub;
        }
        .desc {
          font-size: 12px;
        }
      }
    }
    ul {
      max-height: 300px;
      overflow: auto;
      &::after {
        content: '';
        display: block;
        clear: both;
      }
      .tls-item {
        font-size: 12px;
        width: 100px;
        padding: 0px 8px;
        border: 2px solid pink;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        &:hover {
          color: #3483df;
        }
      }
      .tls-item.check::before {
        content: '';
        position: absolute;
        right: 0px;
        bottom: 0;
        border-width: 6px;
        border-style: solid;
        border-color: inherit;
        border-top: 6px solid transparent;
        border-left: 6px solid transparent;
      }
      .tls-item.check::after {
        content: '√';
        font-size: 7px;
        color: white;
        position: absolute;
        right: 1px;
        bottom: -1px;
      }
    }
  }
}
</style>