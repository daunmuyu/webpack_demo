import Vue from 'vue';

import ChatInfoSend from './../chat-info-send';

import index from './index.html';


import './style.scss';

export default Vue.extend({
  template: index,
  data() {
    return {
    };
  },
  components: {
    ChatInfoSend,
  },
  mounted() {

  },
  methods: {
  },
});
