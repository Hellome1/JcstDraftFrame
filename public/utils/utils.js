var compSession = compliantSession();
function compliantSession() {
  var flagS;
  typeof Storage !== 'undefined' ? (flagS = sessionStorage) : typeof session !== 'undefined' ? (flagS = session) : (flagS = '');
  if (!flagS) alert('该浏览器不支持sessionStorage,请换高版本浏览器!!!');
  return flagS;
}

function fetchField(tar, field, data) {
  for (var k in field) {
    if (data[field[k]]) tar[k] = decodeURIComponent(data[field[k]]);
    else if (!(k in tar)) tar[k] = '';
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

function getToday(splStr) {
  splStr = splStr || '-';
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var date = d.getDate();
  date = date < 10 ? '0' + date : date;
  var str = [y, m, date].join(splStr);
  
  return str;
}

var curOperationDate = '';
function getShowText(date, encIndex) {
  // surgeryInfo [ { count: 1, surgeryDate: '2022-02-02' } ]
  var text = translate.$t('timeline.rtltop.beforeTreatmentDayText') + ' ' + (encIndex + 1) + ' ' + translate.$t('timeline.rtltop.afterTreatmentDayText');
  var surgeryInfo = jcst.setting.surgery.surgeryInfo;
  surgeryInfo.forEach(function(surgery) {
    var surgeryDate = surgery.surgeryDate, count = surgery.count;
    var state = {};
    state.isInOperation = dayjs(date).diff(surgeryDate, 'day') === 0;
    state.isAfterOperation = curOperationDate && !state.isInOperation;
    if (state.isInOperation) {
      curOperationDate = surgeryDate;
      text = translate.$t('timeline.rtltop.beforeOperationCountText') + count + translate.$t('timeline.rtltop.afterOperationCountText');
    } else if (state.isAfterOperation) {
      var afterDays = dayjs(date).diff(curOperationDate, 'day');
      text = translate.$t('timeline.rtltop.beforeOverSurgeryDayText') + ' ' + afterDays + ' ' + translate.$t('timeline.rtltop.afterOverSurgeryDayText');
    }
  });
  return text;
}

var getTlDatesRangeExecCount = 0;
function getTimelineDays() {
  var encTimeRanges = Data.encTimeRanges;
  if (!encTimeRanges) return;
  if (getTlDatesRangeExecCount >= 2) return;
  getTlDatesRangeExecCount++;
  var days = [];
  var showDays = jcst_timeline.showDays;
  encTimeRanges.forEach(function(tr) {
    var encStartDate = tr.encStartDate, encEndDate = tr.encEndDate, encTypeCode = tr.encTypeCode;
    if (encTypeCode != 'I') {
      days.push({
        date: encStartDate,
        week: dayjs(encStartDate).get('day'),
        className: 'tl_O_type',
        showText: '门急诊'
      });
    } else {
      var diff = dayjs(encEndDate).diff(encStartDate, 'day');
      var allDays = diff + 1; // 实际日期是结束日期减去开始日期的天数加一
      for (var i = 0; i < allDays; i++) {
        var date = dayjs(encStartDate).add(i, 'day');
        var showText = getShowText(date, i);
        var week = date.get('day');
        var day = {
          date: date.format('YYYY-MM-DD'),
          week: week,
          className: '',
          showText: showText
        };
        days.push(day);
      }
    }
  });
  var pages = Math.ceil(days.length / showDays);
  jcst_timeline.pages = pages;

  var evenDaysNum = pages * showDays;
  for (var i = 0; i < evenDaysNum; i++) {
    if (!days[i]) {
      var $dayjs = dayjs(days[i - 1].date).add(1, 'day');
      var week = $dayjs.get('day');
      days.push({ date: '1970-01-01', week: week, className: '', showText: '' });
    }
    if (i % pages === 0) days[i].className += ' last';
  }
  jcst_timeline.days = days;
}

function selectPage(num) {
  bus.$emit('timeline', function() {
    if (this.selectPage != num) this.selectPage = num;
    else this.handleSelectPage(num);
  })
}

function selectPageFromDate(date) {
  var encTimeRanges = Data.encTimeRanges;
  var encStartDate = encTimeRanges[0].encStartDate;
  var daysFromEncStartDate = dayjs(date).add(1, 'day').diff(encStartDate, 'day'); // 需要加一天，如果选择就诊第一天diff就会变成0天
  var showDays = jcst_timeline.showDays;
  var page = Math.ceil(daysFromEncStartDate / showDays);
  selectPage(page);

  return page;
}

var curLocModuleTimeInfoIndex = 99;
function loc_moduleTimeInfo(name) {
  var orderList = jcst_layout.displayModules;
  var index = orderList.indexOf(name);
  if (index == -1) index = 9;
  if (index < curLocModuleTimeInfoIndex) {
    curLocModuleTimeInfoIndex = index;
    var t = moduleTimeInfo[name];
    if (t) {
      var date = '';
      for (var k in t) {
        if (!date) date = t[k] && t[k][0];
      }
      // console.log('[utils.js 140] loc:', name, date);
      date && selectPageFromDate(date);
    }
  }
}

function setGlobalSearchTimes(dataItm, datekey, namekey) {
  var date = dataItm[datekey] || '', desc = '';
  if (/{\w+}/.test(namekey)) {
    desc = namekey.replace(/{\w+}/gi, function(match, index) {
      var key = match.replace(/{|}/g, '');
      return dataItm[key];
    });
  } else {
    desc = dataItm[namekey] || '';
  }
  if (date && desc) {
    if (date in Times) Times[date] += desc;
    else Times[date] = desc;
  }
}

function getPacsPDFPath() {
  var row = jcst.currentClickedRow || jcst.selectedRow;
  var rules = [
    {
      path: 'http://168.1.1.1/test.html?a={hosOrdId}&b={hosEncId}',
      condition: 'examDeptName^==^CT室^^examCheckDocName^==^刘波er1^^^examAppDate^==^2022-07-20,2022-07-22'
    },
    {
      path: '{examRptLink}',
      condition: 'examAppDate^==^2022-07-21'
    }
  ];
  return getPathByRule(rules, row);
}

function getPathByRule(rules, row) {
  var sources = [PARAM, row];
  var path = '';
  rules.forEach(function(rule) {
    if (path) return;
    var isMatch = false;
    if (rule.condition) {
      var and_conditions = rule.condition.split('^^^');
      var and_conditions_isMatch = true;
      and_conditions.forEach(function(and_condition) {
        var or_conditions = and_condition.split('^^');
        var or_conditions_isMatch = false;
        console.log('or_conditions', or_conditions);
        or_conditions.forEach(function(condition) {
          var sarr = condition.split('^');
          var key = sarr[0], logicstr = sarr[1], val = sarr[2];
          var result = false;
          switch (logicstr) {
            case '==':
              if (val.indexOf(',') > -1) {
                result = val.split(',').filter(function(itm) { return row[key] && row[key].indexOf && row[key].indexOf(itm) > -1; }).length > 0;
              } else {
                result = row[key] == val;
              }
              break;
            case '!=':
              if (val.indexOf(',') > -1) {
                result = val.split(',').filter(function(itm) { return row[key] && row[key].indexOf && row[key].indexOf(itm) > -1; }).length === 0;
              } else {
                result = row[key] != val;
              }
              break;
          }
          console.log('row["' + key + '"]', row[key], result);
          if (result) or_conditions_isMatch = true; // 或链接只要有一个满足就满足
        });
        if (!or_conditions_isMatch) and_conditions_isMatch = false; // 且链接只要有一个不满足就都不满足
      });
      isMatch = and_conditions_isMatch;
    }
    else isMatch = true;
    if (isMatch) {
      var rulePath = rule.path;
      path = rulePath.replace(/{\w+}/g, function(match) {
        var matchKey = match.slice(1, match.length - 1);
        var matchValue = '';
        sources.forEach(function(source) {
          if (source && source[matchKey]) {
            console.log('matchKey', matchKey, source && source[matchKey], source);
            matchValue = source[matchKey];
          }
        });
        return matchValue;
      });
    }
  });
  console.log('[utils.js] getPathByRule resule:', path);
  return path;
}

function getSearchByKey(key) {
  var langArr = location.search.split('&').filter(function(itm) { return itm.indexOf(key + '=') > -1; });
  var searchResult = langArr.length ? langArr[0].split('=')[1] : '';
  return searchResult;
}

function changeSearchAndOpenSelf(k, v) {
  var searchs = location.search.split('&');
  var t = searchs.filter(function(itm) { return itm.indexOf(k + '=') === -1; });
  t.push(k + '=' + v);
  var nsearch = t.join('&');
  nsearch = nsearch.indexOf('?') > -1 ? nsearch : '?' + nsearch;
  nsearch = nsearch.replace('?&', '?');
  console.log('nsearch', nsearch);
  var path = location.pathname;
  var nurl = path + nsearch;
  window.open(nurl, '_self');
}