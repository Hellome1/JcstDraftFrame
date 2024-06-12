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