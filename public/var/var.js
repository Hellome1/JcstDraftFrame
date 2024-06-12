var isProduction = 'undefined' != typeof ms_address;
var INIT_lang = 'zh';

var setting_MS_URL = isProduction ? ms_address + '/emr/' : 'http://43.143.230.30:8006/cdr-api/emr/',
setting_MS_HDCURL = setting_MS_URL + 'dc/',
setting_EMR_URL = setting_MS_URL + 'dc';

var axiosSetting = getAxiosSetting();

var PARAM = getParam();

var DATAFORMAT = {};

var FIELD = {};

var TextStyle = {};

var Data = {};