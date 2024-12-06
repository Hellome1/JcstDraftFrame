jcst.setting = {
  layout: { // 布局
    leftW: 5, // 左侧布局宽度
    rightW: 19, // 右侧布局宽度 [leftW + rightW = 24]
    moduleHeadFontSize: '16px', // 模块标题字体大小 不超过24px
    displayModules: ['vitalsigns', 'pacs', 'lis', 'surgery'] // 显示模块
  },
  timeline: { // 时间轴
    showDays: 7, // 一页展示天数
    interval: 4, // 每几小时展示一个时间刻度
    topTimeSubTract: 0 // 时间刻度减少值
  },
  vitalsigns: { // 生命体征
    vitalsignsItems: [ // json
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
    ],
    vitalsigns_data: function (res) { // 数据处理
      console.log('[vitalsigns res] res', res);
      bus.$emit('vitalsigns', function () {
        var items = this.itemsObj;
        var data = res.data || [];
        var checkList = [];
        var nullData = true;
        var smtz_data = {};
        for (var k in data[0]) {
          var module = items[k].module;
          var data_trans = data[0][k].map(function (ele) {
            var value = ele.vitalSignMeasValue, date = ele.vitalSignMeasDate, time = ele.vitalSignMeasTime;
            return { date: date, time: time, value: value };
          });
          setVitalTimes(data_trans, module.name);
          checkList.push(module.name);
          nullData = false;
          smtz_data[module.name] = { module: module, data: data_trans, display: true };
        }
        this.checkList = checkList;
        this.smtz_data = smtz_data;
        this.plotPoint();
        console.log('[vitalsigns res] moduleTimeInfo', moduleTimeInfo);
      });
    }
  },
  nursing: { // 护理信息,
    showAllItems: false, // 是否显示所有的护理项 [默认只显示有数据的项]
    nursing_data: function (res) { // 数据处理
      console.log('nursing_data', res);
      bus.$emit('nursing', function() {
        this.data = res && res.data && res.data[0] || {};
        console.log('this.nursing_data', this.cp(this.data));
        this.handleData();
      })
    }
  },
  medicalOrder: { // 用药医嘱
    name: 'orderName', // 用药医嘱名称依据
    date: 'orderDate', // 用药医嘱时间依据-日期
    time: 'orderTime', // 用药医嘱时间依据-时刻
    stopDate: 'ordStopDate', // 用药医嘱(长期)时间依据-停止日期
    stopTime: 'ordStopTime', // 用药医嘱(长期)时间依据-停止时刻
    classifyKey: 'ordPriCode', // 用药医嘱分类依据
    labelColor: '#59b272', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }], // 标签文字对齐方式 默认居中
    TDlineTitle: '{medUsageDesc} {medFreqDesc}', // 甘特图标题部分组成格式
  },
  pacs: { // 检查
    name: 'examItemName', // 检查名称依据
    date: 'examAppDate', // 检查时间依据-日期
    time: 'examAppTime', // 检查时间依据-时刻
    leftKey: 'examDeptName', // 检查科室分类依据
    labelColor: '#59b272', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }] // 标签文字对齐方式 默认居中
  },
  lis: { // 检验
    name: 'orderName', // 检验名称依据
    date: 'inspAppDate', // 检验时间依据-日期
    time: 'inspAppTime', // 检验时间依据-时刻
    leftKey: 'inspRptDeptName', // 检验科室分类依据
    labelColor: '#59b272', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }], // 标签文字对齐方式 默认居中
    abnoFlagRep: [ // 检验指标异常标志替换
      ['H|↑', 'PH|↑↑↑'],
      ['L|↓', 'PL|↓↓↓']
    ]
  },
  surgery: { // 手术
    name: 'preOperDiagRemark', // 手术名称依据
    date: 'operStartDate', // 手术日期依据
    labelColor: '#7bb5d9', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }] // 标签文字对齐方式 默认居中
  },
  consult: { // 会诊
    name: '{ecrUserDesc} {ecrDate} {ecrTime} {ecPurpose}', // 会诊名称依据
    date: 'ecrDate', // 会诊时间依据-日期
    time: 'ecrTime', // 会诊时间依据-时刻
    leftKey: 'ecrLocDesc', // 会诊地点分类依据
    labelColor: '#59b272', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }] // 标签文字对齐方式 默认居中
  }
};