
var splitChar = setting.default.splitChar;
var timeline = setting.timeline;

function setSettingStore(key) {
  var obj = {};
  var s = JSON.parse(JSON.stringify(setting[key]));
  for (var k in s) {
    obj[k] = setk(k)
  }
  
  Object.defineProperties(setting[key], obj);
  for (var k in s) {
    setting[key][k] = s[k];
  }
  
  function setk(k) {
    var value;
    return {
      get: function() {
        return value;
      },
      set: function(val) {
        value = val;
        if ('undefined' != typeof VUEX_STORE) {
          VUEX_STORE.commit(key + '_' + k, val);
        }
      }
    }
  }
}
(function() {
  setSettingStore('header');
})();