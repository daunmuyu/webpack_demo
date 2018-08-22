import Vue from 'vue';
import VueRouter from 'vue-router';
import { Indicator } from 'mint-ui';
import 'mint-ui/lib/style.css';
// import API from './service/API';

import createRoute from './service/routes';

import '../../plugins/flexble';
import './style.scss';

const router = createRoute();

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  data() {
    return {
      utoken: '',
      transitionName: 'slide',
    };
  },
  watch: {
    // 监视路由，参数为要目标路由和当前页面的路由
    $route(to, from) {
      const toDepth = to.path.substring(0, to.path.length - 2).split('/').length;
      const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide';
    },
  },
  beforeCreate() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle',
    });
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // API.detaik({
      //   usertoken: '0pZt6norfcw90ls3SarbdrJr2rd3ZVX-kZ_MkdoaYtPnwwuIQ8jWZQ**'
      // }).then((res) => {
      //   console.log(res);
      // });
    },
  },
});
