var webpack = require('webpack');
var webpackConfig = require('./webpack.release.config.js');
var argv = process.argv;
var getEntry = require('./getEntry.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var complie = require('./complie.js');
// 读取系统配置
var globalConfig = require('../app/global.config.json');
globalConfig = complie(globalConfig);



var pages;
var target = '';

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

if (argv.length > 2 && argv[2]) {
  target = argv[2];
}

if (target && target.indexOf('/') > 1) {
  webpackConfig.entry = getEntry('./app/src/' + target + '/*.js', true);
  pages = getEntry('./app/src/' + target + '/*.pug');
} else if (target) {
  webpackConfig.entry = getEntry('./app/src/' + target + '/*/*.js', true);
  pages = getEntry('./app/src/' + target + '/*/*.pug');
} else{
  pages = getEntry('./app/src/*/*/*.pug');
}

console.log('page:', pages);

if (target && isEmptyObject(webpackConfig.entry)) {
  console.log('没有获取到指定目录的文件！！！！');
  return;
}

// 处理pug页面
for (var chunkname in pages) {
  var conf = {
    filename: chunkname + '.html',
    template: pages[chunkname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    chunks: [chunkname],
    hash: true,
    globalConfig: globalConfig
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

console.log('[info] 启动编译....');

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')

  console.log('[info] 编译完成！！')
})
