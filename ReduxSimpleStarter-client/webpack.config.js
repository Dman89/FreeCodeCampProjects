const port = 3000;
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname+"/public/scripts/",
    publicPath: '/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:'+port,
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    inline: true,
    hot: true,
    port: port,
    historyApiFallback: true,
    contentBase: './'
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  }
};
