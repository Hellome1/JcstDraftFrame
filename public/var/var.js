var isProduction = 'undefined' != typeof ms_address;
var isInEMRView = 'undefined' != typeof COMMOMOBJ;
var INIT_lang = 'zh';

var setting_MS_URL = isProduction ? ms_address + '/emr/' : 'http://43.143.230.30:8006/cdr-api/emr/',
setting_MS_HDCURL = setting_MS_URL + 'dc/',
setting_EMR_URL = setting_MS_URL + 'dc';

var axiosSetting = getAxiosSetting();

var PARAM = getParam();

var DATAFORMAT = {};

var FIELD = {};

var TextStyle = {};

var Data = {};

var jcst = {};
jcst.pageSize = {
  timelineRightWidth: 0
};
jcst.tipbox = {
  style: { left: '100px', top: '150px' },
  text: '',
  fns: [
    '左键点击实现功能'
  ]
};
jcst.modal = {
  dialogVisible: false,
  title: '提示',
  width: '80%',
  path: 'components/Table/index.vue',
};
jcst.table = {
  tableData: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
  ],
  column: [
    {
      prop: "date",
      label: "日期",
      width: "180",
    }
  ]
};