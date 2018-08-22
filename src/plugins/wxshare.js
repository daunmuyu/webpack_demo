
const wx = window.wx;

const $toData = (obj) => {
  if (obj == null){
    return obj;
  }
  const arr = [];
  for (let i in obj){
    const str = `${i}=${obj[i]}`;
    arr.push(str);
  }
  return arr.join('&');
}

const ajax = (obj) => {
  //指定提交方式的默认值
  obj.type = obj.type || 'get';
  //设置是否异步，默认为true(异步)
  obj.async = obj.async || true;
  //设置数据的默认值
  obj.data = obj.data || null;

  let ajaxs = null;
  if (window.XMLHttpRequest){
    //非ie
    ajaxs = new XMLHttpRequest();
  }else{
    //ie
    ajaxs = new ActiveXObject('Microsoft.XMLHTTP');
  }
  //区分get和post
  if (obj.type == 'post') {
    ajaxs.open(obj.type, obj.url, obj.async);
    ajaxs.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const data = $toData(obj.data);
    ajaxs.send(data);
  } else {
    //get  test.php?xx=xx&aa=xx
    const url = `${obj.url}?${$toData(obj.data)}`;
    ajaxs.open(obj.type,url,obj.async);
    ajaxs.send();
  }

  ajaxs.onreadystatechange = function (){
    if (ajax.readyState == 4){
      if (ajax.status >= 200 && ajax.status < 300 || ajax.status == 304){
        if (obj.success) {
          obj.success(ajax.responseText);
        }
      }else {
        if (obj.error) {
          obj.error(ajax.status);
        }
      }
    }
  }    
}

// opts {
  // til: '', 分享标题
//   cont: '', 分享简介摘要
//   lik: '', 分享地址链接
//   imgsrc: '', 分享图标
//   flag: false, 分享域名地址（true niuguwang  || false stockhn）
// }

export default {
  init: (opts) => {
    ajax({
      url: opts.flag ? 'https://luck.niuguwang.com/weixin/weixinshare.ashx' : 'https://user.niuguwang.com/api_wap/wechathn/weixinShare.ashx',
      type: 'post',
      data: {
        url: encodeURIComponent(window.location.href.split('#')[0]),
      },
      success: (json) => {
        wx.config({
          debug: false,
          appId: opts.flag ? 'wx8d6cb27c291ee266' : 'wx780f11ff3f3188dd',
          timestamp: json.TimeStamp || json.timeStamp,
          nonceStr: json.Nonce || json.nonce,
          signature: json.Signature || json.signature,
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
        title: opts.til,
        desc: opts.cont,
        link: opts.lik,
        imgUrl: opts.imgsrc || 'https://www.niuguwang.com/img/logo/96.png',
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
        title: opts.til,
        link: opts.lik,
        imgUrl: opts.imgsrc || 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      wx.onMenuShareQQ({
        title: opts.til,
        desc: opts.cont,
        link: opts.lik,
        imgUrl: opts.imgsrc || 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      // 分享到腾讯微博
      wx.onMenuShareWeibo({
        title: opts.til,
        desc: opts.cont,
        link: opts.lik,
        imgUrl: opts.imgsrc || 'https://www.niuguwang.com/img/logo/96.png',
        success: () => {
          // 用户确认分享后执行的回调函数
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        },
      });
      wx.onMenuShareQZone({
        title: opts.til,
        desc: opts.cont,
        link: opts.lik,
        imgUrl: imgsrc || 'https://www.niuguwang.com/img/logo/96.png',
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
