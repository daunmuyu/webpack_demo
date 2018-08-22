var ua = window.navigator.userAgent;
var common = {
  qurl: {
    wwwurl: 'http://www.niuguwang.com/',
    apkurl: 'https://swww.niuguwang.com/download.ashx?channel=ngw',
    iosurl: 'https://itunes.apple.com/cn/app/id855046551',
    yyburl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.niuguwang.stock&g_f=991653'
  },
  qvendor: {
    mobile: /AppleWebKit.*Mobile.*/.test(ua),
    android: /android/gi.test(ua),
    ios: /(iphone|ipad|ipod)/gi.test(ua),
    iphone: /iphone/gi.test(ua),
    ipad: /ipad/gi.test(ua),
    ipod: /ipod/gi.test(ua),
    weixin: /micromessenger/gi.test(ua),
    qq: / qq/gi.test(ua),
    qqb: /mqqbrowser/gi.test(ua),
    weibo: /weibo/gi.test(ua)
  },
  download: function () {
    if (common.qvendor.mobile) {
      if (common.qvendor.weixin || common.qvendor.qq || common.qvendor.qqb) {
        if (common.qvendor.ios) {
          location.href = common.qurl.yyburl;
        }
        if (common.qvendor.android) {
          location.href = common.qurl.yyburl;
        }
        return;
      }
      if (common.qvendor.weibo) {
        if (common.qvendor.ios) {
          common.qmask.show();
        }
        if (common.qvendor.android) {
          location.href = common.qurl.apkurl;
        }
        return;
      }
      if (common.qvendor.ios) {
        location.href = common.qurl.iosurl;
      }
      if (common.qvendor.android) {
        location.href = common.qurl.apkurl;
      }
    } else {
      location.href = common.qurl.wwwurl;
    }
  }
};

function init () {
  const imgs = document.createElement('img');
  imgs.src = 'https://swww.niuguwang.com/msg/stock/image/download.jpg';
  const container = document.body;
  container.appendChild(imgs);
  container.style.width = '100%';
  imgs.style.position = 'fixed';
  imgs.style.left = 0;
  imgs.style.bottom = 0;
  imgs.style.width = '100%';
  imgs.style.height = 'auto';
  imgs.style.zIndex = 1001;
  imgs.style.margin = '0 auto';
  imgs.onclick = function () {
    if (common.qvendor.android) {
      location.href = 'niuguwang.scheme://';
    }
    if (common.qvendor.ios) {
      location.href = 'ngwre://';
    }
    setTimeout(function () {
      common.download();
    }, 500);
  }
}
init();


