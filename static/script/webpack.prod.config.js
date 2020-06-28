process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const config = require('./webpack.base.config');

module.exports = config.map((item) => {
  return merge(item, {
    mode: 'production',
    plugins: [
      new CompressionPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  });
});