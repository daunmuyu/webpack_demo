import Vue from 'vue';
import videoJs from 'video.js';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';

import index from './index.html';

import './style.scss';

export default Vue.extend({
  template: index,
  data() {
    return {
      roomInfo: {
        liveType: '1',
      },
      showLogo: false,
    };
  },
  computed: {
    ...mapGetters(['liveInfo']),
  },
  watch: {
    liveInfo(val) {
      this.roomInfo = val;
    }
  },
  mounted() {
    setTimeout(() => {
      Indicator.close();
    }, 2000);
  },
  methods: {
    ...mapActions(['followAnchor']),
    followInit() {
      const flag = this.liveInfo.isWatcher;
      this.followAnchor({
        usertoken: '0pZt6norfcw90ls3SarbdrJr2rd3ZVX-52XXGZg-HbTFHh4YHou5Qg**',
        relationid: this.liveInfo.userId,
        op: flag === '1' ? 0 : 1,
      }).then((res) => {
        if (res.code === 0) {
          Toast(res.message);
          this.liveInfo.isWatcher = (flag === '1' ? '0' : '1');
        } else {
          Toast(res.message || '操作失败，稍后重试');
        }
      });
    },
  },
});
