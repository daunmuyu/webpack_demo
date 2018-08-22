/**
 * 数据接口
 */
import qs from 'qs';
import axios from 'axios';
import Cookie from 'js-cookie';
import { search } from './util.js';

const liveHost = 'https://live.niuguwang.com';
const dynHost = 'https://dynamic.niuguwang.com';
const apiHost = 'https://api.niuguwang.com';
const userHost = 'https://user.niuguwang.com';
const luckHost = 'https://luck.niuguwang.com';

const getToken = () => {
  return search('userToken') || search('usertoken') || Cookie.get('usertoken') || Cookie.get('userToken');
};

let address = 'chatroomh5';

const setAddress = () => {
  address = getToken() ? 'chatroom' : 'chatroomh5';
};

const get = (url, arg) => {
  let urls;
  if (typeof arg !== 'undefined') {
    if (url.indexOf('?') > -1) {
      urls = `${url}&${qs.stringify(arg)}`;
    } else {
      urls = `${url}?${qs.stringify(arg)}`;
    }
  } else {
    urls = url;
  }

  return axios.get(urls).then(res => res.data);
};

const post = (url, payload) => {
  const opts = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  return axios.post(url, qs.stringify(payload), opts).then(res => res.data);
};
export default {
  // 获取用户token
  getToken,
  /**
   * 获取当前直播间状态，基本数据
   */
  liveInfo(arg) {
    return get(`${liveHost}/video/Live/PlayLive`, arg);
  },
  /**
   * 录播信息
   */
  recordInfo(arg) {
    return get(`${liveHost}/video/app/PlayVideo`, arg);
  },
  /**
   * 主播的课程列表
   */
  anchorCourseList(arg) {
    return get(`${liveHost}/chat/Course/CourseList`, arg);
  },
  /**
   * 精彩视频列表
   */
  hotVideos(arg) {
    return get(`${liveHost}/video/App/RecommendRecord`, arg);
  },
  /**
   * 关注、取消关注 主播
   */
  followAnchor(arg) {
    return get(`${dynHost}/Api/friendop.ashx`, arg);
  },
  /**
   * 获取网易云信聊天室地址
   */
  getNERoomURL(arg) {
    return post(`${liveHost}/chat/chatroom/RequestAddr?roomId=${arg.roomId}`, arg);
  },
  /**
   * 获取网易云信 token
   */
  getNEToken(arg) {
    return post(`${liveHost}/chat/user/login`, arg);
  },
  /**
   * 获取历史消息
   */
  getChatHistory(arg) {
    setAddress();
    return post(`${liveHost}/chat/${address}/detail?roomId=${arg.roomId}&direction=-1&order=1`, arg);
  },
  /**
   * 获取只有主播的历史消息
   */
  getAnchorChatHistory(arg) {
    setAddress();
    return post(`${liveHost}/chat/${address}/mastersay?roomId=${arg.roomId}&id=${arg.id}&direction=-1&order=1`, arg);
  },
  /**
   * 发送消息
   */
  sendMsg(arg) {
    return post(`${liveHost}/chat/chatroom/SendMsg`, arg);
  },
  /**
   * 微信jssdk
   */
  weixinShare(arg) {
    return post(`${luckHost}/weixin/weixinshare.ashx`, arg);
  },
  hnShare(arg) {
    return post(`${userHost}/api_wap/wechathn/weixinShare.ashx`, arg);
  },
  videoListByCourseid(arg) {
    return get(`${apiHost}/subscribe/Strategy.ashx?action=getvideolist`, arg);
  },
  /**
   *获取直播推荐列表
   */
  getPublicCourse(arg) {
    return post(`${liveHost}/video/VideoList/PublicCourse`, arg);
  },
  // 获取验证码
  getCode(arg) {
    return post(`${userHost}/api_wap/ngw/getverifycode.ashx`, arg);
  },
  // 登录
  login(arg) {
    return post(`${userHost}/api_wap/ngw/mobileLogin.ashx`, arg);
  },
  // 牛人诊股列表
  getLiveList(arg) {
    return get(`${liveHost}/video/WeiXin/LiveList`, arg);
  },
  // 提交手机号
  postPhone(arg) {
    return post(`${liveHost}/video/WeiXin/AddMobileNo`, arg);
  },
  // VIP服务介绍页、
  postCourse(arg) {
    return get(`${apiHost}/subscribe/course.ashx`, arg);
  },
  // 交易观点
  postOpinion(arg) {
    return post(`${userHost}/api_wap/ngw/getUserOpinion.ashx`, arg);
  },
  // 预留手机号
  postMobile(arg) {
    return post(`${liveHost}/chat/ChatroomH5/ObtainMobile`, arg);
  },
  // 显示牛人动态
  getfeeduser(arg) {
    return get(`${dynHost}/api/feed/getfeeduser.ashx`, arg);
  },
  // 精品栏目
  getExcellentPart(arg) {
    return get(`${liveHost}/video/Excellent/GetExcellentPart`, arg);
  },
  // 是否购买课程
  getIsBuy(arg) {
    return get(`${apiHost}/subscribe/Denver.ashx?action=isbuy`, arg);
  },
  // 预告
  getTimeline(arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=coursetimeline`, arg);
  },
  // 内参
  getReport(arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=stockreportlist`, arg);
  },
  // 股票池
  getStockPool(arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=stockpoollist`, arg);
  },
  // 游客id
  getUser() {
    return post(`${userHost}/api_wap/ngw/anonymousreg.ashx`);
  },
  // 添加私信
  getChatRoom(arg) {
    return post('https://msg.niuguwang.com/api/addchatmessage.ashx', arg);
  },
  // 私信对话
  getChat(arg) {
    return post('https://smsg.niuguwang.com/api/lettergetdetail.ashx', arg);
  },
  // 助理信息
  getAssistant(arg) {
    return post('https://live.niuguwang.com/video/Live/PlayLive', arg);
  },
  assistantInfo(arg) {
    return post(`${liveHost}/chat/chatroomh5/getWeChatLive`, arg);
  },
  // 视频列表 -》 趋势稳赢
  videoList(arg) {
    return post('https://live.niuguwang.com/video/Excellent/VideoList', arg);
  },
  // 检查用户的登录状态
  loginStatus(arg) {
    return post('https://user.niuguwang.com/api_wap/ngw/checkUserStatus.ashx', arg);
  },
  detaik(arg) {
    return get('https://api.niuguwang.com/course/4370/catalog/detail', arg);
  },
};
