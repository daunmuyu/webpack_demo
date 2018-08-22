import Vue from 'vue';
import {
  Indicator,
  // Toast,
  MessageBox,
} from 'mint-ui';

import videojs from 'video.js';
import 'videojs-contrib-hls';
import 'mint-ui/lib/style.min.css';
import 'video.js/dist/video-js.css';

import { search } from './service/util';
import API from './service/API';

import './broadcasting.scss';

new Vue({
  el: '#app',
  data() {
    return {
      hasMore: true,
      // 当前在播放的视频的信息
      videoInfo: {},
      // video 的 dom对象
      videoDom: {},
      // 视频原始数据
      dataList: [],
      // 视频列表展示数据
      roomList: [],
      usertoken: '',
      liveId: search('lid'),
      videoId: search('vid'),
    };
  },
  beforeCreate() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle',
    });
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.videoDom = document.getElementById("liveVideo");
    });
  },
  beforeDestroy() {
    this.videoDom.dispose();
  },
  methods: {
    init() {
      API.recordInfo({
        videoid: this.videoId,
        liveid: this.liveId,
        version: '9.9.9',
        usertoken: API.getToken(),
      }).then((res) => {
        if (res && res.code === 0) {
          this.videoInfo = res.data;
          Indicator.close();
          // this.handleDataReady(res);
        } else {
          MessageBox.alert('进入房间失败, 点击确定返回').then(() => {
            window.history.go(-1);
          });
        }
      }, () => {
        Indicator.close();
      });
    },
    openVideo(item) {
      location.href = `${location.origin}${location.pathname}?lid=${item.mainId}&vid=${item.videoid}`;
    },
    loadMore() {

    },
  },
});

