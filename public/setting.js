var jcst_setting_default = {
  splitChar: '^',
  tipboxDefaultOffset: 30,
};
var jcst_setting = {
  layout: {
    showLiveSetting: false,
    leftW: 5, // 数字
    rightW: 19, // 数字
    leftBgColor: '#f9f9f9', // 颜色
    moduleHeadFontSize: '16px', // 字体大小
    moduleHeadColor: '#000', // 颜色
    displayModules: ['vitalsigns'] // 数组
  },
  header: {
    isShow: true, // 布尔值
    isEmbeded: true, // 由使用场景决定
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
    allergyData: [], // 数据
    handleClick: { // 事件
      'modal.dialogVisible': true,
      'modal.title': '过敏信息',
      'table.tableData': 'Data.allergyData',
      'table.column': [
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
    pages: 1,
    days: [],
    curdays: [],
    showDays: 7,
    interval: 4,
    topTimeSubTract: 0
  },
  vitalsigns: {
    title: '生命体征',
    rowHeight: 25,
    rowLine: 'dashed',
    columnLine: 'solid',
    items: [
      {
        name: 'pulse',
        desc: ['setting.modules.vitalSigns.items[0].desc[0]'],
        color: '#FF6A50',
        startRow: 1,
        startValue: 0,
        endValue: 200,
        interval: 20
      },
      {
        name: 'breathe',
        desc: ['setting.modules.vitalSigns.items[1].desc[0]'],
        color: '#FF9C00',
        startRow: 2,
        startValue: 15,
        endValue: 60,
        interval: 5
      },
      {
        name: 'temperature',
        desc: ['setting.modules.vitalSigns.items[2].desc[0]', 'setting.modules.vitalSigns.items[2].desc[1]'],
        color: '#2AB66A',
        startRow: 1,
        startValue: 34,
        endValue: 42,
        interval: 1
      }
    ]
  },
  surgery: {
    surgeryInfo: []
  }
}

function handleEvent(obj) {
  var jsonObj = JSON.parse(JSON.stringify(obj));
  console.log('setting.js 85', jsonObj);
  for (var k in jsonObj) {
    var keys = k.split('.'), val = jsonObj[k];
    if (val.indexOf && val.indexOf('Data.') === 0) {
      val = Data[val.split('.')[1]];
    }
    var curObj = window;
    var lastKey = keys[keys.length - 1], restKey = keys.slice(0, keys.length - 1);
    console.log(lastKey, restKey);
    restKey.forEach(function(key) {
      curObj = curObj[key]
    });
    curObj[lastKey] = val;
  }
}

var jcst_config = {
  history: {
    lastshow: ''
  },
  show: {
    basic: true,
    dataShow: false
  },
  dataShow: {},
  shape: ''
};