jcst.setting = {
  layout: { // 布局
    leftW: 5, // 左侧布局宽度
    rightW: 19, // 右侧布局宽度 [leftW + rightW = 24]
    moduleHeadFontSize: '16px', // 模块标题字体大小 不超过24px
    displayModules: ['vitalsigns', 'pacs', 'lis', 'surgery'] // 显示模块
  },
  header: { // 头部
    isShow: true, // 是否展示头部
  },
  timeline: { // 时间轴
    showDays: 7, // 一页展示天数
    interval: 4, // 每几小时展示一个时间刻度
    topTimeSubTract: 0 // 时间刻度减少值
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
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }] // 标签文字对齐方式 默认居中
  },
  surgery: { // 手术
    name: 'preOperDiagRemark', // 手术名称依据
    date: 'operStartDate', // 手术日期依据
    labelColor: '#7bb5d9', // 标签颜色
    labelTextAlign: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }] // 标签文字对齐方式 默认居中
  }
};