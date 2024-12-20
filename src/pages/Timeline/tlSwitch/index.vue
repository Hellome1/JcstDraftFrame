<template>
  <div class="tl-switch" ref="root" @mousewheel.prevent="handleMouseWheel" >
    <div class="tls-scroll-tip">
      <div class="tls-stip-prev" v-show="stipPrev"></div>
      <ul 
        ref="ul"
        :style="{ transform: 'translateX(' + translate + 'px)', width: ulWidth + 'px' }"
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
      <div class="tls-stip-after" v-show="stipAfter"></div>
    </div>
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
  </div>
</template>

<script>
import { getVisitAll } from '@/server/api.js';
let rootDom = null;
let rootWidth = 0, typeSelectWidth = 120, everyItmWidth = 120;

window.addEventListener('resize', () => { 
  if (rootDom) rootWidth = rootDom.offsetWidth; 
});

const getMaxLeft = (width) => {
  let maxLeft = 0;
  let showWidth = rootWidth - typeSelectWidth;
  maxLeft = showWidth - width;
  if (maxLeft > 0) maxLeft = 0;
  return maxLeft;
}

export default {
  name: 'tlSwitch',
  data() {
    return {
      rawtls: [],
      encTypes: [],
      selectedEncTypes: [],
      translate: 0
    };
  },
  watch: {
    
  },
  computed: {
    tls() {
      return this.rawtls.filter(itm => this.selectedEncTypes.includes(itm.type));
    },
    ulWidth() {
      return this.tls.length * everyItmWidth;
    },
    stipPrev() {
      return this.translate != 0;
    },
    stipAfter() {
      let root = this.$refs.root;
      let targetNum = -10;
      if (root) {
        let showWidth = (root.offsetWidth - typeSelectWidth)
        targetNum = showWidth - this.ulWidth;
      }
      return targetNum < 0 && this.translate != targetNum;
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
      // console.log('selectedEncType before:', selectedEncTypes);
      if (selectedEncTypes.includes(type)) {
        selectedEncTypes = selectedEncTypes.filter(itm => itm != type);
      } else {
        selectedEncTypes.push(type);
      }
      // console.log('selectedEncType after:', selectedEncTypes);
      this.selectedEncTypes = selectedEncTypes;
      var checkIndex = -1;
      this.tls.forEach((itm, index) => {
        if (itm.check) checkIndex = index;
      });
      this.fixToCheck(checkIndex);
    },
    handleClick(itm) {
      console.log('itm', this.cp(itm));
      let hdcEncId = itm.hdcEncId || '';
      changeSearchAndOpenSelf('hdcEncId', hdcEncId);
    },
    getDomWidth() {
      let { root } = this.$refs;
      if (root && root.offsetWidth) {
        // console.log('getDomWidth', root, root.offsetWidth);
        rootDom = root;
        rootWidth = root.offsetWidth;
        var checkIndex = -1;
        this.rawtls.forEach((itm, index) => {
          if (itm.check) checkIndex = index;
        });
        this.fixToCheck(checkIndex);
      }
    },
    handleMouseWheel(e) {
      console.log('e wheelDelta', e.wheelDelta);
      let wheelDelta = e.wheelDelta;
      let translate = this.translate;
      let maxLeft = getMaxLeft(this.ulWidth);
      translate += wheelDelta;
      translate = translate >= 0 ? 0 :
        translate <= maxLeft ? maxLeft : translate;
      // console.log('translate', translate);
      this.translate = translate;
    },
    fixToCheck(index) {
      if (index === -1) {
        this.translate = 0;
        return;
      }
      let showRange = rootWidth - typeSelectWidth;
      let checkPos = index * everyItmWidth;
      let diff = checkPos + everyItmWidth - showRange;
      let maxLeft = getMaxLeft(this.ulWidth);
      if (diff > 0) {
        if (diff + everyItmWidth + maxLeft < 0) { // 增加一个身位
          this.translate = -(diff + everyItmWidth);
        } else {
          this.translate = -diff;
        }
      } else {
        this.translate = 0;
      }
    }
  }
}
</script>

<style lang="scss">
.tl-switch{
  background-color: white;
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
  .tls-scroll-tip {
    position: relative;
    .tls-stip-prev {
      width: 20px;
      height: 100%;
      background: linear-gradient(to right, rgba(100, 100, 100, 1), rgba(100, 100, 100, 0.1));
      position: absolute;
      left: 0;
      top: 0;
    }
    .tls-stip-after {
      width: 20px;
      height: 100%;
      background: linear-gradient(to left, rgba(100, 100, 100, 1), rgba(100, 100, 100, 0.1));
      position: absolute;
      right: 120px;
      top: 0;
    }
    ul {
      // width: 3000px;
      overflow: hidden;
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
        float: left;
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
  .enc-type-select {
    position: absolute;
    background-color: white;
    width: 100px;
    right: 0;
    top: 0;
    padding: 0 8px;
    border: 2px solid rgb(255, 215, 154);
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
}
</style>