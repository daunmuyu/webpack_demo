
const wx = window.wx;

module.exports = {
  init: ($, til, con, lik) => {
    $.ajax({
      url: 'https://luck.niuguwang.com/weixin/weixinshare.ashx',
      type: 'post',
      data: {
        url: encodeURIComponent(window.location.href.split('#')[0]),
      },
      success: (json) => {
        wx.config({
          debug: false,
          appId: 'wx8d6cb27c291ee266',
          timestamp: json.TimeStamp,
          nonceStr: json.Nonce,
          signature: json.Signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
          ],
        });
      },
    });
    wx.ready(() => {
      // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
      // alert('12');
      wx.checkJsApi({
        jsApiList: [
          'getNetworkType',
          'previewImage',
        ],
      });
      // 分享给朋友
      wx.onMenuShareAppMessage({
        title: til,
        desc: con,
        link: lik,
        imgUrl: 'https://www.niuguwang.com/img/logo/96.png',
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: til,
        link: lik,
        imgUrl: 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      wx.onMenuShareQQ({
        title: til,
        desc: con,
        link: lik,
        imgUrl: 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      // 分享到腾讯微博
      wx.onMenuShareWeibo({
        title: til,
        desc: con,
        link: lik,
        imgUrl: 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      wx.onMenuShareQZone({
        title: til,
        desc: con,
        link: lik,
        imgUrl: 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
    });
  },
};
