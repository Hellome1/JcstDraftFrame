/* 框架A
    轻量的jquery方法
*/

(function(global) {
    var C = function(param) {
        if (!(this instanceof C)) return new C(param);
        this.rawInput = param; //记录原始输入
        this._eles = [];
        this.init(param);
    };
    global.C = C;
    C.prototype = {
        constructor: C,
        init: function(param) {
            // 匹配输入以决定是否选择元素还是生成元素
            if ('string' === typeof param) {
                this.pattern.string.call(this, param)
            } else if (param instanceof HTMLElement){
                this._eles = [param];
            } else if (Array.isArray(param) && param[0] instanceof HTMLElement) {
                this._eles = param;
            }else if(param instanceof C) {
                this._eles = param._eles;
            }
        },
        pattern: {
            result: {},
            string: function(param) {
                // 匹配是选择还是生成
                if (param.indexOf('<') === -1) {
                    this.getter(param);
                } else {
                    this.setter(param);
                }
            },
            HTMLElement: function() {}
        },
        get: function() { return this._eles[0]; },
        getter: function(selector) {
            //获取页面的节点
            var eles = [];
            selector = selector || this.selector;
            var selectors = selector.split(' ');
            each();
            this._eles = eles;
            return this;

            function each() {
                var path = [];
                for (var i = 0; i < selectors.length; i++) {
                    var curselector = selectors[i];
                    curEl = getEl(curselector);
                    path.push(curEl);
                }
                var lastEl = path[path.length - 1];
                if (lastEl) {
                    for (var i = 0; i < lastEl.length; i++) {
                        eles.push(lastEl[i]);
                    }
                }
                eles.path = path;
            }
            function getEl(selector) {
                var firstChar = selector[0], restChars = selector.substr(1);
                var els = [];
                if (firstChar) {
                    if ('#' === firstChar) {
                        els.push(document.getElementById(restChars));
                    }
                    else if ('.' === firstChar) {
                        var htmlArr = document.getElementsByClassName(restChars);
                        for (var i = 0; i < htmlArr.length; i++) {
                            els.push(htmlArr[i]);
                        }
                    }
                }
                return els;
            }
        },
        setter: function(param) {
            //生成节点
            var eles = [];
            eles = tag_creator(param);
            //字符串对应
            // '<div onclick="EO.clickfn(\'>1\')">>1</div>'
            // 'tag开始符tag名 属性key=属性开始符属性value属性结束符tag结束符tag内容tag开始符/tag名tag结束符'
            /*  '<' tag开始符 '>' '/>' tag结束符
                在tag开始符和tag结束符之间 " \" \' 属性值开始符和属性值结束符 = 属性key和属性值分隔符
                
             */
            /* 
                概念： '开始符' '结束符' 例如 '<' '>'，结束符也可能是'/>'，总是成双成对出现，一旦匹配到开始符就要匹配到结束符才行
                        匹配过程，从匹配开始符开始直到匹配到结束符的过程
            */
            /* 逻辑，从左至右匹配，
                首先匹配<他的配对是>，中间的内容就为一个页签，匹配过程中如果出现另外的开始符那么就要优先匹配后出现的开始符的结束符，
               例如，">">,第一个结束符>不能匹配，因为又出现了另一个开始符"，就要匹配到结束符"才能继续匹配上一次开始符的结束符
                <>匹配后就有了一个开始tag，匹配到开始tag就要匹配结束tag，匹配结束tag的方法从后往前匹配结束符先匹配在匹配开始符，匹配
               成功则有了完整的tag，开始tag和结束tag之间为tag内容
                tag内容里可能有文本和元素两类，在tag内容里匹配tag开始符，如果有两个tag开始符如<5<div... 一后面匹配到的为准，匹配内容里的tag，
               tag内容里除了tag以外的部分都为tag文本，按照顺序插入父tag
                如此一来父tag就完整了，可以把以上逻辑封装为一个函数tagCreator入参字符串，子tag截取好字符串在调用该函数生成，利用递归生成完整的节点
            */

            this._eles = eles;
            return this;
        },
        on: function(type, cb) {
            for (var i = 0; i < this._eles.length; i++) {
                var el = this._eles[i];
                addListener(el, type, cb);
            }
            return this;
            function addListener(target, type, handler) {
                if(target.addEventListener){
                  target.addEventListener(type, handler, false);
                }else if(target.attachEvent){
                  target.attachEvent("on"+ type, handler);
                }else {
                  target["on"+type] = handler;
                }
            }
        },
        show: function() {
            for (var i = 0; i < this._eles.length; i++) {
                var el = this._eles[i];
                el.style.display = 'block';
            }
            return this;
        },
        hide: function() {
            for (var i = 0; i < this._eles.length; i++) {
                var el = this._eles[i];
                el.style.display = 'none';
            }
            return this;
        },
        isShow: function() {
            var el = this._eles[0];
            var disp =  el.style.display;
            return disp === 'block';
        },
        find: function(selectorStr) {
            if (!selectorStr) return this;
            var eles = [];
            var selectorArr = selectorStr.split(' ');
            var nextSelectorArr = selectorArr.filter(function(itm, ind) { return ind });
            var selector = selectorArr[0];
            eles = getEl.call(this, selector);
            return C(eles).find(nextSelectorArr.join(''));
            function getEl(selector) {
                var firstChar = selector[0], restChars = selector.substr(1);
                var els = [];
                if (firstChar) {
                    var htmlArr = [];
                    if ('#' === firstChar) {
                        htmlArr = this.getElementById(restChars);
                    }
                    else if ('.' === firstChar) {
                        htmlArr = this.getElementsByClassName(restChars);
                    }
                    for (var i = 0; i < htmlArr.length; i++) {
                        els.push(htmlArr[i]);
                    }
                }
                return els;
            }
        },
        getElementById: function(char) {
            var eles = this._eles;
            var domArr = [];
            eles.forEach(function(el) {
                var htmlArr = el.getElementById(char);
                for (var i = 0; i < htmlArr.length; i++) {
                    domArr.push(htmlArr[i]);
                }
            });
            return domArr;
        },
        getElementsByClassName: function(char) {
            var eles = this._eles;
            var domArr = [];
            var restArr = char.split('.').filter(function(itm, ind) {return ind;});
            if (restArr.length) {
                char = char.split('.')[0];
            }
            eles.forEach(function(el) {
                var htmlArr = el.getElementsByClassName(char);
                for (var i = 0; i < htmlArr.length; i++) {
                    if (restArr.length) {
                        var flag = true;
                        restArr.forEach(function(itm) {
                            if (htmlArr[i].className.indexOf(itm) === -1) {
                                flag = false;
                            }
                        })
                        if (flag) domArr.push(htmlArr[i]);
                    } else {
                        domArr.push(htmlArr[i]);
                    }
                }
            });
            return domArr;
        },
        closest: function(cls) {
            cls = cls[0] === '.' ? cls.substring(1) : cls;
            var eles = [], tar = this._eles[0];
            if (!tar) return this;
            var par = tar.parentNode;
            while (par) {
                if (par.className.indexOf(cls) > -1) {
                    eles.push(par);
                    break;
                }
                par = par.parentNode;
                if (par === document) {
                    break;
                }
            }
            this._eles = eles;
            return this;
        },
        parent: function() {
            var eles = [];
            for (var i = 0; i < this._eles.length; i++) {
                var el = this._eles[i];
                eles.push(el.parentNode);
            }
            this._eles = eles;
            return this;
        },
        prev: function() {
            var eles = [];
            for (var i = 0; i < this._eles.length; i++) {
                if (i === 0) {
                    var el = this._eles[i];
                    eles.push(el.previousElementSibling);
                }
            }
            this._eles = eles;
            return this;
        },
        after: function() {
            var eles = [];
            for (var i = 0; i < this._eles.length; i++) {
                if (i === 0) {
                    var el = this._eles[i];
                    eles.push(el.nextElementSibling);
                }
            }
            this._eles = eles;
            return this;
        },
        append: function(htmlContent) {
            return this.html(htmlContent);
        },
        html: function(htmlContent) {
            var eles = this._eles;
            if ('string' === typeof htmlContent) {
                eles.forEach(function(ele) {
                    ele.innerHTML = htmlContent;
                });
            } else if (htmlContent instanceof HTMLElement || htmlContent[0] instanceof HTMLElement) {
                this.appendChild(eles, htmlContent);
            }
            return this;
        },
        addClass: function(cls) {
            var eles = this._eles;
            for (var i = 0; i < eles.length; i++) {
                if (cls) eles[i].className += ' ' + cls;
            }
        },
        removeClass: function(cls) {
            var eles = this._eles;
            for (var i = 0; i < eles.length; i++) {
                if (cls) {
                    eles[i].className = eles[i].className.replace(' ' + cls, '');
                }
            }
        },
        hasClass: function(cls) {
            return this._eles[0] && this._eles[0].className.indexOf(' ' + cls) > -1;
        },
        css: function(a, b) {
            var eles = this._eles;
            if ('object' === typeof a) {
                for (var k in a) {
                    this.setStyle(eles, k, a[k]);
                }
            } else if ('string' === typeof a && 'string' === typeof b) {
                this.setStyle(eles, a, b);
            } else {
                console.error('input error!');
            }
        },
        setStyle: function(sk, sv) {
            var eles = this._eles;
            for (var i = 0; i < eles.length; i++) {
                eles[i].style[sk] = sv;
            }
        },
        appendChild: function(eles, content) {
            for (var i = 0; i < eles.length; i++) {
                if (content.length) {
                    for (var i = 0; i < content.length; i ++) {
                        eles[i].appendChild(content[i]);
                    }
                } else {
                    if (content[0]) eles[i].appendChild(content);
                }
            }
        },
		empty: function() {
			var eles = this._eles;
			for (var i = 0; i < eles.length; i++) {
				eles[i].innerHTML = '';
            }
			return this;
		}
    };

    if ('undefined' === typeof EO) EO = { clickfn: function(input){console.log(input)} };
    var tagCreator_testStr = '<div class="outer" style="background-color: red;" onclick="EO.clickfn(\'>1\')">>1<div class="innter"><2<i class="icon"></i></div></div>' //测试用字符串，测试功能
    function tag_creator(str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        var chs = div.childNodes
        return chs;
    }
})(window);


/* IE兼容器，兼容一些部分IE不兼容的方法，例如Array.map */
(function () {
    Array.prototype.map || (Array.prototype.map = function(cb) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(cb(this[i], i, this));
        }
        return arr;
    });
    Array.prototype.filter || (Array.prototype.filter = function(cb) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (cb(this[i], i, this)) arr.push(this[i])
        }
        return arr;
    });
    // Object.assign
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
    
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
                }
            }
            }
        }
        return target;
        };
    }

    window.tool_czy = {
        diffTime: function(time_a, time_b) {
            if ('string' === typeof time_a) {
                var ymd_a_arr = time_a.split(' ')[0].split(/-|\//),
                    hms_a_arr = time_a.split(' ')[1].split(':');
                var ymd_b_arr = time_b.split(' ')[0].split(/-|\//),
                    hms_b_arr = time_b.split(' ')[1].split(':');
                var a_weight = ymd_a_arr.join('') + hms_a_arr.join(''),
                    b_weight = ymd_b_arr.join('') + hms_b_arr.join('');
                var result = a_weight - b_weight;
                return result;
            }
        }
    }
})();