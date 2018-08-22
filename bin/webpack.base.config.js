const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = require('./pages');

const plugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    filename: page.filename + '.html',
    template: page.dir + '/index.html',
    inject: true,
    chunks: [page.filename],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  })
});

const entry = {};
pages.forEach((page) => {
  entry[page.filename] = page.dir + '/index.js';
});

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-withimg-loader', 'raw-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader']
        })
      }
    ]
  },
  plugins: plugins,
  resolve: {
    alias: {
      lib: path.resolve(__dirname, '../src/lib'),
      vue: 'vue/dist/vue.js'
    },
    extensions: ['.js', '.json', '.vue'],
  }
}