const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractCSS = new ExtractTextPlugin('./css/global.min.css')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },
  devServer: {
    contentBase: 'dist',
    port: 3000
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              fix: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    ExtractCSS,
    new UglifyJsPlugin(),
    new WriteFilePlugin,
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
