const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[hash:8].[ext]',
          outputPath: (url) => {
            const add = url.replace('src/pages', '');
            return add;
          },
          publicPath: (url) => {
            return './img' + url.substr(url.lastIndexOf('/'));
          }
        }
      }],
    },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader?limit=10000&name=img/[name].[ext]?[hash:8]'],
        exclude: /(node_modules)/
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
    // // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     // a module is extracted into the vendor chunk if...
    //     return (
    //       // it's inside node_modules
    //       /node_modules/.test(module.context) &&
    //       // and not a CSS file (due to extract-text-webpack-plugin limitation)
    //       !/\.css$/.test(module.request)
    //     )
    //   }
    // }),
    new FriendlyErrorsPlugin(),
    // 静态文件拷贝
    new CopyWebpackPlugin([{
      context: './src/pages',
      from: '**/img/**',
    }]),
    new CopyWebpackPlugin([{
      context: './src/static',
      from: '**',
      to: 'static'
    }])
  ]
})

module.exports = config