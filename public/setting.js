jcst.setting = {
  layout: {
    showLiveSetting: false,
    leftW: 5, // 数字
    rightW: 19, // 数字
    leftBgColor: '#f9f9f9', // 颜色
    moduleHeadFontSize: '16px', // 字体大小
    moduleHeadColor: '#000', // 颜色
    displayModules: ['vitalsigns', 'pacs', 'lis'] // 数组
  },
  header: {
    isShow: true, // 布尔值
    isEmbeded: isInEMRView, // 由使用场景决定
    product: { // 文字
      type: 'text',
      text: 'iMedical PatView',
      style: {}
    },
    hosName: { // 文字
      type: 'text',
      text: translate.$t('setting.header.hosName'),
      style: {}
    },
    patInfo: {}, // 文字
    userInfo: {}, // 文字
    allergyIcon: 'street-view',
    allergyData: [], // 数据
    handleClick: { // 事件
      'jcst.modal.dialogVisible': true,
      'jcst.modal.title': '过敏信息',
      'jcst.modal.path': 'components/Table/index.vue',
      'jcst.table.tableData': 'Data.allergyData',
      'jcst.table.column': [
        {
          prop: 'allerSourceDesc',
          label: translate.$t('header.allergy.th.sourceDesc'),
          width: '300'
        },
        {
          prop: 'allergyDate',
          label: translate.$t('header.allergy.th.dateOfAccident'),
          width: '120'
        },
        {
          prop: 'allerTypeDesc',
          label: translate.$t('header.allergy.th.category'),
          width: '100'
        },
        {
          prop: 'allerReacDesc',
          label: translate.$t('header.allergy.th.anaphylaxis')
        }
      ]
    }
  },
  timeline: {
    iconShow: true,
    pages: 1, // 内部决定
    days: [], // 数据决定
    curdays: [], // 内部决定
    showDays: 7,
    interval: 4,
    topTimeSubTract: 0
  },
  vitalsigns: {
    vitalsignsTitle: '生命体征',
    rowHeight: 25,
    rowLine: 'dashed',
    columnLine: 'solid',
    vitalsignsItems: [ // 不开放配置
      {
        name: 'pulse',
        desc: ['setting.modules.vitalSigns.items[0].desc[0]'],
        color: '#FF6A50',
        startValue: 0,
        endValue: 200,
        interval: 20
      },
      {
        name: 'breathe',
        desc: ['setting.modules.vitalSigns.items[1].desc[0]'],
        color: '#FF9C00',
        startValue: 15,
        endValue: 60,
        interval: 5
      },
      {
        name: 'temperature',
        desc: ['setting.modules.vitalSigns.items[2].desc[0]', 'setting.modules.vitalSigns.items[2].desc[1]'],
        color: '#2AB66A',
        startValue: 34,
        endValue: 42,
        interval: 1
      }
    ]
  },
  pacs: {
    pacsTitle: '检查',
    name: 'examItemName',
    // date: 'examDate',
    // time: 'examTime',
    date: 'examAppDate',
    time: 'examAppTime',
    leftKey: 'examDeptName',
    noClassifyText: 'setting.modules.lis.noClassifyText',
    labelConfig: {
      isDetail: true
    },
    labelClick: {
      'jcst.modal.dialogVisible': true,
      'jcst.modal.path': 'components/PacsPop/index.vue',
      'jcst.modal.title': '检查报告'
    },
  },
  lis: {
    lisTitle: '检验',
    name: 'orderName', // 必选，data中标签显示内容的key
    // date: 'inspectionDate',
    // time: 'inspectionTime',
    date: 'inspAppDate',
    time: 'inspAppTime',
    leftKey: 'inspRptDeptName',
    noClassifyText: 'setting.modules.lis.noClassifyText',
    labelConfig: {
      isDetail: true,
      pStyle: {
        textAlign: 'center'
      }
    },
    labelClick: {
      'jcst.modal.dialogVisible': true,
      'jcst.modal.path': 'components/LisPop/index.vue',
      'jcst.modal.title': '检验',
      'jcst.table.post.action': 'MES0023',
      'jcst.table.column': [
        {
          prop: 'inspItemDesc',
          label: translate.$t('setting.modules.lis.lisNormGrid.inspItemDesc')
        },
        {
          prop: 'inspectionValue',
          label: translate.$t('setting.modules.lis.lisNormGrid.inspectionValue')
        },
        {
          prop: 'inspResultUnitCode',
          label: translate.$t('setting.modules.lis.lisNormGrid.inspResultUnitCode')
        },
        {
          prop: 'inspResultRange',
          label: translate.$t('setting.modules.lis.lisNormGrid.inspResultRange')
        },
        {
          prop: 'inspectionResult',
          label: translate.$t('setting.modules.lis.lisNormGrid.inspectionResult'),
          rule: tableRules.rule1
        }
      ]
    },
  },
  surgery: {
    surgeryInfo: []
  }
};

function handleEvent(obj) {
  var jsonObj = JSON.parse(JSON.stringify(obj));
  console.log('setting.js 85', jsonObj);
  for (var k in jsonObj) {
    var keys = k.split('.'), val = jsonObj[k];
    if (val.indexOf && val.indexOf('Data.') === 0) {
      val = Data[val.split('.')[1]];
    }
    setJcstValue(keys, val);
  }
}

function getJcstValue(keys) {
  var curObj = window;
  var lastKey = keys[keys.length - 1], restKey = keys.slice(0, keys.length - 1);
  console.log('getJcstValue', lastKey, restKey);
  restKey.forEach(function(key) {
    curObj = curObj[key]
  });
  return curObj[lastKey];
}

function setJcstValue(keys, val) {
  var curObj = window;
  var lastKey = keys[keys.length - 1], restKey = keys.slice(0, keys.length - 1);
  console.log('setJcstValue', lastKey, restKey);
  restKey.forEach(function(key) {
    curObj = curObj[key]
  });
  curObj[lastKey] = val;
}

var jcst_config = {
  history: {
    lastshow: ''
  },
  show: {
    basic: true,
    dataShow: false,
    eventShow: false,
    itemsShow: false
  },
  dataShow: {},
  shape: '',
  eventShow: '',
  itemsShow: ''
};