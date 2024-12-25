jcst.setting = {
  layout: {
    showLiveSetting: false,
    leftW: 5, // 数字
    rightW: 19, // 数字
    leftBgColor: '#f9f9f9', // 颜色
    moduleHeadFontSize: '16px', // 字体大小
    moduleHeadColor: '#000', // 颜色
    displayModules: ['vitalsigns', 'nursing', 'medicalOrder', 'pacs', 'lis', 'surgery', 'consult'] // 数组
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
      'jcst.modal.title': translate.$t('header.allergy.dialog.title'),
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
    tlSwitchShow: true,
    pages: 1, // 内部决定
    days: [], // 数据决定
    curdays: [], // 内部决定
    showDays: 7,
    interval: 4,
    topTimeSubTract: 0
  },
  vitalsigns: {
    vitalsignsTitle: translate.$t('setting.vitalSigns.title'),
    rowHeight: 25,
    rowLine: 'dashed',
    columnLine: 'solid',
    vitalsignsItems: [ // 不开放配置
      {
        name: 'pulse',
        desc: ['setting.vitalSigns.items[0].desc[0]'],
        color: '#FF6A50',
        startValue: 0,
        endValue: 200,
        interval: 20
      },
      {
        name: 'breathe',
        desc: ['setting.vitalSigns.items[1].desc[0]'],
        color: '#FF9C00',
        startValue: 15,
        endValue: 60,
        interval: 5
      },
      {
        name: 'temperature',
        desc: ['setting.vitalSigns.items[2].desc[0]', 'setting.vitalSigns.items[2].desc[1]'],
        color: '#2AB66A',
        startValue: 34,
        endValue: 42,
        interval: 1
      }
    ]
  },
  nursing: {
    nursingTitle: translate.$t('setting.nursing.title'),
    showAllItems: false
  },
  medicalOrder: {
    medicalOrderTitle: translate.$t('setting.medicalOrder.title'),
    name: 'orderName',
    date: 'orderDate',
    time: 'orderTime',
    stopDate: 'ordStopDate',
    classifyKey: 'ordPriCode',
    labelConfig: {
      isDetail: true
    },
    TDlineConfig: {
      title: '{medUsageDesc} {medFreqDesc}',
      stopDate: 'ordStopDate',
      stopTime: 'ordStopTime'
    }
  },
  pacs: {
    pacsTitle: translate.$t('setting.pacs.title'),
    name: 'examItemName',
    // date: 'examDate',
    // time: 'examTime',
    date: 'examAppDate',
    time: 'examAppTime',
    leftKey: 'examDeptName',
    noClassifyText: 'setting.lis.noClassifyText',
    labelConfig: {
      isDetail: true
    },
    labelClick: {
      'jcst.modal.dialogVisible': true,
      'jcst.modal.path': 'pages/Pacs/PacsPop/index.vue',
      'jcst.modal.title': '检查报告'
    },
  },
  lis: {
    lisTitle: translate.$t('setting.lis.title'),
    name: 'orderName', // 必选，data中标签显示内容的key
    // date: 'inspectionDate',
    // time: 'inspectionTime',
    date: 'inspAppDate',
    time: 'inspAppTime',
    leftKey: 'inspRptDeptName',
    noClassifyText: 'setting.lis.noClassifyText',
    labelConfig: {
      isDetail: true,
      pStyle: {
        textAlign: 'center'
      }
    },
    labelClick: {
      'jcst.modal.dialogVisible': true,
      'jcst.modal.path': 'pages/Lis/LisPop/index.vue',
      'jcst.modal.title': translate.$t('setting.lis.reportTitle'),
      'jcst.table.post.action': 'MES0023',
      'jcst.table.post.from': 'lisnorm',
      'jcst.table.handleClick': 'presetEventFn.handleLisnormRowClick',
      'jcst.table.column': [
        {
          prop: 'inspItemDesc',
          label: translate.$t('setting.lis.lisNormGrid.inspItemDesc')
        },
        {
          prop: 'inspectionValue',
          label: translate.$t('setting.lis.lisNormGrid.inspectionValue')
        },
        {
          prop: 'inspResultUnitCode',
          label: translate.$t('setting.lis.lisNormGrid.inspResultUnitCode')
        },
        {
          prop: 'inspResultRange',
          label: translate.$t('setting.lis.lisNormGrid.inspResultRange')
        },
        {
          prop: 'inspAbnoFlag',
          label: translate.$t('setting.lis.lisNormGrid.inspAbnoFlag'),
          rule: tableRules.rule1
        }
      ]
    },
    clickedLisnormRow: null
  },
  surgery: {
    surgeryTitle: translate.$t('setting.surgery.title'),
    surgeryData: [],
    surgeryInfo: [],
    name: 'preOperDiagRemark',
    date: 'operStartDate',
    labelConfig: {
      isDetail: true,
      pStyle: {
        color: 'white',
        backgroundColor: '#7bb5d9',
        border: '1px solid #7bb5d9',
        textAlign: 'center'
      }
    },
    labelClick: {
      'jcst.modal.dialogVisible': true,
      'jcst.modal.path': 'pages/Surgery/SurgeryPop/index.vue',
      'jcst.modal.title': translate.$t('surgery.dialog.title')
    }
  },
  consult: {
    consultTitle: translate.$t('setting.consult.title'),
    name: '{ecrUserDesc} {ecrDate} {ecrTime} {ecPurpose}',
    date: 'ecrDate',
    time: 'ecrTime',
    leftKey: 'ecrLocDesc',
    noClassifyText: 'setting.consult.noClassifyText',
    labelConfig: {
      isDetail: true
    }
  }
};

function handleEvent(obj) {
  var jsonObj = JSON.parse(JSON.stringify(obj));
  console.log('[setting.js 217] handleEvent:', jsonObj);
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
  // console.log('getJcstValue', lastKey, restKey);
  restKey.forEach(function (key) {
    curObj = curObj[key]
  });
  return curObj[lastKey];
}

function setJcstValue(keys, val) {
  var curObj = window;
  var lastKey = keys[keys.length - 1], restKey = keys.slice(0, keys.length - 1);
  // console.log('setJcstValue', lastKey, restKey);
  restKey.forEach(function (key) {
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