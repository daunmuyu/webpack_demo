/**
 * 插件别名配置
 */
var path = require('path');
var containerPath = path.resolve('./');

var alias = {
  vue: path.resolve(containerPath, './node_modules/vue/dist/vue.min.js'),
  plugins: path.resolve(containerPath, 'src/plugins'),
  'NIM-chatroom': path.resolve(containerPath, 'src/plugins/NIM_Web_Chatroom_v3.2.0.js'),
  NGW: path.resolve(containerPath, 'src/plugins/ng-download.js'),
};


module.exports = alias;
