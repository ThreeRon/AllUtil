/**
 * InitRem.js
 * Created by luo on 2017/11/28.
 * 说明：脚本加载完即可执行，不要到页面资源和dom结构渲染完才执行
 */



/**
 * rem 随屏幕变化设置
 * @param doc         document对象
 * @param win         window对象
 * @param designW     设计稿宽
 * @param designH     设计稿高
 * @param remPerpx    每rem对应的px大小
 */
function remRest(doc, win, designW, designH, remPerpx) {
  // document对象
  let docEl = doc.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function() {
    var clientWidth = docEl.clientWidth || doc.body.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = remPerpx * (clientWidth / designW) + 'px';
    document.body.style.height = clientWidth * (designH / designW) + "px";
  };
  if (win.attachEvent) {
    win.attachEvent(resizeEvt, recalc);
    doc.attachEvent('DOMContentLoaded', recalc);
  } else {
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
}

exports = {
 remRest: remRest
}

module.exports = exports;
 
