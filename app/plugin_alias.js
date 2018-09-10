var path = require('path');
var containerPath = path.resolve('./');

var alias = {
  tip: path.resolve(containerPath, './app/src/custom_plugins/tip'),
  common: path.resolve(containerPath, './app/src/_/js/download.js'),
  bridge: path.resolve(containerPath, './app/src/custom_plugins/javascript_bridge/src/bridge.js'),
  NGW: path.resolve(containerPath, './app/src/_/js/download.js'),
  wx: path.resolve(containerPath, './app/src/_/js/WXHelper.js'),
  jweixin: path.resolve(containerPath, './app/src/plugins/jweixin-1.0.0.js'),
  vue: path.resolve(containerPath, './node_modules/vue/dist/vue.min.js'),
  hls: path.resolve(containerPath, './node_modules/hls.js/dist/hls.js'),
  "mint-ui": path.resolve(containerPath, './node_modules/mint-ui/'),
  "babel-polyfill": path.resolve(containerPath, './node_modules/babel-polyfill/dist/polyfill.js'),
  service: path.resolve(containerPath, './app/src/wechat/live/service'),
  'NIM-chatroom': path.resolve(containerPath, './app/src/plugins/NIM_Web_Chatroom_v3.2.0.js'),
  zepto: path.resolve(containerPath, './node_modules/webpack-zepto/index.js'),
  'mutation-types': path.resolve(containerPath, './app/src/wechat/live/store/mutation-type.js'),
  Chart: path.resolve(containerPath, './node_modules/chart.js/dist/chart.min.js'),
  cryptojs:  path.resolve(containerPath, './node_modules/crypto-js'),
  wxShare: path.resolve(containerPath, './app/src/_/js/wxShare.js'),
};

module.exports = alias;
