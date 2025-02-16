var isProduction = 'undefined' != typeof ms_address;
var isInEMRView = 'undefined' != typeof COMMOMOBJ;
var searchLang = getSearchByKey('lang');
var langs = ['zh', 'en'];
var INIT_lang = searchLang && langs.indexOf(searchLang) > -1 ? searchLang : 'zh';

var setting_MS_URL = isProduction ? ms_address + '/emr/' : 'http://43.143.230.30:8006/cdr-api/emr/',
setting_MS_HDCURL = setting_MS_URL + 'dc/',
setting_EMR_URL = setting_MS_URL + 'dc';

var axiosSetting = getAxiosSetting();

var PARAM = getParam();

var DATAFORMAT = {};

var FIELD = {};

var TextStyle = {};

var Data = {};

var moduleTimeInfo = {
  'vitalsigns': {},
  'medicalOrder': {},
  'pacs': {},
  'lis': {},
  'surgery': {},
  'consult': {},
  'EMR': {}
};
var Times = {};
var jcst = {};
jcst.currentClickedRow = null;
jcst.selectedRow = null;
jcst.datas = {};
jcst.pageSize = {
  timelineRightWidth: 0
};
jcst.tipbox = {
  style: { left: '100px', top: '150px' },
  offsetHeight: 0,
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
jcst.modal = {
  dialogVisible: false,
  title: '检查报告',
  width: '80%',
  path: 'pages/Pacs/PacsPop/index.vue',
};
jcst.modalTwo = {
  dialogVisible: false,
  title: '链接',
  width: '80%',
  path: 'components/Iframe/index.vue',
};
jcst.table = {
  post: {
    action: '',
    from: ''
  },
  tableData: [],
  column: [
    // {
    //   prop: "date",
    //   label: "日期",
    //   width: "180",
    // }
  ],
  handleClick: 'presetEventFn.placeholder'
};
jcst.iframe = {
  src: '',
  height: '800px'
};
var tableRules = {};
tableRules.rule1 = {
  key: 'inspAbnoFlag',
  rowColor: '#fff1f0',
  replaces: ['H|↑|0', 'L|↓|1', '↑|↑|0', '↓|↓|1'],
  cellStyles: [
    {
      color: '#e44b3b',
      fontSize: '18px',
      fontWeight: '900',
      textShadow: '1px 1px #aaa, -1px -1px #fff'
    },
    {
      color: '#3f51b5',
      fontSize: '18px',
      fontWeight: '900',
      textShadow: '1px 1px #aaa, -1px -1px #fff'
    }
  ]
  // 结果是否需要替换
  // 怎样标定为异常
  // 异常情况下的cellStyle
};
jcst.rules = {
  $1: function(h, row, rule) {
    var key = rule['key'];
    var replaces = rule['replaces'];
    var result = row[key];
    replaces.forEach(function(r) {
      var r1 = r.split('|')[0], r2 = r.split('|')[1];
      if (r2) result = result.replace(r1, r2);
    });
    return h('span', {}, result);
  },
  $2: function(row, columns) {
    var style = {};
    var ruleColumns = columns.filter(function(itm) { return itm.rule });
    ruleColumns.forEach(function(itm) {
      var rule = itm.rule;
      var key = rule['key'], rowColor = rule['rowColor'];
      var replaces = rule['replaces'];
      var tars = replaces.map(function(r) { return r.split('|')[0]; });
      var value = row[key];
      var isMatch = tars.filter(function(itm) { return value.indexOf(itm) > -1; }).length > 0;
      if (isMatch) style.backgroundColor = rowColor;
    });
    return style;
  },
  $3: function(O, columns) {
    var cellStyle = {};
    var property = O.column.property;
    var row = O.row;
    var ruleColumns = columns.filter(function(itm) { return itm.rule && itm.rule['key'] === property; });
    ruleColumns.forEach(function(itm) {
      var rule = itm.rule;
      var replaces = rule['replaces'];
      var value = row[property];
      var r = replaces.filter(function(r) { return value.indexOf(r.split('|')[0]) > -1; })[0];
      var cellStyleIndex = r && r.split('|')[2];
      if (cellStyleIndex) cellStyle = rule['cellStyles'][cellStyleIndex] || {};
    });
    return cellStyle;
  }
};

var presetEventFn = {
  placeholder: function() {
    console.log('placeholder');
  },
  handleLisnormRowClick: function(row) {
    console.log('handleLisnormRowClick', row);
    jcst.setting.lisnormHistory.showBack = true;
    jcst.setting.lisnormHistory.clickedRow = row;
    jcst.setting.lisnormHistory.selectOptionsSource = jcst.setting.lis.historySelectOptionsSource;
  }
};

var moduleFilterOptions = {
  'medicalOrder': [
    {
      value: '',
      placeholder: '医嘱大类',
      dataPropertyDesc: 'ordCatDesc',
      dataProperty: 'ordCatCode',
      options: []
    },
    {
      value: '',
      dataProperty: 'ordSubCatCode',
      dataPropertyDesc: 'ordSubCatDesc',
      placeholder: '医嘱子类',
      options: []
    }
  ],
  'pacs': [
    {
      value: '',
      placeholder: '医嘱子类',
      dataPropertyDesc: 'ordSubCatDesc',
      dataProperty: 'ordSubCatCode',
      options: []
    }
  ],
  'lis': [
    {
      value: '',
      placeholder: '申请科室',
      dataPropertyDesc: 'inspAppDeptDesc',
      dataProperty: 'inspAppDeptCode',
      options: []
    }
  ]
};

function generateModuleFilterOptions(moduleName, res) {
  if (!res.data || generateModuleFilterOptions[moduleName]) return;
  Data[moduleName] = JSON.parse(JSON.stringify(res));
  if (!generateModuleFilterOptions[moduleName]) generateModuleFilterOptions[moduleName] = true;
  var options = moduleFilterOptions[moduleName].filter(function(itm) { return !itm.type });
  options.forEach(function(itm) {
    var propertyName = itm.dataProperty;
    var descPropertyName = itm.dataPropertyDesc;
    if (propertyName && descPropertyName) {
      var options = [], codes = [];
      res.data.forEach(function(dataItm) {
        var name = dataItm[descPropertyName];
        var code = dataItm[propertyName];
        if (code && name && codes.indexOf(code) === -1) {
          codes.push(code);
          options.push({
            label: name,
            value: code
          });
        }
      });
      itm.options = options;
    }
  });
  bus.$emit('moduleFilterIndex', moduleName, function() {
    console.log('this.filterOpitions', moduleName, this.filterOptions);
    this.filterOptions = options;
  });
}

function allDataChanger(moduleName, res) {
  console.log('allDataChanger', moduleName, res);
  if (moduleName === 'medicalOrder') medicalOrder_data(res);
  else if (moduleName === 'pacs') pacs_data(res);
}