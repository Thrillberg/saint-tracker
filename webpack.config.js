const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  entry: ['whatwg-fetch', './main.jsx'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    sourceMapFilename: '[file].map',
    filename: 'saint-tracker.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        RIJKSMUSEUM_KEY: JSON.stringify('9QfgAMuT'),
        HARVARD_KEY: JSON.stringify('89a9df20-2960-11e7-85c6-0d6a987bcf37'),
        GOOGLE_GEOCODER_KEY: JSON.stringify('AIzaSyBHJ3RA557bKXZnG0RSiLSmUX1TSTcG5vg')
      }
    }),
    new CopyWebpackPlugin([
      {from: 'index.html'},
      {from: 'favicon.ico'}
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      config: path.join(
        __dirname,
        'config',
        NODE_ENV
      )
    }
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  }
};

if (NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      sourceMap: true
    })
  );
}

module.exports = config;
