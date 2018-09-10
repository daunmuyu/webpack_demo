var config = require("./webpack.dev.config.js");
var webpack = require('webpack');
var argv = process.argv;
var getEntry = require('./getEntry.js');

var WebpackDevServer = require('webpack-dev-server');
var port = 8066;


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
  config.entry = getEntry('./app/src/' + target + '/*.js');
} else if (target) {
  config.entry = getEntry('./app/src/' + target + '/*/*.js');
}


if (target && isEmptyObject(config.entry)) {
  console.log('没有获取到指定目录的文件！！！！');
  return;
}

for (var item in config.entry) {
  config.entry[item].unshift("webpack-dev-server/client?http://localhost:" + port + "/", 'webpack/hot/dev-server');
}

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: true,
  stats: {
    colors: true // 用颜色标识
  },
  contentBase: 'app/src',
  disableHostCheck: true
});
server.listen(port);
