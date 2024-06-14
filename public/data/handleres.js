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
        encStartDate,
        encEndDate,
        encTypeCode
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
  console.log('res', res);

  let uniqueRes = uniqueData(res.data);
  let surgeryInfo = handleSurgeryData(uniqueRes);
  setting.surgery.surgeryInfo = surgeryInfo;
  getTimelineDays();

  function uniqueData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      // 判断是否重复，若没有重复则push
      let pushFlag = true;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].diagnoseName == data[i].diagnoseName && arr[j].diagnoseDate == data[i].diagnoseDate) pushFlag = false;
      }
      if (pushFlag) arr.push(data[i]);
    }

    return arr;
  }
  function handleSurgeryData(data) {
    let surgeryInfo = data.map((itm, index) => ({
      surgeryDate: itm.operStartDate,
      count: index + 1
    }));
    return surgeryInfo;
  }
}