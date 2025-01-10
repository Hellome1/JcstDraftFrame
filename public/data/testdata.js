var useTestData = {
  'vitalsignsDict': true,
  'vitalsigns': true,
  'vitalsignsNursing': true,
  'timeline': true,
  'tlSwitch': true,
  'medicalOrder': true,
  'pacs': true,
  'lis': true,
  'lisnorm': true,
  'lisLisnorm': true,
  'lisnormHistory': true,
  'surgery': true,
  'surgeryDetail': true,
  'consult': true
};
var JCSTTestData = {};

(function () {
  var isUseTestData = getSearchByKey('useTestData');
  // JCSTTestData['lisnorm'] = xmlreq({
  //   url: './data/testData/' + 'lisnorm' + '.json'
  // });
  if (!isUseTestData) return;
  for (var k in useTestData) {
    if (useTestData[k]) {
      JCSTTestData[k] = xmlreq({
        url: './data/testData/' + k + '.json'
      });
    }
  }

  function xmlreq(p) {
    var response;
    var url = p.url,
      method = p.method || 'get',
      headers = p.headers || {},
      asyncflag = p.asyncflag || p.cb || false,
      postbody = p.postbody,
      handleResponse = p.handleResponse || function(r) { return JSON.parse(r); },
      cb = p.cb;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, asyncflag);
    for (var k in headers) {
      xhr.setRequestHeader(k, headers[k]);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseText = xhr.responseText;
        response = handleResponse(responseText);
        cb && cb(response);
      }
    }
    xhr.send(postbody);
    return response;
  }
})();