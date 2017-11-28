/**
 * LocalStorage.js
 * Created by luo on 2017/11/28.
 * 说明：多个页面标签打开同一个域名域名，localStorage内容是共享的
 */


let keyReg = /^[0-9A-Za-z_@-]*$/  // 键的正则表达式
let store;                        // localstorage实例

// 创建localStorage对象
function init() {
  if (typeof store === 'undefined') {
    store = window['localStorage'];
  }
  return true;
}

// 验证键值是否合法
function isValidKey(key) {
  if (typeof key !== 'String') {
    return false;
  }
  return keyReg.test(key);
}

exports = {
  // 设置localStorage单条记录
  set (key, value) {
    let ok = false;
    if (isValidKey(key) && init()) {
      try {
        store.setItem(key, value+'');
        ok = true;
      }catch (e) {console.error(e);}
    }
    return ok;
  },
  // 读取localStorage单条记录
  get (key) {
    if (isValidKey(key) && init()) {
      try {
        return store.getItem(key);
      }catch (e) {console.error(e);}
    }
    return null;
  },
  // 移除localhost单条记录
  remove (key) {
    if (isValidKey(key) && init()) {
      try {
        store.removeItem(key);
        return true;
      }catch (e) {console.error(e);}
    }
    return false;
  },
  // 清除localStorage所有记录
  clear () {
    if (init()) {
      try {
        for (let key in store) {
          store.removeItem(key);
        }
        return true;
      }catch (e) {console.error(e);}
    }
    return false;
  }
};

module.exports = exports;