// npm install --save-dev html-webpack-plugin

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = {
  entry: './example/src/demo.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'es2015', 'angular2' ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [ 
    new HtmlWebpackPlugin() 
  ],
  externals: {
    "@angular/core": '@angular/core',
    "@angular/http": '@angular/http'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'ng2-markdown.js',
    libraryTarget: 'umd'
  }
};
