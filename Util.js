/*********************************************************************/
/*               日期操作                                                   
/*********************************************************************/
/**
 * 日期格式化，默认：yyyy-MM-dd hh:mm:ss
 * <li>使用：
 * <br>dateFormat() // "2018-01-23 14:32:02"
 * <br>dateFormat(new Date('2016-12-11')) // "2016-12-11 08:00:00"
 * <br>dateFormat(new Date('2016-12-11'), 'yy-MM-dd') // "16-12-11"
 * <br>dateFormat(new Date(), 'yyyy-MM-dd hh:mm') // "2018-01-23 14:35"
 * @param {*} date 
 * @param {*} fmt
 */
let dateFormat = function (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 获取间隔天数
 * <li>使用：
 * <br>getDaysBetweenDays (new Date('2017-12-13'), new Date('2017-12-22')); // 9
 * @param {*} dateInitial 开始日期
 * @param {*} dateFinal   结束日期
 */
let getDaysBetweenDays = function (dateInitial, dateFinal) {
  return (dateFinal - dateInitial) / (1000 * 3600 * 24);
}

/**
 * 获取倒计时
 * <li>使用：
 * <br>getEndTime('2018-12-12')  // "剩余时间：322天 14小时 7分钟 7秒"
 * @param {*} endTime 
 */
let getEndTime = function (endTime) {
  let startDate = new Date(); //开始时间，当前时间
  let endDate = new Date(endTime); //结束时间，需传入时间参数
  let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }
  return "剩余时间：" + d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

/*********************************************************************/
/*               字符串操作                                                   
/*********************************************************************/
/**
 * utf8获取字符串长度，中文按3个字符计算
 * <li>使用：
 * <br>getStrLeng('在z') // 4
 * @param {*} str
 */
let getStrLeng = function (str) {
  let realLength = 0;
  let len = str.length;
  let charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      // 如果是中文则长度加3
      realLength += 3;
    }
  }
  return realLength;
}

/**
 * utf8:获取字符串长度，中文按3个字符计算
 * <li>使用：
 * <br>getStrLeng('在z') // 4
 * @param {*} str
 */
function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

/*********************************************************************/
/*               URL                                                  
/*********************************************************************/

/**
 * url参数转为json格式
 * <li>使用：
 * <br> getQueryObj()   // Object { t: "resource/res_main", id: "mp1421141013" }
 * <br>getQueryObj('https://hao.360.cn/?src=lm&ls=n36a7f6a197&z=%E4%B8%AD') // {src: "lm", ls: "n36a7f6a197", z: "%E4%B8%AD"}
 * 
 * @param {*} search 不传参数默认是url地址
 */
