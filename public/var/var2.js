jcst.default = {
  splitChar: '^',
  tipboxDefaultOffset: 30,
};
var jcst_splitChar = jcst.default.splitChar;
var jcst_layout = jcst.setting.layout;
var jcst_timeline = jcst.setting.timeline;

var smtzfield;
(function () {
  try {
    var smtzfield_raw;
    var testData = JCSTTestData['vitalsignsDict'];
    if (!testData) {
      smtzfield_raw = 'undefined' != typeof INDEXInitconfigdata && INDEXInitconfigdata.Smtz.info || getSMTZField() || {};
    }
    var records = handleRepeat(testData && testData.data || smtzfield_raw.data.records);
    console.log('[vitalsigns dict] records:', records);
    smtzfield = { data: records };
  } catch (err) {
    smtzfield = {};
    throw err;
  }

  function getSMTZField() {
    var serverResponse;
    var url = setting_MS_URL + 'vital/dict/list';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); //第三个参数是否异步
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var headers = axiosSetting.headers;
    for (var k in headers) {
      xhr.setRequestHeader(k, headers[k]);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        serverResponse = JSON.parse(xhr.response);
      }
    };
    xhr.send();
    return serverResponse;
  }
  function handleRepeat(records) {
    var vitalCodes = [];
    return records.filter(function (record) { return !vitalCodes.includes(record['vitalCode']) && vitalCodes.push(record['vitalCode']); })
  }
})();