function urlParams() {
  var url = window.location.search;
  if (!url) return {};
  var paramStr = url.substr(url.indexOf('?') + 1);
  var paramArr = paramStr.split('&');
  var params = {};
  for (var i = 0; i < paramArr.length; i++) {
    params[paramArr[i].split('=')[0]] = paramArr[i].split('=')[1];
  }
  return params;
}
function getParam() {
  var storage = compliantSession();
  var queryParam = urlParams();
  if (!storage) return;
  var hosCode = 'undefined' != typeof COMMOMOBJ && COMMOMOBJ.BusinessFieldCodeMore || queryParam.hosCode || storage.getItem('HospitalCode') || '00001'; //业务域
  var hosRegNo = 'undefined' != typeof COMMOMOBJ && COMMOMOBJ.HosPatientID || queryParam.hosRegNo || storage.getItem('PATHosPatientID') || storage.getItem('HosPatientID') || ''; //his登记号
  var hosEncId = 'undefined' != typeof COMMOMOBJ && COMMOMOBJ.HosVisitNumber[0] || queryParam.hosEncId || storage.getItem('HosVisitNumber') || ''; //his就诊号
  var hdcId = 'undefined' != typeof COMMOMOBJ && COMMOMOBJ.hdcPatientId || queryParam.hdcId || storage.getItem('PATPatientID') || ''; //患者主索引
  var hdcEncId = 'undefined' != typeof COMMOMOBJ && COMMOMOBJ.PatVisitNumber[0] || queryParam.hdcEncId || storage.getItem('PatVisitNumber') || ''; //平台就诊号

  var userCode = storage.getItem('UserCode') || ''; //用户工号 -> 用作session没有token登陆用
  var userName = storage.getItem('User') || ''; //用户姓名
  var MSRole = storage.getItem('MSRole') || ''; 
  var Dept = storage.getItem('Dept') || '';

  var param = {
    hosCode: hosCode,
    hosRegNo: hosRegNo,
    hosEncId: hosEncId,
    hdcId: hdcId,
    hdcEncId: hdcEncId,
    userCode: userCode,
    userName: userName,
    MSRole: MSRole,
    Dept: Dept
  };

  return param;
}

function getAxiosSetting() {
  var testSystemCode = 'CDRMP';
  var testToken = 'mediway_eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzEzNzczMjMzLCJ1c2VyIjoie1wib3JnTmFtZVwiOlwiXCIsXCJyb2xlSWRcIjpcIjM3NmMyOTk3NWQ0NmQ0ZjcxMmNlOTZkMzczYzkxNjc5XCIsXCJ1c2VySWRcIjpcIjJcIixcInVzZXJDb2RlXCI6XCJcIixcImluc3RJZFwiOlwiMTAwODZcIixcImxvZ2luTmFtZVwiOlwiYWRtaW5cIixcInJvbGVDb2RlXCI6XCJhZG1pbmlzdHJhdG9yXCIsXCJ0ZW5hbnRJZFwiOlwiXCIsXCJyb2xlTmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJuYW1lXCI6XCJhZG1pblwiLFwiaW5pdExvZ2luVGltZVwiOjE3MTM3Njk2MzMyNjEsXCJncmFudFR5cGVcIjpcInBhc3N3b3JkXCIsXCJpbnN0TmFtZVwiOlwiXCJ9IiwianRpIjoiT0dabE1HWTBNalV0WTJJd1ppMDBPRE5tTFRoak9HWXROamd4T0RKak9XUmlNMkkyIn0.sYiJ_I__5Gm7FHgIc8G1o6eCJ-h9oocZlOMrcwmj1-E';
  var ThirdToken = compSession.getItem('ThirdToken') || (isProduction ? '' : testToken);
  return {
    headers: {
      'System': compSession.getItem('SystemCode') || (isProduction ? '' : testSystemCode),
      'Third-Authorization': 'Bearer ' + ThirdToken
    },
    param: {
      baseURL: setting_MS_HDCURL,
      timeout: 10000
    }
  }
}

