(function (window) {
  var EnableLocalWeb = '1';
  var protocol = window.location.protocol;
  var port = protocol === 'http:' ? '11996' : '21996';
  var WEBSYSHTTPSERVERURL = `${protocol}//localhost:${port}/websys/`;
  // var defaultDllDir = location.href.slice(0,location.href.indexOf("web/"))+"web/addins/plugin";
  /* 这里IP地址改成HIS正式库的IP地址，该 ip 下 namespace 有 /imedical/web/addins/plugin 该路径*/
  var defaultDllDir = 'https://114.242.246.235:1443/imedical/web/addins/plugin';
  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  var myXmlHttp = null,
    debuggerflag = false,
    isUseGetMethod = false,
    isMozilla = false,
    async = false,
    a = '';
  function websysAjax(bizUrl, data, notReturn, callback) {
    function invkProcessReq() {
      if (req.readyState === 4 && (req.status === 0 || req.status === 200 || req.status === 500)) {
        try {
          var result = 'var rtn=' + req.responseText;
          if (result == 'var rtn=') {
            result = 'var rtn={"msg":"error","status":404,"rtn":null}';
          }
          eval(result);
        } catch (exx) {}
        if ('string' == typeof callback && window[callback]) {
          window[callback].call(req, rtn);
        }
        if ('function' == typeof callback) {
          callback.call(req, rtn);
        }
      }
    }
    notReturn = notReturn || 0;
    async = false;
    if (notReturn == 1) async = true;
    var url = WEBSYSHTTPSERVERURL + bizUrl;
    var cspXMLHttp = null;
    if (window.XMLHttpRequest) {
      isMozilla = true;
      cspXMLHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      isMozilla = false;
      try {
        cspXMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        try {
          cspXMLHttp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (E) {
          cspXMLHttp = null;
        }
      }
    }
    var req = cspXMLHttp;
    var dataArr = [],
      dataStr = data,
      timeout = 60000;
    if ('object' == typeof data) {
      if (data.slice) {
        for (var i = 0; i < data.length; i++) {
          for (var j in data[i]) {
            if (j === '_timeout') {
              timeout = data[i][j];
              continue;
            }
            dataArr.push(j + '=' + encodeURIComponent(data[i][j]));
          }
        }
      } else {
        for (var k in data) {
          dataArr.push(k + '=' + encodeURIComponent(data[k]));
        }
      }
      dataStr = dataArr.join('&');
    }
    if (isUseGetMethod) {
      req.open('GET', url + '?' + dataStr, async);
      if (isMozilla) {
        req.send(null);
        req.onreadystatechange = invkProcessReq;
      } else {
        req.send();
        req.onreadystatechange = invkProcessReq;
      }
    } else {
      req.open('POST', url, async);
      req.onreadystatechange = invkProcessReq;
      if (async) {
        req.timeout = timeout;
      }
      req.setRequestHeader('NotReturn-Type', notReturn);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      try {
        req.send(dataStr);
      } catch (e) {
        return invkProcessResponse(e, callback);
      }
    }
    return invkProcessResponse(req);
  }
  function invkProcessResponse(req, cb) {
    if (debuggerflag) {
      debugger;
    }
    if ('undefined' == typeof req.status) {
      /*exception*/
      var err = req.name + '(' + req.message + ')';
      /*alert(err);*/
      if ('function' == typeof cb) {
        cb.call(req, { msg: err, status: 404, rtn: null });
      }
      return { msg: err, status: 404, rtn: null };
    }
    if (req.status != 200 && req.status != 500) {
      var err = req.statusText + ' (' + req.status + ')';
      if ('function' == typeof cb) {
        cb.call(req, { msg: err, status: req.status, rtn: null });
      }
      return { msg: err, status: req.status, rtn: null };
    }
    return JSON.parse(req.responseText);
  }
  function invokeDll(mode, ass, cls, q, notReturn, callback) {
    return websysAjax(ass + '/' + cls, q, notReturn, callback);
  }

  function ICls() {
    this.data = [];
    this.mode = 0;
    this.notReturn = 0;
    this.ass = '';
    this.cls = '';
    this.focusClassName = '';
    this.focusWindowName = '';
    this.focusLazyTime = 1000;
    this.timeout = 60000;
  }
  ICls.prototype.constructor = ICls;
  ICls.prototype.invk = function (c) {
    if (this.focusClassName != '') this.data.push({ _focusClassName: this.focusClassName });
    if (this.focusWindowName != '') this.data.push({ _focusWindowName: this.focusWindowName });
    if (this.focusClassName != '' || this.focusWindowName != '') this.data.push({ _focusLazyTime: this.focusLazyTime });
    this.data.push({ _timeout: this.timeout });
    var rtn = invokeDll(this.mode, this.ass, this.cls, this.data, this.notReturn, c);
    return rtn;
  };
  ICls.prototype.clear = function () {
    this.data.length = 3;
    return this;
  };
  ICls.prototype.prop = function (k, v) {
    var o = {};
    o[k] = v;
    this.data.push(o);
    return this;
  };
  ICls.prototype.getMthParam = function (arg) {
    if (!arg.length) return '';
    var len = arg.length,
      hasCallback = 0;
    if (len > 0 && 'function' == typeof arg[len - 1]) {
      hasCallback = 1;
    }
    var param = '';
    if (arg.length > 0) {
      param = 'P_COUNT=' + (len - hasCallback);
      for (var i = 0; i < arg.length - hasCallback; i++) {
        param += '&P_' + i + '=' + encodeURIComponent(arg[i]);
      }
    }
    return param;
  };
  ICls.prototype.cmd = function (c) {
    this.data.push({ _cmd: c });
    if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
      return this.invk(arguments[arguments.length - 1]);
    }
    return this.invk();
  };
  ICls.AssDirList = [];

  /*获取客户端信息*/
  ICls.CmdShell = function () {
    this.ass = 'cmd';
    this.cls = 'cmd';
    // this.data.push({"_dllDir":defaultDllDir+"/"});
    this.data.push({ _version: '1.0.0.0' });
    this.data.push({ _clientIPExp: '' });
    this.GetInfo = function () {
      this.data.push({ M_GetInfo: this.getMthParam(arguments) });
      return this;
    };
    this.GetIP = function () {
      this.data.push({ M_GetIP: this.getMthParam(arguments) });
      return this;
    };
    this.Run = function () {
      this.clear();
      this.data.push({ M_Run: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.EvalJs = function () {
      this.clear();
      this.data.push({ M_EvalJs: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.GetConfig = function () {
      this.clear();
      this.data.push({ M_GetConfig: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.CurrentUserEvalJs = function () {
      this.clear();
      this.data.push({ M_CurrentUserEvalJs: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
  };
  ICls.CmdShell.prototype = new ICls();
  ICls.CmdShell.prototype.constructor = ICls.CmdShell;
  var CmdShell = new ICls.CmdShell();
  /*工具类*/
  ICls.WebsysTool = function () {
    this.ass = 'WebsysTool';
    this.cls = 'WebsysTool.WebsysTool';
    this.data.push({ _dllDir: defaultDllDir + '/WebsysTool/WebsysTool.dll,WebsysTool/WebsysTool.pdb' });
    this.data.push({ _version: '1.0.0.1' });
    this.data.push({ _clientIPExp: '' });
    this.GetVersion = function () {
      this.clear();
      this.data.push({ M_GetVersion: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.SwitchBPLPrinterChannelByIndex = function () {
      this.clear();
      this.data.push({ M_SwitchBPLPrinterChannelByIndex: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.SwitchBPLPrinterChannel = function () {
      this.clear();
      this.data.push({ M_SwitchBPLPrinterChannel: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.SwitchToLanguageMode = function () {
      this.clear();
      this.data.push({ M_SwitchToLanguageMode: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.abc = function () {
      this.clear();
      this.data.push({ M_abc: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
  };
  ICls.WebsysTool.prototype = new ICls();
  ICls.WebsysTool.prototype.constructor = ICls.WebsysTool;
  var WebsysTool = new ICls.WebsysTool();
  /*中间件管理*/
  ICls.CMgr = function () {
    this.ass = 'mgr';
    this.cls = 'mgr';
    this.data.push({ _dllDir: defaultDllDir + '/WebsysServerSetup/WebsysServerSetup.zip' });
    this.data.push({ _version: '1.0.0.31' });
    this.data.push({ _clientIPExp: '' });
    this.getVersion = function () {
      this.data.push({ M_getVersion: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.FocusWindow = function () {
      this.clear();
      this.data.push({ M_FocusWindow: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
    this.moveWindow = function () {
      this.clear();
      this.data.push({ M_moveWindow: this.getMthParam(arguments) });
      if (arguments.length > 0 && 'function' == typeof arguments[arguments.length - 1]) {
        return this.invk(arguments[arguments.length - 1]);
      }
      return this.invk();
    };
  };
  ICls.CMgr.prototype = new ICls();
  ICls.CMgr.prototype.constructor = ICls.CMgr;
  var CMgr = new ICls.CMgr();
  window.CmdShell = CmdShell;

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
    var str = 'var objShell = new ActiveXObject("WScript.Shell");' + 'objShell.Run(iexplore.exe "' + url + '",0,true);';
    CmdShell.notReturn = 1;
    CmdShell.CurrentUserEvalJs(str);
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
})(window);
