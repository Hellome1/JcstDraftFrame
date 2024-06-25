<template>
  <div class="live-s-item">
    <h3>布局</h3>
    <div class="live-s-main">
      <label>左侧宽度</label><el-input type="number" v-model="i_leftW"></el-input>
      <label>右侧宽度</label><el-input type="number" v-model="i_rightW"></el-input>
      <label>左侧背景颜色</label><el-color-picker v-model="i_leftBgColor"></el-color-picker>
      <br>
      <label>模块头部字体大小</label><el-input type="text" v-model="i_moduleHeadFontSize"></el-input>
      <label>模块头部字体颜色</label><el-color-picker v-model="i_moduleHeadColor"></el-color-picker>
      <br>
      <label>展示模块</label><ShowModules/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>