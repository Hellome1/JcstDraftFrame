
var setting = {
  default: {
    splitChar: '^'
  },
  modal: {
    dialogVisible: false,
    title: '提示',
    width: '80%',
    path: 'components/Table/index.vue',
  },
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
    isEmbeded: false,
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
      'setting.modal.dialogVisible': true,
      'setting.modal.title': '过敏信息',
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
    pages: 1,
    days: [],
    curdays: [],
    showDays: 7,
    interval: 4,
    leftW: 5,
    rightW: 19,
    topTimeSubTract: 0
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