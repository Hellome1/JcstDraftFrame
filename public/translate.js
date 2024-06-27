/* 国际化 */

var translate = {
  lang: INIT_lang,
  contract: {},
  $t: function(key) {
    return translate.contract[key] || '';
  },
  weekContract: function(index) {
    var week = translate.contract['dict.weekContract'].split(',');
    return week[index];
  },
  req: function(obj) {
    var defaultObj = {
      url: '',
      header: {},
      method: 'GET',
      params: '',
      cb: null
    };
    for (var k in obj) {
      defaultObj[k] = obj[k];
    }
    var url = defaultObj.url,
      header = defaultObj.header,
      method = defaultObj.method,
      params = defaultObj.params,
      cb = defaultObj.cb;

    var res;
    var isAsync = !!cb;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, isAsync);
    for (var k in header) {
      xhr.setRequestHeader(k, header[k]);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        res = JSON.parse(xhr.responseText);
        cb && cb(res);
      }
    }
    xhr.send(params);
    return res;
  },
  init: function () {
    var contract = translate.req({
      url: isProduction ? '/EMR/emrviewdoctor/scripts/event/PVIN/language/' + translate.lang + '.json' : './language/' + translate.lang + '.json'
    });

    translate.contract = contract;
    return true;
  }
}

translate.init();