const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const pages = require('./pages');
const pagedir = './src/pages';
const pages = new glob.Glob('*/*.js', {
  cwd: pagedir,
  sync: true,
}).found.map(page => ({
  filename: page.split('.')[0],
  page,
}));

const plugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    // filename: page.filename + '.html',
    // template: page.dir + '/index.html',
    filename: `${page.filename}.html`,
    template: `${pagedir}/${page.filename}.html`,
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
  // entry[page.filename] = page.dir + '/index.js';
  entry[page.filename] = `${pagedir}/${page.page}`;
});

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.pug', '.png', '.jpg', '.svg'],
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
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
        }),
      },
    ]
  },
  plugins: plugins,
  resolve: {
    alias: {
      lib: path.resolve(__dirname, '../src/lib'),
      vue: 'vue/dist/vue.js'
    },
    extensions: ['.js', '.json', '.css', '.scss', '.pug', '.png', '.jpg', '.svg'],
  }
}