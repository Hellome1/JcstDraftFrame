var compSession = compliantSession();
function compliantSession() {
  var flagS;
  typeof Storage !== 'undefined' ? (flagS = sessionStorage) : typeof session !== 'undefined' ? (flagS = session) : (flagS = '');
  if (!flagS) alert('该浏览器不支持sessionStorage,请换高版本浏览器!!!');
  return flagS;
}

function fetchField(tar, field, data) {
  for (var k in field) {
    tar[k] = data[field[k]];
  }
}

function addTextStyle(tar, style) {
  for (var k in tar) {
    tar[k] = {
      type: 'text',
      text: tar[k],
      style: style[k] || {}
    }
  }
}