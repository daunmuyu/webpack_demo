/**
 * 中转事件总线
 */
import Vue from 'vue';

const eventBus = new Vue({
  data: {
    roomInfo: {},
    // 标记是否已经登陆
    hasLogin: false,
  },
});

export default eventBus;
