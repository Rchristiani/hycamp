const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        include: path.join(__dirname, 'client'),
        exclude: [/node_modules/]
      }
    ],
    loaders: [
    // js
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.scss$/,
      include: [path.join(__dirname, 'client'), path.join(__dirname, 'styles')],
      loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap'],
    },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './client/index.template.html',
      filename: 'index.html',
      appMountId: 'main',
      inject: false,
      files: {
        css: ['assets/main.css']
      }
    }),
  ],
};
