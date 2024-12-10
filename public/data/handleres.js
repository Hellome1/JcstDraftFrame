TextStyle.patInfo = {
  name: {},
  gender: {},
  birth: {},
  hosReg: {}
}
DATAFORMAT.patInfo = {
  "name": "汤全林",
  "gender": "女",
  "birth": "1939-07-17",
  "hosReg": "07208561"
}
FIELD.patInfo = {
  name: 'patientName',
  gender: 'patGenderDesc',
  birth: 'patBirthDate',
  hosReg: 'hosPatRegNo'
}
function header_patInfo(res) {
  var patInfo = {};
  var field = FIELD.patInfo, style = TextStyle.patInfo;
  fetchField(patInfo, field, res.data && res.data[0] || {})
  addTextStyle(patInfo, style);
  jcst.setting.header.patInfo = patInfo;
}

TextStyle.userInfo = {
  name: {},
  group: {
    display: 'inline-block',
    minWidth: '50px',
    marginLeft: '15px'
  },
  dept: {}
}
DATAFORMAT.userInfo = {
  name: 'admin',
  group: '管理员',
  dept: '临床数据中心'
}
FIELD.userInfo = {
  name: 'userName',
  group: 'MSRole',
  dept: 'Dept'
}
function header_userInfo() {
  // var userInfo = {};
  var userInfo = {
	  name: '测试用户',
	  group: '研发人员',
	  dept: '正在使用测试用户'
  };
  var field = FIELD.userInfo, style = TextStyle.userInfo;
  fetchField(userInfo, field, PARAM);
  addTextStyle(userInfo, style);
  jcst.setting.header.userInfo = userInfo;
}

function header_allergyData(res) {
  if (res && res.data) {
    Data['allergyData'] = res.data;
    jcst.setting.header.allergyData = res.data;
  }
}

function timeline_timelineData(res) {
  var encTimeRanges = res.data.map(function (data) {
    var encStartDate = data.encStartDate || '',
      encStartTime = data.encStartTime || '',
      encEndDate = data.encEndDate || '',
      encEndTime = data.encEndTime || '',
      encTypeCode = data.encTypeCode || '';
    if (encStartDate) {
      if (!encEndDate) encEndDate = getToday();
      if (!encEndTime) encEndTime = '23:59:59';
      if (encTypeCode != 'I') {
        encEndDate = encStartDate;
        encEndTime = '23:59:59';
      }
      encStartDate = encStartDate.split(' ')[0];
      encEndDate = encEndDate.split(' ')[0];
      return {
        startDate: encStartDate + ' ' + encStartTime,
        endDate: encEndDate + ' ' + encEndTime,
        encStartDate: encStartDate,
        encEndDate: encEndDate,
        encTypeCode: encTypeCode
      };
    } else {
      ElementUI.Message({
        showClose: true,
        message: 'MES0002接口数据就诊开始日期(encStartDate)必须存在！！！',
        type: 'error',
        duration: 0
      });
      return null;
    }
  });
  Data.encTimeRanges = encTimeRanges;
  var firstNotNullTimeRange = encTimeRanges.filter(function (itm) { return itm })[0];
  getTimelineDays();
  // console.log('tlDatesRange', tlDatesRange);
  selectPage(1);
}

function timeline_surgeryData(res) {
  var uniqueRes = uniqueData(res.data);
  jcst.setting.surgery.surgeryData = uniqueRes;
  var surgeryInfo = handleSurgeryData(uniqueRes);
  jcst.setting.surgery.surgeryInfo = surgeryInfo;
  if (surgeryInfo.length) moduleTimeInfo['surgery'] = { 0: surgeryInfo.map(function(itm) { return itm.surgeryDate }) };
  getTimelineDays();

  function uniqueData(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      // 判断是否重复，若没有重复则push
      var pushFlag = true;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].diagnoseName == data[i].diagnoseName && arr[j].diagnoseDate == data[i].diagnoseDate) pushFlag = false;
      }
      if (pushFlag) arr.push(data[i]);
    }

    return arr;
  }
  function handleSurgeryData(data) {
    var surgeryInfo = data.map(function (itm, index) {
      return {
        surgeryDate: itm.operStartDate,
        count: index + 1
      }
    });
    return surgeryInfo;
  }
}

