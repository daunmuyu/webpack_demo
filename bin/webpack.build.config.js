const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(base, {
  devtool: false,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].[hash:8].js`
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
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
              return url.replace('src/pages', '');
            },
            publicPath: (url) => {
              return '.'+ url.substr(url.indexOf('/', 10));
            }
          }
        }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[path][name].[hash:8].[ext]',
            outputPath: (url) => {
              return url.replace('src/pages', '');
            }
          }
        }],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"'
    // }),
    new ExtractTextPlugin({
      filename: `[name].[hash:8].css`
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false, // Suppress uglification warnings
    //     screw_ie8: true,
    //     drop_console: true,
    //     pure_funcs: ['console.log']
    //   },
    //   output: {
    //     comments: false,
    //   },
    //   exclude: [/\.min\.js$/gi],
    //   sourceMap: false,
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    // // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'static/vendor',
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
    // 静态文件拷贝
    // new CopyWebpackPlugin([{
    //   context: './src/pages',
    //   from: '**/img/**',
    // }]),
    new CopyWebpackPlugin([{
      context: './src/static',
      from: '**',
      to: 'static'
    }])
  ]
})

module.exports = config