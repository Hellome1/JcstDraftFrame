(function () {

  var EnableLocalWeb = '1';
  var WEBSYSHTTPSERVERURL = "https://localhost:21996/websys/";
  var defaultDllDir = 'https://172.16.3.47:1443/imedical/web/addins/plugin';
  var myXmlHttp = null, debuggerflag = false, isUseGetMethod = false, isMozilla = false;
  function websysAjax(bizUrl, data, notReturn, callback) {
    function invkProcessReq() { if (req.readyState === 4 && (req.status === 0 || req.status === 200 || req.status === 500)) { try { var result = "var rtn=" + req.responseText; if (result == "var rtn=") { result = 'var rtn={"msg":"error","status":404,"rtn":null}'; }; eval(result); } catch (exx) { } if ("string" == typeof callback && window[callback]) { window[callback].call(req, rtn); } if ("function" == typeof callback) { callback.call(req, rtn); } } }
    notReturn = notReturn || 0; async = false; if (notReturn == 1) async = true; var url = WEBSYSHTTPSERVERURL + bizUrl; var cspXMLHttp = null; if (window.XMLHttpRequest) { isMozilla = true; cspXMLHttp = new XMLHttpRequest(); } else if (window.ActiveXObject) { isMozilla = false; try { cspXMLHttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { try { cspXMLHttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch (E) { cspXMLHttp = null; } } } var req = cspXMLHttp; req.onreadystatechange = invkProcessReq; var dataArr = [], dataStr = data, timeout = 60000; if ("object" == typeof data) { if (data.slice) { for (var i = 0; i < data.length; i++) { for (var j in data[i]) { if (j === "_timeout") { timeout = data[i][j]; continue; } dataArr.push(j + "=" + encodeURIComponent(data[i][j])); } } } else { for (var k in data) { dataArr.push(k + "=" + encodeURIComponent(data[k])); } } dataStr = dataArr.join("&"); } if (isUseGetMethod) { req.open("GET", url + "?" + dataStr, async); if (isMozilla) { req.send(null); } else { req.send(); } } else { req.open("POST", url, async); if (async) { req.timeout = timeout; } req.setRequestHeader("NotReturn-Type", notReturn); req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); try { req.send(dataStr); } catch (e) { return invkProcessResponse(e, callback); } } return invkProcessResponse(req);
  }
  function invkProcessResponse(req, cb) { if (debuggerflag) { debugger; } if ("undefined" == typeof req.status) {/*exception*/		var err = req.name + '(' + req.message + ')'; /*alert(err);*/ 		if ("function" == typeof cb) { cb.call(req, { "msg": err, "status": 404, "rtn": null }); } return { "msg": err, "status": 404, "rtn": null }; } if (req.status != 200 && req.status != 500) { var err = req.statusText + ' (' + req.status + ')'; if ("function" == typeof cb) { cb.call(req, { "msg": err, "status": req.status, "rtn": null }); } return { "msg": err, "status": req.status, "rtn": null }; } var result = "var a = " + req.responseText; eval(result); return a; }
  function invokeDll(mode, ass, cls, q, notReturn, callback) { return websysAjax(ass + '/' + cls, q, notReturn, callback); };

  function ICls() { this.data = []; this.mode = 0; this.notReturn = 0; this.ass = ""; this.cls = ""; this.focusClassName = ""; this.focusWindowName = ""; this.focusLazyTime = 1000; this.timeout = 60000; }
  ICls.prototype.constructor = ICls;
  ICls.prototype.invk = function (c) { if (this.focusClassName != "") this.data.push({ "_focusClassName": this.focusClassName }); if (this.focusWindowName != "") this.data.push({ "_focusWindowName": this.focusWindowName }); if ((this.focusClassName != "") || (this.focusWindowName != "")) this.data.push({ "_focusLazyTime": this.focusLazyTime }); this.data.push({ "_timeout": this.timeout }); var rtn = invokeDll(this.mode, this.ass, this.cls, this.data, this.notReturn, c); return rtn; };
  ICls.prototype.clear = function () { this.data.length = 3; return this; };
  ICls.prototype.prop = function (k, v) { var o = {}; o[k] = v; this.data.push(o); return this; };
  ICls.prototype.getMthParam = function (arg) { if (!arg.length) return ""; var len = arg.length, hasCallback = 0; if (len > 0 && "function" == typeof arg[len - 1]) { hasCallback = 1; }; var param = ""; if (arg.length > 0) { param = "P_COUNT=" + (len - hasCallback); for (var i = 0; i < arg.length - hasCallback; i++) { param += "&P_" + i + "=" + encodeURIComponent(arg[i]); } } return param; };
  ICls.prototype.cmd = function (c) {
    this.data.push({ "_cmd": c });
    if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]) };
    return this.invk();
  }
  ICls.AssDirList = [];
  /*修改本地时间*/
  ICls.PrjSetTime = function () {
    this.ass = "Interop.PrjSetTime"; this.cls = "PrjSetTime.CLSSETTIMEClass"; this.data.push({ "_dllDir": defaultDllDir + "/PrjSetTime/Interop.PrjSetTime.dll,SetTime.dll" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.SetTime = function () { this.data.push({ "M_SetTime": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.PrjSetTime.prototype = new ICls();
  ICls.PrjSetTime.prototype.constructor = ICls.PrjSetTime;
  var PrjSetTime = new ICls.PrjSetTime();
  try {
    Object.defineProperty(PrjSetTime, 'VYear', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VYear || ''; },
      set: function (v) { PrjSetTime._VYear = v; if ("function" !== typeof v) { PrjSetTime.prop('VYear', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PrjSetTime, 'VMonth', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VMonth || ''; },
      set: function (v) { PrjSetTime._VMonth = v; if ("function" !== typeof v) { PrjSetTime.prop('VMonth', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PrjSetTime, 'VDay', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VDay || ''; },
      set: function (v) { PrjSetTime._VDay = v; if ("function" !== typeof v) { PrjSetTime.prop('VDay', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PrjSetTime, 'VHour', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VHour || ''; },
      set: function (v) { PrjSetTime._VHour = v; if ("function" !== typeof v) { PrjSetTime.prop('VHour', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PrjSetTime, 'VMinute', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VMinute || ''; },
      set: function (v) { PrjSetTime._VMinute = v; if ("function" !== typeof v) { PrjSetTime.prop('VMinute', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PrjSetTime, 'VSecond', {
      enumerable: true, configrable: true, get: function () { return PrjSetTime._VSecond || ''; },
      set: function (v) { PrjSetTime._VSecond = v; if ("function" !== typeof v) { PrjSetTime.prop('VSecond', v); } }
    });
  } catch (exxx) { }
  /*打印LODOP*/
  ICls.LODOP = function () {
    this.ass = "Interop.Lodop"; this.cls = "Lodop.LodopXClass"; this.data.push({ "_dllDir": defaultDllDir + "/lodop/Interop.Lodop.dll,install_lodop32.exe" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.FORMAT = function () { this.data.push({ "M_FORMAT": this.getMthParam(arguments) }); return this; }
    this.PRINT_INIT = function () { this.data.push({ "M_PRINT_INIT": this.getMthParam(arguments) }); return this; }
    this.PRINT = function () { this.data.push({ "M_PRINT": this.getMthParam(arguments) }); return this; }
    this.ADD_PRINT_LINE = function () { this.data.push({ "M_ADD_PRINT_LINE": this.getMthParam(arguments) }); return this; }
    this.ADD_PRINT_IMAGE = function () { this.data.push({ "M_ADD_PRINT_IMAGE": this.getMthParam(arguments) }); return this; }
    this.ADD_PRINT_TEXT = function () { this.data.push({ "M_ADD_PRINT_TEXT": this.getMthParam(arguments) }); return this; }
    this.SET_PRINT_STYLEA = function () { this.data.push({ "M_SET_PRINT_STYLEA": this.getMthParam(arguments) }); return this; }
    this.SET_LICENSES = function () { this.data.push({ "M_SET_LICENSES": this.getMthParam(arguments) }); return this; }
    this.GET_VALUE = function () { this.data.push({ "M_GET_VALUE": this.getMthParam(arguments) }); return this; }
    this.SAVE_TO_FILE = function () { this.data.push({ "M_SAVE_TO_FILE": this.getMthParam(arguments) }); return this; }
    this.ADD_PRINT_TABLE = function () { this.data.push({ "M_ADD_PRINT_TABLE": this.getMthParam(arguments) }); return this; }
    this.SET_PRINT_STYLE = function () { this.data.push({ "M_SET_PRINT_STYLE": this.getMthParam(arguments) }); return this; }
  }
  ICls.LODOP.prototype = new ICls();
  ICls.LODOP.prototype.constructor = ICls.LODOP;
  var LODOP = new ICls.LODOP();
  /*老的xml打印*/
  ICls.DHCOPPrint = function () {
    this.ass = "Interop.DHCOPPrint"; this.cls = "DHCOPPrint.ClsBillPrintClass"; this.data.push({ "_dllDir": defaultDllDir + "/DHCOPPrint/Interop.DHCOPPrint.dll,DHCOPPrint.dll,QRmaker.ocx" }); this.data.push({ "_version": "102.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.ToPrintHDLPStr = function () { this.clear(); this.data.push({ "M_ToPrintHDLPStr": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.ToPrintDoc = function () { this.data.push({ "M_ToPrintDoc": this.getMthParam(arguments) }); return this; }
  }
  ICls.DHCOPPrint.prototype = new ICls();
  ICls.DHCOPPrint.prototype.constructor = ICls.DHCOPPrint;
  var DHCOPPrint = new ICls.DHCOPPrint();
  /*获取客户端信息*/
  ICls.CmdShell = function () {
    this.ass = "cmd"; this.cls = "cmd"; this.data.push({ "_dllDir": defaultDllDir + "/" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.GetInfo = function () { this.data.push({ "M_GetInfo": this.getMthParam(arguments) }); return this; }
    this.GetIP = function () { this.data.push({ "M_GetIP": this.getMthParam(arguments) }); return this; }
    this.Run = function () { this.clear(); this.data.push({ "M_Run": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.EvalJs = function () { this.clear(); this.data.push({ "M_EvalJs": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.GetConfig = function () { this.clear(); this.data.push({ "M_GetConfig": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.CurrentUserEvalJs = function () { this.clear(); this.data.push({ "M_CurrentUserEvalJs": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.CmdShell.prototype = new ICls();
  ICls.CmdShell.prototype.constructor = ICls.CmdShell;
  var CmdShell = new ICls.CmdShell();
  /*组件*/
  ICls.trakWebEdit3 = function () {
    this.ass = "Interop.trakWebEdit3"; this.cls = "trakWebEdit3.TrakWebClass"; this.data.push({ "_dllDir": defaultDllDir + "/trakWebEdit3/Interop.trakWebEdit3.dll,trakWebEdit3.DLL,DhtmlEd.msi" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.ShowLayout = function () { this.clear(); this.data.push({ "M_ShowLayout": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.trakWebEdit3.prototype = new ICls();
  ICls.trakWebEdit3.prototype.constructor = ICls.trakWebEdit3;
  var trakWebEdit3 = new ICls.trakWebEdit3();
  /*读文本*/
  ICls.SpVoice = function () {
    this.ass = "interop.SAPI"; this.cls = "SAPI.SpVoice"; this.data.push({ "_dllDir": defaultDllDir + "/SpVoiceX86/DotNetSpeech.dll" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.Speak = function () { this.clear(); this.data.push({ "M_Speak": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.SpVoice.prototype = new ICls();
  ICls.SpVoice.prototype.constructor = ICls.SpVoice;
  var SpVoice = new ICls.SpVoice();
  /*中间件管理*/
  ICls.CMgr = function () {
    this.ass = "mgr"; this.cls = "mgr"; this.data.push({ "_dllDir": defaultDllDir + "/WebsysServerSetup/WebsysServerSetup.zip" }); this.data.push({ "_version": "1.1.2.5" });
    this.data.push({ "_clientIPExp": "" }); this.getVersion = function () { this.clear(); this.data.push({ "M_getVersion": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.getScreens = function () { this.clear(); this.data.push({ "M_getScreens": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.moveWindow = function () { this.clear(); this.data.push({ "M_moveWindow": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.CMgr.prototype = new ICls();
  ICls.CMgr.prototype.constructor = ICls.CMgr;
  var CMgr = new ICls.CMgr();
  /*读就诊卡[标板/长治测试卡]*/
  ICls.ClsM1CZCard = function () {
    this.ass = "Interop.DHCCardInfo"; this.cls = "DHCCardInfo.ClsM1MHCardClass"; this.data.push({ "_dllDir": defaultDllDir + "/DHCCardInfo/Interop.DHCCardInfo.dll,DHCCardInfo.dll,DHCCardInfo.zip" }); this.data.push({ "_version": "1.0.0.10" });
    this.data.push({ "_clientIPExp": "" }); this.ReadMagCard = function () { this.clear(); this.data.push({ "M_ReadMagCard": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.WriteMagCard = function () { this.clear(); this.data.push({ "M_WriteMagCard": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.ClsM1CZCard.prototype = new ICls();
  ICls.ClsM1CZCard.prototype.constructor = ICls.ClsM1CZCard;
  var RWCard = new ICls.ClsM1CZCard();
  /*检验打印*/
  ICls.LISPrint = function () {
    this.ass = "DHCLabtrakReportPrint"; this.cls = "DHCLabtrakReportPrint.DHCLabtrakReportPrint"; this.data.push({ "_dllDir": defaultDllDir + "/lisprint/DHCLabtrakReportPrint.dll,lisprint.zip" }); this.data.push({ "_version": "8.4" });
    this.data.push({ "_clientIPExp": "" }); this.PrintOut = function () { this.clear(); this.data.push({ "M_PrintOut": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.PrintPreview = function () { this.clear(); this.data.push({ "M_PrintPreview": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.LISPrint.prototype = new ICls();
  ICls.LISPrint.prototype.constructor = ICls.LISPrint;
  var LISPrint = new ICls.LISPrint();
  /*护理病历打印*/
  ICls.NurEmrPrint = function () {
    this.ass = "DesignNewForms.PrintActivex"; this.cls = "DesignNewForms.PrintActivex.PrintCtrl"; this.data.push({ "_dllDir": defaultDllDir + "/NurEmrPrint/DesignNewForms.PrintActivex.dll,NurEmrPrint.zip" }); this.data.push({ "_version": "2.2.2.50" });
    this.data.push({ "_clientIPExp": "" }); this.Print = function () { this.clear(); this.data.push({ "M_Print": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.PrintALL = function () { this.clear(); this.data.push({ "M_PrintALL": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.MakePicAll = function () { this.clear(); this.data.push({ "M_MakePicAll": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.MakePic = function () { this.clear(); this.data.push({ "M_MakePic": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.MakeHTML = function () { this.clear(); this.data.push({ "M_MakeHTML": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.GetMaxPageInfo = function () { this.clear(); this.data.push({ "M_GetMaxPageInfo": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.NurEmrPrint.prototype = new ICls();
  ICls.NurEmrPrint.prototype.constructor = ICls.NurEmrPrint;
  var NurEmrPrint = new ICls.NurEmrPrint();
  /*血液净化*/
  ICls.BloodPurification = function () {
    this.ass = "DHCClinic.BP.Main"; this.cls = "DHCClinic.BP.Main.Main"; this.data.push({ "_dllDir": defaultDllDir + "/BP/BP.zip" }); this.data.push({ "_version": "3.5.0.9" });
    this.data.push({ "_clientIPExp": "" }); this.Show = function () { this.clear(); this.data.push({ "M_Show": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.BloodPurification.prototype = new ICls();
  ICls.BloodPurification.prototype.constructor = ICls.BloodPurification;
  var BloodPurification = new ICls.BloodPurification();
  /*文件上传*/
  ICls.PEPhoto = function () {
    this.ass = "Interop.PhotoProject"; this.cls = "PhotoProject.PhotoClass"; this.data.push({ "_dllDir": defaultDllDir + "/PEPhoto/Interop.PhotoProject.dll,PEPhoto.dll" }); this.data.push({ "_version": "1.0.0.5" });
    this.data.push({ "_clientIPExp": "" }); this.SaveFile = function () { this.data.push({ "M_SaveFile": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.ShowWin = function () { this.data.push({ "M_ShowWin": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.PEPhoto.prototype = new ICls();
  ICls.PEPhoto.prototype.constructor = ICls.PEPhoto;
  var PEPhoto = new ICls.PEPhoto();
  try {
    Object.defineProperty(PEPhoto, 'FileName', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._FileName || ''; },
      set: function (v) { PEPhoto._FileName = v; if ("function" !== typeof v) { PEPhoto.prop('FileName', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'AppName', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._AppName || ''; },
      set: function (v) { PEPhoto._AppName = v; if ("function" !== typeof v) { PEPhoto.prop('AppName', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'DBFlag', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._DBFlag || ''; },
      set: function (v) { PEPhoto._DBFlag = v; if ("function" !== typeof v) { PEPhoto.prop('DBFlag', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'FTPFlag', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._FTPFlag || ''; },
      set: function (v) { PEPhoto._FTPFlag = v; if ("function" !== typeof v) { PEPhoto.prop('FTPFlag', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'DBConnectString', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._DBConnectString || ''; },
      set: function (v) { PEPhoto._DBConnectString = v; if ("function" !== typeof v) { PEPhoto.prop('DBConnectString', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'FTPString', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._FTPString || ''; },
      set: function (v) { PEPhoto._FTPString = v; if ("function" !== typeof v) { PEPhoto.prop('FTPString', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'PatientID', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._PatientID || ''; },
      set: function (v) { PEPhoto._PatientID = v; if ("function" !== typeof v) { PEPhoto.prop('PatientID', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'PicWidth', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._PicWidth || ''; },
      set: function (v) { PEPhoto._PicWidth = v; if ("function" !== typeof v) { PEPhoto.prop('PicWidth', v); } }
    });
  } catch (exxx) { }
  try {
    Object.defineProperty(PEPhoto, 'PicHeight', {
      enumerable: true, configrable: true, get: function () { return PEPhoto._PicHeight || ''; },
      set: function (v) { PEPhoto._PicHeight = v; if ("function" !== typeof v) { PEPhoto.prop('PicHeight', v); } }
    });
  } catch (exxx) { }
  /*重症监护*/
  ICls.IntensiveCare = function () {
    this.ass = "DHCClinic.ICU.Main"; this.cls = "DHCClinic.ICU.Main.Main"; this.data.push({ "_dllDir": defaultDllDir + "/ICU/ICU.zip" }); this.data.push({ "_version": "3.9.0.9" });
    this.data.push({ "_clientIPExp": "" }); this.Show = function () { this.clear(); this.data.push({ "M_Show": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.IntensiveCare.prototype = new ICls();
  ICls.IntensiveCare.prototype.constructor = ICls.IntensiveCare;
  var IntensiveCare = new ICls.IntensiveCare();
  /*辅助输入*/
  ICls.globalphrases = function () {
    this.ass = "GlobalPhrase"; this.cls = "PhraseManagement.Program"; this.data.push({ "_dllDir": defaultDllDir + "/globalphrases/makelnk.vbs,globalphrases.zip" }); this.data.push({ "_version": "1.0.0.2" });
    this.data.push({ "_clientIPExp": "" });
  }
  ICls.globalphrases.prototype = new ICls();
  ICls.globalphrases.prototype.constructor = ICls.globalphrases;
  var globalphrases = new ICls.globalphrases();
  /*医为浏览器*/
  ICls.DHCWebBrowser = function () {
    this.ass = "DHCWebBrowser"; this.cls = "DHCWebBrowser"; this.data.push({ "_dllDir": defaultDllDir + "/DHCWebBrowser/makelnk.vbs,DHCWebBrowser.zip" }); this.data.push({ "_version": "2.0.7" });
    this.data.push({ "_clientIPExp": "" });
  }
  ICls.DHCWebBrowser.prototype = new ICls();
  ICls.DHCWebBrowser.prototype.constructor = ICls.DHCWebBrowser;
  var DHCWebBrowser = new ICls.DHCWebBrowser();
  /*身份证图片转base64*/
  ICls.ImageToBase64 = function () {
    this.ass = "ImageToBase64"; this.cls = "ImageToBase64.Portal"; this.data.push({ "_dllDir": defaultDllDir + "/ImageToBase64/ImageToBase64.dll" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.ImgToBase64 = function () { this.clear(); this.data.push({ "M_ImgToBase64": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.Base64ToImg = function () { this.clear(); this.data.push({ "M_Base64ToImg": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.ImageToBase64.prototype = new ICls();
  ICls.ImageToBase64.prototype.constructor = ICls.ImageToBase64;
  var ImageToBase64 = new ICls.ImageToBase64();
  /*数字签名PDF生成*/
  ICls.EMRPDFCreator = function () {
    this.ass = "EMRPDFCreator"; this.cls = "DHCC.EMR.EMRPDFCreator.AXCreator"; this.data.push({ "_dllDir": defaultDllDir + "/EMRPDFCreator/EMRPDFCreator.dll,EMRPDFCreator.zip" }); this.data.push({ "_version": "1.0.1" });
    this.data.push({ "_clientIPExp": "" }); this.Exec = function () { this.clear(); this.data.push({ "M_Exec": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.EMRPDFCreator.prototype = new ICls();
  ICls.EMRPDFCreator.prototype.constructor = ICls.EMRPDFCreator;
  var EMRPDFCreator = new ICls.EMRPDFCreator();
  /*数字签名clawPDF打印机*/
  ICls.clawPDF = function () {
    this.ass = "clawPDF"; this.cls = "clawPDF"; this.data.push({ "_dllDir": defaultDllDir + "/clawPDF/clawPDF.zip" }); this.data.push({ "_version": "0.8.5" });
    this.data.push({ "_clientIPExp": "" });
  }
  ICls.clawPDF.prototype = new ICls();
  ICls.clawPDF.prototype.constructor = ICls.clawPDF;
  var clawPDF = new ICls.clawPDF();
  /*病案归档扫描插件*/
  ICls.ScanActiveX = function () {
    this.ass = "FS.Core.ScanActiveX"; this.cls = "DHC.FS.Core.ScanActiveX.ScanActiveX"; this.data.push({ "_dllDir": defaultDllDir + "/ScanActiveX/FS.Core.ScanActiveX.dll,DHCEPRFSScan.zip" }); this.data.push({ "_version": "4.1.0" });
    this.data.push({ "_clientIPExp": "" }); this.DBUserPassword = function () { this.data.push({ "M_DBUserPassword": this.getMthParam(arguments) }); return this; }
    this.LoadByEpisodeID = function () { this.data.push({ "M_LoadByEpisodeID": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.ScanActiveX.prototype = new ICls();
  ICls.ScanActiveX.prototype.constructor = ICls.ScanActiveX;
  var ScanActiveX = new ICls.ScanActiveX();
  /*签名图处理*/
  ICls.EMRImageUtil = function () {
    this.ass = "EMRImageUtil"; this.cls = "DHCC.EMR.EMRImageUtil.UCImage"; this.data.push({ "_dllDir": defaultDllDir + "/EMRImageUtil/EMRImageUtil.dll,EMRImageUtil.zip" }); this.data.push({ "_version": "1.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.ConvertImage = function () { this.clear(); this.data.push({ "M_ConvertImage": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.EMRImageUtil.prototype = new ICls();
  ICls.EMRImageUtil.prototype.constructor = ICls.EMRImageUtil;
  var EMRImageUtil = new ICls.EMRImageUtil();
  /*emrprintplugin打印插件*/
  ICls.emrprintplugin = function () {
    this.ass = "emrprintplugin"; this.cls = "emrprintplugin"; this.data.push({ "_dllDir": defaultDllDir + "/emrprintplugin/Web-Print.zip" }); this.data.push({ "_version": "1.0.4" });
    this.data.push({ "_clientIPExp": "" });
  }
  ICls.emrprintplugin.prototype = new ICls();
  ICls.emrprintplugin.prototype.constructor = ICls.emrprintplugin;
  var emrprintplugin = new ICls.emrprintplugin();
  /*语音报价器*/
  ICls.SoundPrice = function () {
    this.ass = "SoundPrice"; this.cls = "SoundPrice.TDbjq"; this.data.push({ "_dllDir": defaultDllDir + "/SoundPrice/SoundPrice.dll,SoundPrice.zip" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.sound = function () { this.clear(); this.data.push({ "M_sound": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.evaluate = function () { this.clear(); this.data.push({ "M_evaluate": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.SoundPrice.prototype = new ICls();
  ICls.SoundPrice.prototype.constructor = ICls.SoundPrice;
  var SoundPrice = new ICls.SoundPrice();
  /*国家医保电子凭证*/
  ICls.NationECCode = function () {
    this.ass = "NationEC"; this.cls = "NationEC.NationECCode"; this.data.push({ "_dllDir": defaultDllDir + "/NationECCode/NationEC.dll,NationECCode.dll" }); this.data.push({ "_version": "1.0.2" });
    this.data.push({ "_clientIPExp": "" }); this.CallNationEcTrans = function () { this.clear(); this.data.push({ "M_CallNationEcTrans": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.NationECCode.prototype = new ICls();
  ICls.NationECCode.prototype.constructor = ICls.NationECCode;
  var NationECCode = new ICls.NationECCode();
  /*bs编辑器打印插件管理*/
  ICls.EMRWebPrinter = function () {
    this.ass = "EMRWebPrinter"; this.cls = "DHCC.EMR.EMRWebPrinter.AXWebPrinter"; this.data.push({ "_dllDir": defaultDllDir + "/EMRWebPrinter/EMRWebPrinter.dll,EMRWebPrinter.zip" }); this.data.push({ "_version": "1.0.1" });
    this.data.push({ "_clientIPExp": "" }); this.Exec = function () { this.clear(); this.data.push({ "M_Exec": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.EMRWebPrinter.prototype = new ICls();
  ICls.EMRWebPrinter.prototype.constructor = ICls.EMRWebPrinter;
  var EMRWebPrinter = new ICls.EMRWebPrinter();
  /*读身份证(因纳伟盛)*/
  ICls.DHCDocReadPerson = function () {
    this.ass = "Interop.DHCDocReadPerson"; this.cls = "DHCDocReadPerson.PublicReadPersonClass"; this.data.push({ "_dllDir": defaultDllDir + "/DHCDocReadPerson/Interop.DHCDocReadPerson.dll,DHCDocReadPerson.dll,DHCDocPicture.dll,termb.dll,DHCDocReadPerson.zip" }); this.data.push({ "_version": "1.0.0.0" });
    this.data.push({ "_clientIPExp": "" }); this.ReadPersonInfo = function () { this.clear(); this.data.push({ "M_ReadPersonInfo": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.ReadMagCard = function () { this.clear(); this.data.push({ "M_ReadMagCard": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
    this.PicToBase64 = function () { this.clear(); this.data.push({ "M_PicToBase64": this.getMthParam(arguments) }); if (arguments.length > 0 && "function" == typeof arguments[arguments.length - 1]) { return this.invk(arguments[arguments.length - 1]); } return this.invk(); }
  }
  ICls.DHCDocReadPerson.prototype = new ICls();
  ICls.DHCDocReadPerson.prototype.constructor = ICls.DHCDocReadPerson;
  var PublicReadPerson = new ICls.DHCDocReadPerson();


  // 使用谷歌打开链接的方法，**此方法医卫浏览器可用**
  function openChrome(url) {
    console.log('chromeOpenLink', url);
    // var url = 'http://192.180.50.183:8084/PDB?hosCode=45071850-3&userCode='+'YS01'+'&&cardNo='+'0000000600'//0000000600'  system
    var str = 'var objShell = new ActiveXObject("WScript.Shell");' + 'objShell.Run("' + url + '",0,true);';
    CmdShell.notReturn = 1;
    CmdShell.CurrentUserEvalJs(str);
  }
  // 使用谷歌调用IE的方法，**此方法医卫浏览器可用**
  function openIE(url) {
    console.log('IEOpenLink', url);
    // var url = 'http://192.180.50.183:8084/PDB?hosCode=45071850-3&userCode='+'YS01'+'&&cardNo='+'0000000600'//0000000600'  system
    var e = '"C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe" "{path}"'.replace('{path}', url);
    CmdShell.clear();
    CmdShell.notReturn = 1;
    CmdShell.Run(e);
  }
  function open_call_clinic(examId) {
    // '"C:\\Program Files (x86)\\call_clinic\\call_clinic.exe" "S=5064587"'
    var e = '"C:\\Program Files (x86)\\call_clinic\\call_clinic.exe" "S={examId}"'.replace('{examId}', examId);
    CmdShell.clear();
    CmdShell.notReturn = 1;
    CmdShell.Run(e);
  }
  function exec(command) {
    var websys_isIE = !!window.ActiveXObject || 'ActiveXObject' in window;
    if (websys_isIE) {
      window.oldOnError = window.onerror;
      window._command = command;
      window.onerror = function (err) {
        if (err.indexOf('utomation') > -1) {
          alert('命令' + window._command + '已经被用户禁止！');
          return true;
        } else {
          return false;
        }
      };
      var wsh = new ActiveXObject('WScript.Shell');
      if (wsh) {
        wsh.Run(command);
      }
      window.onerror = window.oldOnError;
    } else {
      if (CmdShell) {
        CmdShell.clear();
        CmdShell.notReturn = 1;
        CmdShell.Run(command);
      }
    }
  }
  window.openChrome = openChrome;
  window.openIE = openIE;
  window.exec = exec;
  window.open_call_clinic = open_call_clinic;
})();
