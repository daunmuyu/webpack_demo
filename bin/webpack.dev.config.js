const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pages = require('./pages');

const devPort = 3033;

const config = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js'
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
  performance: {
    maxEntrypointSize: 300000,
    hints: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css'
    }),

    new FriendlyErrorsPlugin(),

    new CopyWebpackPlugin([{
      context: './src/static',
      from: '**',
      to: 'static'
    }])
  ],
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: devPort,
    open: true,
    openPage: 'index',
    quiet: true,
    stats: { colors: true },
    before: function(app) {
      app.get('/index', function(req, res) {
        res.send(
          `<ul>
          ${
            pages.map(item => `<li><a href="${item.filename}.html">${item.filename.replace('/index', '')}</a></li>`)
              .join('')
          }
          </ul>`
        );
      });
    }
  },
})

module.exports = config