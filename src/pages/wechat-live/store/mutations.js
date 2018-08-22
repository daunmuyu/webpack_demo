import * as types from './mutation-types.js';

export default {
  // 用户信息
  [types.USER_INFO](s, info) {
    s.userInfo = info;
  },
  // 聊天室信息
  [types.CHATROOM_INFO](s, info) {
    s.chatroomInfo = Object.assign({}, s.chatroomInfo, info);
  },
  // 老师列表
  [types.TEACHER_LIST](s, list) {
    s.teacherList = list;
  },
  // 历史消息
  [types.HISTORY_MSG](s, msgs) {
    s.chatMsgs = Object(msgs, s.chatMsg);
  },
  // 新消息
  [types.CHAT_MSG](s, msg) {
    s.chatMsgs.push(msg);
  },
  // 错误提示
  [types.ERROR_MSG](s, msg) {
    s.errorMsg = msg;
  },
  // 视频信息
  [types.MAJOR](s, major) {
    s.major = major;
  },
  // 获取直播间基础信息
  [types.LIVEINFO](s, liveInfo) {
    s.liveInfo = liveInfo;
  },
  // 老师modal
  showTeacher(s, payload) {
    s.showStrust.teacher = payload;
  },
  // 登录modal
  showLogin(s, payload) {
    s.showStrust.login = payload;
  },
  // 登录状态
  setLogin(s, payload) {
    s.isLogin = payload;
  },
  // 清空消息
  clearMsgs(s) {
    s.chatMsgs = [];
  },
  // 只看老师消息
  watchTeacher(s) {
    s.chatMsgs = s.chatMsgs.filter((i) => {
      const arr = i.contentFormat[0];
      if (!arr) return '';
      return i.userIcons[0] >= 9;
    });
  },
  // 设置表情栏
  setEmojiShow(s, payload) {
    s.showStrust.emoji = payload;
  },
  // 当前选择表情
  addEmoji(s, payload) {
    s.currEmoji = payload;
  },
  // 设置视频类型
  setLiveType(s, type) {
    s.liveType = type;
  },
  // 课程介绍
  showClass(s, payload) {
    s.showStrust.class = payload;
  },
  // 课程表
  showSchedule(s, payload) {
    s.showStrust.schedule = payload;
  },
};
