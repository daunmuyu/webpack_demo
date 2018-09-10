const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
              return url.replace('src/pages', '.');
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

    new ExtractTextPlugin({
      filename: `[name].[hash:8].css`
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new CopyWebpackPlugin([{
      context: './src/static',
      from: '**',
      to: 'static'
    }])
  ]
})

module.exports = config