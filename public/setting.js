var tipbox = {
  style: { left: '100px', top: '150px' },
  text: '',
  fns: [
    '左键点击实现功能'
  ]
};
var modal = {
  dialogVisible: false,
  title: '提示',
  width: '80%',
  path: 'components/Table/index.vue',
};
var table = {
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
var setting = {
  default: {
    splitChar: '^',
    tipboxDefaultOffset: 30,
  },
  layout: {
    showLiveSetting: false,
    leftW: 5,
    rightW: 19,
    leftBgColor: '#f9f9f9',
    moduleHeadFontSize: '16px',
    moduleHeadColor: '#000',
    displayModules: ['vitalsigns']
  },
  // modal: {
  //   dialogVisible: false,
  //   title: '提示',
  //   width: '80%',
  //   path: 'components/Table/index.vue',
  // },
  table: {
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
  },
  header: {
    isShow: true,
    isEmbeded: true,
    product: {
      type: 'text',
      text: 'iMedical PatView',
      style: {}
    },
    hosName: {
      type: 'text',
      text: translate.$t('setting.header.hosName'),
      style: {}
    },
    patInfo: {},
    userInfo: {},
    allergyData: [],
    handleClick: {
      'modal.dialogVisible': true,
      'modal.title': '过敏信息',
      'setting.table.tableData': 'Data.allergyData',
      'setting.table.column': [
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
  surgery: {
    surgeryInfo: []
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