const webpack = require('webpack');
const path = require('path');

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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        RIJKSMUSEUM_KEY: JSON.stringify('9QfgAMuT')
      }
    })
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

module.exports = config;
