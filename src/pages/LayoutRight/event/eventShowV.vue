<template>
  <div>
    <h4>事件信息</h4>
    <p>
      <span>事件类型：</span><span>{{eventType}}</span>
    </p>
    <p>
      <span>模态框标题</span><el-input type="text" v-model="modalTitle"></el-input>
    </p>
    <p>
      <span>模态框内容：</span><span>{{modalContent}}</span>
    </p>

    <h4>表格配置</h4>
    <div class="jcst-table-config">
      <div class="jcst-table-config-data-select">
        <span>数据选择</span><DataSelect name="header_allergyData"/>
      </div>
      <div style="display: flex;">
        <div>
          <p style="width: 40px;margin-right: 8px; font-weight: bold; line-height: 28px;">键值</p>
          <p style="margin-right: 8px; font-weight: bold;">表头</p>
          <p style="margin-right: 8px; font-weight: bold;">宽度</p>
        </div>
        <div style="display: flex;">
          <span v-for="c in tableColumn" :key="c.prop" style="margin-right: 8px;">
            <span style="display: flex; flex-direction: column;">
              <el-select size="mini" v-model="c.prop" placeholder="请选择" @change="handleChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <input type="text" v-model="c.label" @change="handleChange" >
              <input type="text" v-model="c.width" @change="handleChange" >
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSelect from '../select/dataSelect.vue';
import { inject } from '@/common/vuePrototypeMethods.js';
const dict = {
  'modal': '模态框'
};
const getValue = (name) => {
  let r = ['jcst', 'setting', ...name.split('_')];
  return getJcstValue(r);
}
const handleEventShow = (name) => {
  if (!name) return '';
  let value = getValue(name);
  let keys = [];
  for (let k in value) {
    let key = k.split('.')[0];
    if (!keys.includes(key)) keys.push(key);
  }
  return dict[keys[0]];
}
const getModalTitle = (name) => {
  let value = getValue(name);
  return value['jcst.modal.title'];
}
const setModalTitle = (name, title) => {
  let value = getValue(name);
  value['jcst.modal.title'] = title;
  return value;
}
const getModalContent = (name) => {
  return '表格';
}
const getTableColumn = (name) => {
  let value = getValue(name);
  let column = value['jcst.table.column'];
  return column;
}
const setTableColumn = (name, column) => {
  let value = getValue(name);
  value['jcst.table.column'] = column;
  return value;
}
const getOptions = (name) => {
  let options = [];
  let value = getValue(name);
  let tableData = value['jcst.table.tableData'];
  let key = tableData.split('.')[1];
  let obj = Data[key] && Data[key][0] || {};
  for (let k in obj) {
    options.push({
      label: k + ': ' + obj[k],
      value: k
    });
  }
  return options;
}
export default {
  name: 'eventShow',
  components: {
    DataSelect
  },
  computed: {
    ...inject('layoutRight')
  },
  created() {
    console.log('eventShow', this.eventShow);
    handleEvent(getValue(this.eventShow));
    this.eventType = handleEventShow(this.eventShow);
    this.modalTitle = getModalTitle(this.eventShow);
    this.modalContent = getModalContent(this.eventShow);
    this.tableColumn = getTableColumn(this.eventShow);
    this.options = getOptions(this.eventShow);
  },
  beforeDestroy() {
    jcst.modal.dialogVisible = false;
  },
  data() {
    return {
      eventType: '',
      modalTitle: '',
      modalContent: '',
      tableColumn: [],
      options: []
    }
  },
  watch: {
    modalTitle() {
      let v = setModalTitle(this.eventShow, this.modalTitle);
      handleEvent(v);
    }
  },
  methods: {
    handleChange() {
      console.log('111', this.cp(this.tableColumn))
      let v = setTableColumn(this.eventShow, this.cp(this.tableColumn));
      handleEvent(v);
    }
  }
}
</script>

<style>

</style>