function handleObjData(param, obj) {
  var from = param.from;
  let row = jcst.selectedRow;
  var extra;
  if (from === 'vitalsigns') {
    // console.log('[vitalsigns req] param', param);
    extra = handleVitalsignsItems();
    console.log('[vitalsigns req] extra', extra);
    param = Object.assign({}, param, extra);
  } else if (from === 'vitalsignsNursing') {
    extra = handleNursingVitalsignsItems();
    console.log('[vitalsignsNursing req] extra', extra);
    param = Object.assign({}, param, extra);
  } else if (from === 'MES0023') {
    console.log('selectedRow', JSON.parse(JSON.stringify(row)));
    extra = {
      inspOrdInfo: {
        hdcInspRptId: row.hdcInspRptId
      }
    };
    param = Object.assign({}, param, extra);
    console.log('extra', extra, row.ensLogId);
  }
  obj.testData = JCSTTestData[from];
  return param;
}

function handleReq(obj) {
  obj.data = setBasicParams(handleObjData(obj.data, obj));
  return obj;

  function qs_stringify(obj) {
    var str = '';
    for (var k in obj) {
      var val = obj[k];
      val = 'object' === typeof val ? JSON.stringify(val) : val;
      str += '&' + k + '=' + val;
    }
    return str.slice(1);
  }
  function setBasicParams(query) {
    var basicParams = {};
    var exclude = query.exc1 || {};
    
    var rows = query.rows || 1000;
    var page = query.page || 1;
    
    var hosCode = PARAM.hosCode || query.hosCode;
    var hdcId = PARAM.hdcId;
    var hosRegNo = PARAM.hosRegNo;
    var hdcEncId = PARAM.hdcEncId;
    var hosEncId = PARAM.hosEncId;
    if (hdcEncId.indexOf(jcst_splitChar) > -1) hdcEncId = '';
    if (hosEncId.indexOf(jcst_splitChar) > -1) hosEncId = '';

    delete query.rows;
    delete query.page;
    delete query.hosCode;
    delete query.from;

    var basic = { 
      businessFieldCode: hosCode, 
      hdcPatientId: hdcId, 
      hosPatRegNo: hosRegNo,
      hdcEncId: hdcEncId, 
      hosEncId: hosEncId, 
    };
    basic = Object.assign({}, basic, query);
    for (var k in exclude) {
      if (k in basic) delete basic[k]
    }
    basicParams = { params: { data: basic }, rows: rows, page: page };

    return qs_stringify(basicParams);
  }
}

function handleVitalsignsItems() {
  var items = {};
  var thisSettingItems = jcst.setting.vitalsigns.vitalsignsItems;
  var max_scale = 0;
  thisSettingItems.forEach(function(item) {
    var scale = [];
    for (var i = 0; i <= (item.endValue - item.startValue) / item.interval; i++) {
      scale.push(item.startValue + i * item.interval);
    }
    scale.reverse();
    item.scale = scale;
    max_scale = Math.max(max_scale, scale.length);

    var desc = item.desc;
    var code = [];
    smtzfield.data.forEach(function(el) {
      var vitalCode = el.vitalCode, vitalDesc = el.vitalDesc;
      var descs = desc.map(function(d){ return translate.$t(d); });
      if (descs.includes(vitalDesc)) {
        code.push(vitalCode);
        el.isVitalsigns = true;
      }
    });
    items[code[0]] = { module: item, code: code };
  });
  console.log('[vitalsigns req] items', items);
  bus.$emit('vitalsigns', function() {
    this.itemsObj = items;
    this.max_scale = max_scale;
  });
  return { vitalSignInfo: { vitalSignMeasItemCode: Object.keys(items) } };
}

function handleNursingVitalsignsItems() { // 必须保证生命体征请求在这之前
  var nursingCodes = [], allItems = [], nursingItems = {};
  smtzfield.data.forEach(function(el) {
    var vitalCode = el.vitalCode, vitalDesc = el.vitalDesc,
    vitalUnit = el.vitalUnit, vitalGroup = el.vitalGroup, isVitalsigns = el.isVitalsigns;
    if (!isVitalsigns) {
      nursingCodes.push(vitalCode);
      allItems.push({
        desc: vitalDesc,
        unit: vitalUnit,
        code: vitalCode,
        vitalGroup,
      });
      nursingItems[vitalCode] = {
        desc: vitalDesc,
        unit: vitalUnit,
        code: vitalCode,
        data: []
      };
    }
  });
  bus.$emit('nursing', function() {
    this.allItems = allItems;
    this.nursingItems = nursingItems;
  });
  return { vitalSignInfo: { vitalSignMeasItemCode: nursingCodes } };
}