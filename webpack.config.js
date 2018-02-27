const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractCSS = new ExtractTextPlugin('./css/global.css')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'src/static'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'static',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
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
          use: ['css-loader', 'sass-loader']
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
    new WriteFilePlugin,
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    })
  ]
};
