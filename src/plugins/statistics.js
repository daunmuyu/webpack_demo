// 腾讯统计
var _mtac = {};
(function() {
  var mta = document.createElement("script");
  mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  mta.setAttribute("name", "MTAH5");
  mta.setAttribute("sid", "500596128"); // h5.stockhn.com 统计
  // mta.setAttribute("sid", "500596132"); // h5.niuguwang.com 统计

  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mta, s);
})();
