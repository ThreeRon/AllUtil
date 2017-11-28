/**
 * xmlHttpRequest.js
 * Created by luo on 2017/11/28.
 */

let xmlhttp = null;

function init() {
  if (xmlhttp === null) {
    if (window.XMLHttpRequest) {
      // code for IE7, Firefox, Opera, etc.
      xmlhttp = new XMLHttpRequest();
      return true;
    } else if (window.ActiveXObject) {
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      return true;
    } else {
      alert("Your browser does not support XMLHTTP.");
      return false;
    }
  }
  return true;
}

function get(option) {
  if (init()) {
    xmlhttp.onreadystatechange=state_Change(option.success, option.fail);
    xmlhttp.open("GET",option.url,true);
    xmlhttp.send(null);
  }
}

function state_Change(success, fail) {

}


