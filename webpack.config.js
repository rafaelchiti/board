var webpack = require('webpack');

// webpack.config.js
module.exports = {
  entry: {
    app: ['./webapp/client/client.js'],
    vendor: ['jquery', 'jquery-ui', 'react/addons', 'underscore']
  },
  output: {
    path: './webapp/public/js',
    filename: 'webpack_app_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'es6-loader'},
      {test: /\.jsx$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]
};