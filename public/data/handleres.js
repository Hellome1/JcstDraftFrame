var VUEX_STORE = (function () {
  var _store = null;
  function setStore(store) {
    _store = store;
  }
  function commit(key, val) {
    _store.commit(key, val);
  }
  return {
    setStore: setStore,
    commit: commit
  }
})();

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
  VUEX_STORE.commit('header_patInfo', patInfo);
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
  var userInfo = {};
  var field = FIELD.userInfo, style = TextStyle.userInfo;
  fetchField(userInfo, field, PARAM);
  addTextStyle(userInfo, style);
  VUEX_STORE.commit('header_userInfo', userInfo);
}

function header_allergyData(res) {
  Data['allergyData'] = res.data;
  VUEX_STORE.commit('header_allergyData', res.data);
}

function timeline_timelineData(res) {
  var encTimeRanges = res.data.map(function(data) {
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
        endDate: encEndDate + ' ' + encEndTime ,
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
  var firstNotNullTimeRange = encTimeRanges.filter(itm => itm)[0];
  getTimelineDays();
  // console.log('tlDatesRange', tlDatesRange);
  selectPage(1);
}

function timeline_surgeryData(res) {
  var uniqueRes = uniqueData(res.data);
  var surgeryInfo = handleSurgeryData(uniqueRes);
  jcst_setting.surgery.surgeryInfo = surgeryInfo;
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
    var surgeryInfo = data.map((itm, index) => ({
      surgeryDate: itm.operStartDate,
      count: index + 1
    }));
    return surgeryInfo;
  }
}

function vitalsigns_data(res) {
  console.log('res', res);
  bus.$emit('vitalsigns', function() {
    var items = this.itemsObj;
    var data = res.data || [];
    var checkList = [];
    var nullData = true;
    var smtz_data = {};
    var moduleTimeInfo = {};
    for (var k in data[0]) {
      var module = items[k].module;
      var data_trans = data[0][k].map(function(ele) {
        var value = ele.vitalSignMeasValue, date = ele.vitalSignMeasDate, time = ele.vitalSignMeasTime;
        return { date: date, time: time, value: value };
      });
      setVitalTimes(data_trans, module.name);
      checkList.push(module.name);
      nullData = false;
      smtz_data[module.name] = { module, data: data_trans, display: true };
    }
    this.checkList = checkList;
    this.smtz_data = smtz_data;
    this.plotPoint();
    console.log('moduleTimeInfo', moduleTimeInfo);

    function setVitalTimes(data_trans, name) {
      var dates = [];
      data_trans.map(function(itm) {
        return itm.date;
      }).sort(function(a, b) { return dayjs(a).diff(b) })
      .forEach(function(itm) {
        if (!dates.includes(itm)) dates.push(itm);
      });
      moduleTimeInfo[name] = dates;
    }
  });

}