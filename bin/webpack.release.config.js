const webpack = require('webpack');
const path = require('path');
const getEntry = require('./getEntry.js');
const complie = require('./complie.js');
const alias = require('../app/plugin_alias.js');

const containerPath = path.resolve('./');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSASS = new ExtractTextPlugin('[name].css');

// 读取系统配置
let globalConfig = require('../app/global.config.json');

globalConfig = complie(globalConfig);

// 获取所有js入口
const entrys = getEntry('./app/src/*/*/*.js');
// 获取所有页面
// var pages = getEntry('./app/src/*/*/*.pug');

// webpack处理的插件
const plugins = [];
plugins.push(extractSASS);
plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })
);

// // 处理pug页面
// for (var chunkname in pages) {
//   var conf = {
//     filename: chunkname + '.html',
//     template: pages[chunkname],
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: false
//     },
//     chunks: [chunkname],
//     hash: true,
//     globalConfig: globalConfig
//   }
//   plugins.push(new HtmlWebpackPlugin(conf));
// }

/**
 * 配置webpack
 */
const config = {
  entry: entrys,
  output: {
    path: path.resolve(containerPath, './dist/'),
    filename: '[name].js',
  },
  devtool: false,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /(node_modules)|(plugins)/,
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: /(node_modules)|(plugins)/,
      },
      {
        test: /\.css$/,
        loader: extractSASS.extract(['css!postcss']),
      },
      {
        test: /\.scss$/i,
        loader: extractSASS.extract(['css!postcss', 'sass']),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file',
      },
      {
        test: /.pug$/,
        loader: 'pug',
        exclude: /(node_modules)|(plugins)/,
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash:8]',
        exclude: /(node_modules)/,
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader',
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
        },
      },
    ],
  },
  plugins,
  postcss: () => {
    return [require('autoprefixer')];
  },
  resolve: {
    alias,
    extensions: ['', '.js', '.css', '.scss', '.pug', '.png', '.jpg'],
  },
  externals: {},
};
module.exports = config;
