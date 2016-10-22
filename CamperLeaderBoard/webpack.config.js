var webpack = require('webpack');
var path = require('path')

module.exports = {
  context: __dirname + '/components',
  entry: './index.jsx',
  output: {
    path: __dirname + '/components/scripts',
    filename: 'CampLeaderBoard.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: ['babel-loader'],
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.OldWatchingPlugin()
  ]
}
