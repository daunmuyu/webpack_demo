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
  qsearch: function (key) {
    var res;
    var ss;
    var i;
    var sss;
    var s = location.search;
    if (s) {
      s = s.substr(1);
      if (s) {
        ss = s.split('&');
        for (i = 0; i < ss.length; i++) {
          sss = ss[i].split('=');
          if (sss && sss[0] === key) {
            res = sss[1];
          }
        }
      }
    }
    return res;
  },
  qmask: {
    show: function (flag) {
      var imgdownload = 'https://img.niuguwang.com/static/img/qmask/qmask-download.png';
      var imgopen = 'https://img.niuguwang.com/static/img/qmask/qmask-open.png';
      var src = flag ? imgopen : imgdownload;
      $('.qmask').find('img').attr('src', src)
        .end()
        .show();
    },
    hide: function () {
      $('.qmask').find('img').attr('src', '')
        .end()
        .hide();
    },
    init: function () {
      $('body').append('<div class="qmask"><img></div>');
      $('.qmask').css({
        display: 'none',
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        'text-align': 'center',
        'background-color': 'rgba(255, 255, 255, 0.9)',
        'z-index': '1200',
        cursor: 'pointer'
      });
      $('.qmask img').css({
        width: '10rem',
        'margin-top': '3rem',
        'z-index': '1210'
      });
      $(document).on('click', '.qmask', function () {
        $(this).hide().find('img')
          .attr('src', '');
      });
    }
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
module.exports = common;