let getQueryObj = function (search = window.location.href) {
  return ((querystring = '') => (q => (querystring.split('&').forEach(item => (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);
}

/**
 * 获取url中的某个参数值(返回的是转码)
 * <li>使用：
 * <br>getQueryString('src') // "lm"
 * <br>getQueryString('src', 'https://hao.360.cn/?src=laaaaam&ls=n36a7f6a197&z=%E4%B8%AD')  // "laaaaam"
 * @param {*} key 
 * @param {*} search
 */
let getQueryString = function (key, url = window.location.href) {
  let search = url.split('?');
  if (search.length < 2) return '';
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let r = search[1].match(reg);
  if (r != null) {
    return r[2];
  }
  return '';
}

/**
 * 过滤URL部分参数
 * <li>使用：
 * <br>queryFilter(['src'], {newkey: 'newval'}) // "https://mp.weixin.qq.com/wiki?id=mp1421141013&newkey=newval"
 * <br>queryFilter(['src'], {newkey: 'newval'}, 'http://www.baidu.com/?src=aaa') // "http://www.baidu.com/?newkey=newval"
 * @param {*} params 要过滤的参数，参数名数组
 * @param {*} newParams 要添加的参数，obj对象
 */
let queryFilter = function (params, newParams, url = window.location.href) {
  params = params || [];
  newParams = newParams || {};
  url = url.split('?');
  let search = url.length < 2 ? '' : url[1];
  let queryArr = search.split('&');
  let query = {};
  for (let i = 0; i < queryArr.length; i++) {
    if (queryArr[i].length > 0) {
      let temp = queryArr[i].split('=');
      query[temp[0]] = temp[1];
    }
  }
  for (let key in newParams) {
    query[key] = newParams[key];
  }
  let newSearch = '';
  for (let key in query) {
    if (params.indexOf(key) !== -1) continue;
    newSearch = newSearch + key + '=' + query[key] + '&';
  }
  newSearch = newSearch.replace(/&{1}$/, '');
  if (newSearch.length > 0) newSearch = '?' + newSearch;
  var href = url[0] + newSearch;
  return href;
}

/*********************************************************************/
/*               Array                                                
/*********************************************************************/

/**
 * n维数组展开成一维数组
 * <li>使用：
 * <br>flatten([[1,2], [3], [4,5]])  // [1, 2, 3, 4, 5]
 * @param {*} arr
 */
let flatten = function (arr) {
  return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr;
}

/**
 * 数组去重
 * <li>使用：
 * <br>removeRepeatArray([1,1,2,3,4,3])  // [1, 2, 3, 4]
 * @param {*} arr
 */
let removeRepeatArray = function (arr) {
  return Array.from(new Set(arr))
}

/**
 * 筛选数组
 * <li>使用：
 * <br>removeArrayForValue(['test','test1','test2','aaa'],'test')     //  ["test1", "test2", "aaa"]
 * <br>removeArrayForValue(['test','test1','test2','aaa'],'test','%') // ["aaa"]
 * @param {*} arr 源数组
 * @param {*} val 要删除的值
 * @param {*} type 全等删除还是模糊删除
 */
let removeArrayForValue = function (arr, val, type) {
  return arr.filter(function (item) {
    return type ? item.indexOf(val) === -1 : item !== val
  })
}


/*********************************************************************/
/*               其它操作                                                   
/*********************************************************************/

/**
 * 生成6位数字验证码
 * <li>使用：
 * <br>createCheckCode() // "511322"
 */
let createCheckCode = function () {
  return Math.random().toString().slice(-6);
}

/**
 * 生成随机数
 * <li>使用：
 * <br>randomNum()   // 返回0~100间的随机数
 * <br>randomNum(9)  // 返回0~9间的随机数
 * <br>randomNum(4,8)// 返回4~8间的随机数
 * @param {*} n1 
 * @param {*} n2 
 */
let randomNum = function (n1, n2) {
  if (arguments.length === 0) { // 不传参数，默认返回100内的随机数
    return Math.round(Math.random() * 100);
  }
  if (arguments.length === 1) { // 返回0到n1之间的随机数
    return Math.round(Math.random() * n1);
  }
  if (arguments.length === 2) { // 返回n1到n2之间的随机数
    return Math.round(n1 + Math.random() * (n2 - n1));
  }
}

/**
 * 生成16进制颜色
 * <li>使用：
 * <br>createColor() // "#706282"
 */
let createColor = function () {
  return '#' + `00000${(Math.random() * 0x1000000 << 0).toString(16)}`.slice(-6);
}

/**
 * 特殊字符转义
 * <li>使用：
 * <br>htmlspecialchars('<div>Test</div>')  // "&lt;div&gt;Test&lt;/div&gt;"
 * @param {*} str
 */
let htmlspecialchars = function (str) {
  str = str.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, '&quot;');
  return str;
}

/**
 * 动态插入 script
 * @param {*} src 
 */
let injectScript = function (src) {
  let s, t;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

/**
 * 千分符
 * <li>使用：
 * <br>formatNum(1000.0001)  // "1,000.0,001"
 * @param {*} num
 */
let formatNum = function (num) {
  return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


/**
 * 正则校验
 * <li> 使用：
 * <br>validate('12345678','phone')    // false
 * <br>validate('15914308294','phone') // true
 * @param {*} str  要校验的字符串
 * @param {*} type 校验类型，有email,phone,tel,number,english,chinese,lower,upper
 */
let validate = function (str, type) {
  switch (type) {
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'phone':
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
      return /^[0-9]$/.test(str);
    case 'english':
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese':
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower':
      return /^[a-z]+$/.test(str);
    case 'upper':
      return /^[A-Z]+$/.test(str);
    default:
      return true;
  }
}

/**
 * 校验密码强度
 * <li> 使用：
 * <br>checkPwd('123')  // 0
 * <br>checkPwd('123abc') // 2
 * <br>checkPwd('123abcABC') // 3
 * <br>checkPwd('123abcABC_') // 4
 * @param {*} str
 */
let checkPwd = function (str) {
  var nowLv = 0;
  if (str.length < 6) {
    return nowLv
  };
  if (/[0-9]/.test(str)) {
    nowLv++
  };
  if (/[a-z]/.test(str)) {
    nowLv++
  };
  if (/[A-Z]/.test(str)) {
    nowLv++
  };
  if (/[\.|-|_]/.test(str)) {
    nowLv++
  };
  return nowLv;
}

/**
 * 金额大写转换
 * @param {*} n 金额
 */
let upDigit = function (n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head +
    s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

/**
 * 屏幕适配
 * @param {*} designW 设计图宽度
 */
let resetFontSize = function (designW) {
  let doc = document,
    win = window;
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //如果屏幕大于设计图宽度，就设置clientWidth=designW，防止font-size会超过100px
      if (clientWidth > designW) clientWidth = designW;
      //设置根元素font-size大小
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
  //屏幕大小改变，或者横竖屏切换时，触发函数
  win.addEventListener(resizeEvt, recalc, false);
  //文档加载完成时，触发函数
  doc.addEventListener('DOMContentLoaded', recalc, false);
}

/*********************************************************************/
/*               cookie 操作                                                   
/*********************************************************************/

/**
 * 设置cookie
 * @param {*} name   名
 * @param {*} value  值
 * @param {*} iDay   有效天数
 */
function setCookie(name, value, iDay) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = `${name}=${value};expires=${oDate}`;
}

/**
 * 根据键名获取cookie
 * @param {*} name 
 */
function getCookie(name) {
  var arr = document.cookie.split(';');
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}

/**
 * 根据键名删除cookie
 * @param {*} name 
 * 说明：依赖setCookie方法
 */
function removeCookie(name) {
  setCookie(name, 1, -1);
}

/*********************************************************************/
/*               DOM 操作                                                   
/*********************************************************************/

/**
 * 检测元素是否存在指定class
 * <li>使用：
 * <br>hasClass(document.getElementsByClassName('autohide')[0], 'autohide') // true
 * @param {*} el          DOM元素
 * @param {*} classStr    class名
 */
let hasClass = function (el, classStr) {
  let classArr = el.className.split(/\s+/);
  return classArr.indexOf(classStr) === -1 ? false : true
}

/**
 * 向元素添加class
 * <li>说明：依赖 hasClass方法
 * <li>使用：
 * <br>addClass(document.getElementsByClassName('autohide')[0], 'autohide1')
 * @param {*} el         DOM元素
 * @param {*} classStr   class名
 */
let addClass = function (el, classStr) {
  if (!hasClass(el, classStr)) {
    el.className += ' ' + classStr;
  }
  return el;
}

/**
 * 删除元素指定的class
 * <li>说明：依赖 hasClass方法
 * <li>使用：
 * <br>removeClass(document.getElementsByClassName('autohide')[0], 'autohide1')
 * @param {*} el        DOM元素
 * @param {*} classStr  class名
 */
let removeClass = function (el, classStr) {
  if (hasClass(el, classStr)) {
    let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
    el.className = el.className.replace(reg, '');
  }
  return el;
}

/**
 * 替换元素class
 * <li>说明：依赖于hassClass方法，addClass方法，removeClass方法
 * <li>使用：
 * <br>replaceClass(document.getElementsByClassName('autohide')[0], 'autohide', 'autohide1')
 * @param {*} el        DOM元素 
 * @param {*} oldClass  新被替换的class
 * @param {*} newClass  要替换的class
 */
let replaceClass = function (el, oldClass, newClass) {
  removeClass(el, oldClass);
  addClass(el, newClass);
  return el;
}

/**
 * 设置Css
 * <li>使用：
 * <br>css(document.getElementsByClassName('autohide')[0], {background:'red'})
 * @param {*} el 
 * @param {*} cssObj
 */
let css = function (el, cssObj) {
  for (let key in cssObj) {
    el.style[key] = cssObj[key]
  }
  return el;
}

/**
 * 获取元素的文本内容
 * <li>使用：
 * <br>html(document.getElementsByClassName('CentHid')[0])            // 获取文本内容
 * <br>html(document.getElementsByClassName('CentHid')[0],'test---')  // 设置文本内容
 * @param {*} el  DOM元素
 */
let html = function (el) {
  if (arguments.length === 1) {
    return el.innerHTML;
  }
  if (arguments.length === 2) {
    el.innerHTML = arguments[1];
    return arguments[1];
  }
}

/**
 * 获取指定元素的兄弟元素
 * <li>使用：
 * <br>siblings(document.getElementsByClassName('autohide')[0])
 * <br>siblings(document.getElementsByClassName('autohide')[0], true)
 * @param {*} el          DOM元素
 * @param {*} isSameTag   兄弟元素是否是相同的标签
 */
let siblings = function (el, isSameTag = false) {
  let nodeName = el.nodeName;
  let arr = []; //定义一个数组，用来存兄弟元素 
  let pre = el.previousSibling;
  while (pre) { //先取el的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
    if (pre.nodeType === 1 && (isSameTag ? pre.nodeName === nodeName : true)) {
      arr.push(pre);
    }
    pre = pre.previousSibling //最后把上一个节点赋给p 
  }
  arr.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
  let next = el.nextSibling;
  while (next) {
    if (next.nodeType === 1 && (isSameTag ? next.nodeName === nodeName : true)) {
      arr.push(next);
    }
    next = next.nextSibling;
  }
  return arr;
}
