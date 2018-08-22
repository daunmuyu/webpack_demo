const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ip = require('ip')

const config = merge(base, {
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [`url-loader?limit=10000&name=images/[name].[ext]?[hash:8]`],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [`url-loader?limit=10000&name=images/[name].[ext]?[hash:8]`],
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: false
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    inline: true, //设置为true，代码有变化，浏览器端刷新。
    open: true, //:在默认浏览器打开url(webpack-dev-server版本> 2.0)
    port: "7458",//页面端口
    compress: true, //使用gzip压缩
    host: ip.address(),//ip地址，同时也可以设置成是localhost,
    progress: true, //让编译的输出内容带有进度和颜色
    historyApiFallback: true, //回退:支持历史API。
    contentBase: "src",
    stats: {
      colors: true
    },
  }
})

module.exports = config