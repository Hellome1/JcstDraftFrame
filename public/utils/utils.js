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

var STATE = (function() {
  var storeObj = {
    surgeryRes: null,
    surgeryInfo: []
  }

  function get(key) {
    if (!key) {
      console.error('Key must not null when get attr!');
      return false;
    }
    return storeObj[key];
  }
  function set(assignObj) {
    if (!assignObj) {
      console.error('AssignObj must not null when set attr!');
      return false;
    }
    storeObj = Object.assign({}, storeObj, assignObj);
    return true;
  }
  
  return {
    get: get,
    set: set
  };
})()

var curOperationDate = '';
function getShowText(date, encIndex) {
  // surgeryInfo [ { count: 1, surgeryDate: '2022-02-02' } ]
  var text = translate.$t('timeline.rtltop.beforeTreatmentDayText') + ' ' + (encIndex + 1) + ' ' + translate.$t('timeline.rtltop.afterTreatmentDayText');
  var surgeryInfo = setting.surgery.surgeryInfo;
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
  var showDays = setting.timeline.showDays;
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
  setting.timeline.pages = pages;

  var evenDaysNum = pages * showDays;
  for (var i = 0; i < evenDaysNum; i++) {
    if (!days[i]) {
      var $dayjs = dayjs(days[i - 1].date).add(1, 'day');
      var week = $dayjs.get('day');
      days.push({ date: '1970-01-01', week, className: '', showText: '' });
    }
    if (i % pages === 0) days[i].className += ' last';
  }
  setting.timeline.days = days;
}

function selectPage(num) {
  var timeline = setting.timeline;
  var days = timeline.days;
  var showDays = timeline.showDays;
  timeline.curdays = days.filter(function(_, i) { return showDays * (num - 1) <= i && i < showDays * num; });
}