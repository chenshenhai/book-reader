const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');

// const prodMode = process.env.NODE_ENV === 'production';

const srcResolve = function (file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
  return path.join(__dirname, '..', 'dist', file);
};

module.exports = [{
  entry: {
    'hljs': srcResolve('dep/highlight.js'),
    'marked': srcResolve('dep/marked.js'),
  },
  output: {
    path: distResolve(''),
    filename: 'dep/[name].js',
    library: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      },
    ]
  },
  },
  {
    entry: {
      'index': srcResolve('js/index'),
    },
    output: {
      path: distResolve(''),
      filename: 'js/[name].js'
    },
    externals: {
      'marked': 'window.marked',
      'highlight.js': 'window.hljs'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: babelConfig
          }
        },
        {
          test: /\.(css|less)$/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            // 'postcss-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [];
                }
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendor',
    //         chunks: 'all'
    //       }
    //     }
    //   }
    // }
  }
];