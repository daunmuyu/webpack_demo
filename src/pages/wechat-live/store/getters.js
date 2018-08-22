import { WSAECONNABORTED } from "constants";

export default {
  // 登录状态
  isLogin(state) {
    return state.isLogin;
  },
  // 登录modal
  loginModal(state) {
    return state.showStrust.login;
  },
  // 用户信息
  userInfo(state) {
    return state.userInfo;
  },
  // 直播间信息
  liveInfo(state) {
    return state.liveInfo;
  },
  // 房间信息
  roomInfo(state) {
    return state.chatroomInfo;
  },
  // 聊天信息
  chatMsgs(state) {
    return state.chatMsgs;
  },
  // 老师列表
  teacherList(state) {
    return state.teacherList;
  },
  // 老师modal
  teacherModal(state) {
    return state.showStrust.teacher;
  },
  // 错误提示
  error(state) {
    return state.errorMsg;
  },
  // 聊天表情
  emojiShow(state) {
    return state.showStrust.emoji;
  },
  // 当前选择表情
  currEmoji(state) {
    return state.currEmoji;
  },
  // 视频类型
  liveType(state) {
    return state.liveType;
  },
  // 视频信息
  major(state) {
    return state.major;
  },
  // 课程介绍Modal
  classModal(state) {
    return state.showStrust.class;
  },
  // 课程表Modal
  scheduleModal(state) {
    return state.showStrust.schedule;
  },
};
