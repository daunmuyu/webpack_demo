/**
 * 数据接口
 */
import qs from 'qs';
import axios from 'axios';
import Cookie from 'js-cookie';
import { search } from './tools';

const liveHost = 'https://live.niuguwang.com';
const dynHost = 'https://dynamic.niuguwang.com';
const apiHost = 'https://api.niuguwang.com';
const userHost = 'https://user.niuguwang.com';
const luckHost = 'https://luck.niuguwang.com';

const getToken = () => {
  return search('userToken') || search('usertoken') || Cookie.get('usertoken');
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
  // 获取usertoken
  // getUtoken({ commit }, arg) {

  // },
  /**
   * 获取当前直播间状态，基本数据
   */
  playLive({ commit }, arg) {
    get(`${liveHost}/video/Live/PlayLive`, arg).then(res => {
      commit('LIVEINFO', res.data);
    });
  },
  /**
   * 录播信息
   */
  recordInfo({ commit }, arg) {
    return get(`${liveHost}/video/app/PlayVideo`, arg);
  },
  /**
   * 主播的课程列表
   */
  anchorCourseList({ commit }, arg) {
    return get(`${liveHost}/chat/Course/CourseList`, arg);
  },
  /**
   * 精彩视频列表
   */
  hotVideos({ commit }, arg) {
    return get(`${liveHost}/video/App/RecommendRecord`, arg);
  },
  /**
   * 关注、取消关注 主播
   */
  followAnchor({ commit }, arg) {
    return get(`${dynHost}/Api/friendop.ashx`, arg);
  },
  /**
   * 获取网易云信聊天室地址
   */
  getNERoomURL({ commit }, arg) {
    return post(`${liveHost}/chat/chatroom/RequestAddr?roomId=${arg.roomId}`, arg);
  },
  /**
   * 获取网易云信 token
   */
  getNEToken({ commit }, arg) {
    return post(`${liveHost}/chat/user/login`, arg);
  },
  /**
   * 获取历史消息
   */
  getChatHistory({ commit }, arg) {
    setAddress();
    return post(`${liveHost}/chat/${address}/detail?roomId=${arg.roomId}&direction=-1&order=1`, arg);
  },
  /**
   * 获取只有主播的历史消息
   */
  getAnchorChatHistory({ commit }, arg) {
    setAddress();
    return post(`${liveHost}/chat/${address}/mastersay?roomId=${arg.roomId}&id=${arg.id}&direction=-1&order=1`, arg);
  },
  /**
   * 发送消息
   */
  sendMsg({ commit }, arg) {
    return post(`${liveHost}/chat/chatroom/SendMsg`, arg);
  },
  /**
   * 微信jssdk
   */
  weixinShare({ commit }, arg) {
    return post(`${luckHost}/weixin/weixinshare.ashx`, arg);
  },
  hnShare({ commit }, arg) {
    return post(`${userHost}/api_wap/wechathn/weixinShare.ashx`, arg);
  },
  videoListByCourseid({ commit }, arg) {
    return get(`${apiHost}/subscribe/Strategy.ashx?action=getvideolist`, arg);
  },
  /**
   *获取直播推荐列表
   */
  getPublicCourse({ commit }, arg) {
    return post(`${liveHost}/video/VideoList/PublicCourse`, arg);
  },
  // 获取验证码
  getCode({ commit }, arg) {
    return post(`${userHost}/api_wap/ngw/getverifycode.ashx`, arg);
  },
  // 登录
  login({ commit }, arg) {
    return post(`${userHost}/api_wap/ngw/mobileLogin.ashx`, arg);
  },
  // 牛人诊股列表
  getLiveList({ commit }, arg) {
    return get(`${liveHost}/video/WeiXin/LiveList`, arg);
  },
  // 提交手机号
  postPhone({ commit }, arg) {
    return post(`${liveHost}/video/WeiXin/AddMobileNo`, arg);
  },
  // VIP服务介绍页、
  postCourse({ commit }, arg) {
    return get(`${apiHost}/subscribe/course.ashx`, arg);
  },
  // 交易观点
  postOpinion({ commit }, arg) {
    return post(`${userHost}/api_wap/ngw/getUserOpinion.ashx`, arg);
  },
  // 预留手机号
  postMobile({ commit }, arg) {
    return post(`${liveHost}/chat/ChatroomH5/ObtainMobile`, arg);
  },
  // 显示牛人动态
  getfeeduser({ commit }, arg) {
    return get(`${dynHost}/api/feed/getfeeduser.ashx`, arg);
  },
  // 精品栏目
  getExcellentPart({ commit }, arg) {
    return get(`${liveHost}/video/Excellent/GetExcellentPart`, arg);
  },
  // 是否购买课程
  getIsBuy({ commit }, arg) {
    return get(`${apiHost}/subscribe/Denver.ashx?action=isbuy`, arg);
  },
  // 预告
  getTimeline({ commit }, arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=coursetimeline`, arg);
  },
  // 内参
  getReport({ commit }, arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=stockreportlist`, arg);
  },
  // 股票池
  getStockPool({ commit }, arg) {
    return post(`${apiHost}/subscribe/trendcourse.ashx?action=stockpoollist`, arg);
  },
  // 游客id
  getUser() {
    return post(`${userHost}/api_wap/ngw/anonymousreg.ashx`);
  },
  // 添加私信
  getChatRoom({ commit }, arg) {
    return post('https://msg.niuguwang.com/api/addchatmessage.ashx', arg);
  },
  // 私信对话
  getChat({ commit }, arg) {
    return post('https://smsg.niuguwang.com/api/lettergetdetail.ashx', arg);
  },
  // 助理信息
  getAssistant({ commit }, arg) {
    return post('https://live.niuguwang.com/video/Live/PlayLive', arg);
  },
  assistantInfo({ commit }, arg) {
    return post(`${liveHost}/chat/chatroomh5/getWeChatLive`, arg);
  },
  // 视频列表 -》 趋势稳赢
  videoList({ commit }, arg) {
    return post('https://live.niuguwang.com/video/Excellent/VideoList', arg);
  },
  // 检查用户的登录状态
  loginStatus({ commit }, arg) {
    return post('https://user.niuguwang.com/api_wap/ngw/checkUserStatus.ashx', arg);
  },
  detaik({ commit }, arg) {
    return get('https://api.niuguwang.com/course/4370/catalog/detail', arg);
  },
};
