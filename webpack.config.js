const path = require('path');

module.exports = {

  entry: './src/ng2-markdown.js',
  devtool: 'source-map',
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
