import Vue from 'vue';
import { Indicator } from 'mint-ui';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import store from './../../store/index';
import VideoModule from './../../components/video';
import ChatInfoView from './../../components/chat-info-view';

import index from './index.html';
import './style.scss';

export default Vue.extend({
  template: index,
  store,
  data() {
    return {
      liveInfos: {},
      roomInfo: {
        liveType: '2',
      },
      showLogo: true,
    };
  },
  components: {
    VideoModule,
    ChatInfoView,
  },
  computed: {
    ...mapGetters(['liveInfo']),
  },
  watch: {
    liveInfo(val) {
      this.liveInfo = val;
      console.log(val);
    }
  },
  mounted() {
    this.init();
    console.log(this.liveInfo);
  },
  methods: {
    ...mapActions(['playLive']),
    init() {
      this.playLive({
        usertoken: '122',
        liveid: 570,
        packtype: 1,
      });
      console.log(this.liveInfo);
    },
  },
});
