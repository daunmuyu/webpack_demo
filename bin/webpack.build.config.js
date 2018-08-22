const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = merge(base, {
  devtool: false,
  output: {
    chunkFilename: 'index/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].[chunkhash:8].js`
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
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
  plugins: [
    new ExtractTextPlugin({
      filename: `[name].[contenthash:8].css`
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // 静态文件拷贝
    new CopyWebpackPlugin([{
      context: './src/pages',
      from: '*/images/**',
    }]),
    new CopyWebpackPlugin([{
      context: './src/pages',
      from: '*/img/**',
    }])
  ]
})

module.exports = config