function vitalsigns_data(res) {
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
function setVitalTimes(data_trans, name) {
  var dates = [];
  data_trans.map(function (itm) {
    return itm.date;
  }).sort(function (a, b) { return dayjs(a).diff(b) })
    .forEach(function (itm) {
      if (!dates.includes(itm)) dates.push(itm);
    });
  let timeinfo = JSON.parse(JSON.stringify(moduleTimeInfo['vitalsigns']));
  timeinfo[name] = dates;
  moduleTimeInfo['vitalsigns'] = timeinfo;
}

function nursing_data(res) {
  console.log('nursing_data', res);
  bus.$emit('nursing', function() {
    var datekey = 'vitalSignMeasDate', timekey = 'vitalSignMeasTime', vkey = 'vitalSignMeasValue';
    var data = res && res.data && res.data[0] || {};
    var ssdata = [], ssdatakey, szdata, szdatakey;
    for (var k in data) {
      var itm = data[k];
      var desc = itm[0] && itm[0].vitalSignMeasItemDesc || '';
      if (desc.indexOf('收缩压') > -1) ssdata = itm, ssdatakey = k;
      if (desc.indexOf('舒张压') > -1) szdata = itm, szdatakey = k;
      itm.sort(function(a, b) {
        var at = a[datekey] + ' ' + a[timekey],
          bt = b[datekey] + ' ' + b[timekey];
        return dayjs(at).diff(bt);
      });
    }
    if (szdata) {
      var modify_desc = '收缩压/舒张压';
      this.nursingItems[ssdatakey].desc = modify_desc;
      delete data[szdatakey];
      ssdata.forEach(function(itm) {
        itm.vitalSignMeasItemDesc = modify_desc;
        var szitm = szdata.filter(function(sz) { 
          return itm[datekey] === sz[datekey] && itm[timekey] === sz[timekey];
        });
        var szitmValue = szitm.length && szitm[0][vkey] || '';
        if (szitmValue) itm[vkey] = itm[vkey] + '/' + szitmValue;
      });
    }
    for (var k in data) {
      data[k].forEach(function(v) {
        v[vkey] = '[' + v[timekey] + '] ' + v[vkey];
      });
    }
    this.data = data;
    console.log('[handleres.js 180] this.nursing_data:', this.cp(this.data));
    this.handleData();
  })
}

function pacs_data(res) {
  console.log('[pacs res] pacs_data_res', res);
  var data = JSON.parse(JSON.stringify(res.data));
  jcst.datas['pacs'] = data;

  bus.$emit('pacs', function() {
    this.resdata = data;
  });
  bus.$emit('pacspop', function() {
    this.datas = data;
  });
}

function lis_data(res) {
  console.log('[lis res] lis_data_res', res);

  bus.$emit('lis', function() {
    this.resdata = JSON.parse(JSON.stringify(res.data));
  });
}

function ajax_data(res) {
  console.log(res);
  if (res.data) {
    jcst.table.tableData = res.data;
  }
}

function surgery_data_detail(res) {
  bus.$emit('surgeryPop', function() {
    this.surgeryDetail = res && res.data && res.data[0] || {};
  });
}

function consult_data(res) {
  bus.$emit('consult', function() {
    this.loading = false;
    var data = res && res.data;
    if (data) {
      this.datas = data;
      this.setDept(data);
      moduleTimeInfo['consult'] = {
        0: [data[0][this.date]]
      }
    }
  });
}

function medicalOrder_data(res) {
  console.log('medicalOrder_data', res);
  bus.$emit('medicalOrder', function() {
    var items = [];
    res && res.data && res.data.forEach(function(itm) {
      var code = itm.ordPriCode, desc = itm.ordPriDesc;
      var isLong = desc.indexOf('长期') > -1;
      var obj = {
        codes: [ code ],
        code: code,
        desc: desc,
        isLong: isLong,
        display: isLong ? 'line' : 'list'
      };
      var inItem = items.filter(function(nitm) { return nitm.desc === desc; })[0];
      if (inItem) {
        if (!inItem.codes.includes(code)) inItem.codes.push(code);
      } else {
        items.push(obj);
      }
    });

    if (res && res.data && res.data[0]) {
      moduleTimeInfo['medicalOrder'] = {
        0: [res.data[0][this.date]]
      }
    }
    this.items = items;
    this.datas = this.handleData(res.data);
  })
}