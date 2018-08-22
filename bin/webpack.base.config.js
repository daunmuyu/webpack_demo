const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const alias = require('./alias');
const pagedir = './src/pages';

const pages = new glob.Glob('*/*.js', {
  cwd: pagedir,
  sync: true,
}).found.map(page => ({
  filename: page.split('.')[0],
  page,
}));

const plugins = pages.map(
  page =>
    new HtmlWebpackPlugin({
      filename: `${page.filename}.html`,
      template: `${pagedir}/${page.filename}.html`,
      inject: true,
      chunks: [page.filename],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
);

const entry = {};
pages.forEach((page) => {
  entry[page.filename] = `${pagedir}/${page.page}`;
});

module.exports = {
  // entry: {
  //   ...entry,
  //   v1: ['vue', 'vuex', 'vue-router', 'axios', 'jquery', 'mint-ui', 'moment', 'lodash', 'clipboard', 'ng-bridge']
  // },
  entry,
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.pug', '.png', '.jpg', '.svg'],
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader', 'raw-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins,
};
