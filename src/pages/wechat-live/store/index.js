
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    // 用户信息
    userInfo: {},
    liveInfo: {},
    // 聊天室信息
    chatroomInfo: {
      appKey: '3b95e461fd9bbc17dc72e638d5a5fcf8',
      chatroomId: '9659068',
      liveId: '570',
      coursname: '趋势稳盈',
      liveuserid: '9507147',
    },
    // 老师列表
    teacherList: [],
    // 错误信息
    errorMsg: '',
    // 当前播放
    playlive: {},
    // 精彩视频
    videoList: {},
    // 聊天信息
    chatMsgs: [],
    // 当前表情
    currEmoji: {
      add: false,
      cont: '',
    },
    // 视频信息
    major: {},
    // 视频类型
    liveType: '',
    // 显示控制
    showStrust: {
      // 登录
      login: false,
      // 课程介绍
      class: false,
      // 老师介绍
      teacher: false,
      // 课程表
      schedule: false,
      // 表情栏
      emoji: false,
    },
  },
  actions,
  getters,
  mutations,
});
