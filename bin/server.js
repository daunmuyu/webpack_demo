var config = require("./webpack.dev.config.js");
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var WebpackDevServer = require('webpack-dev-server');

const port = 7458;

// config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${port}/`);

// config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new OpenBrowserPlugin({
  url: `http://localhost:${port}/`
}));


var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  // publicPath: config.output.publicPath,
  hot: true,
  open: true,
  inline: true,
  disableHostCheck: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  contentBase: 'src'
});

server.listen(port, "localhost", () => {
  console.log(new Date());
});

// module.exports = config