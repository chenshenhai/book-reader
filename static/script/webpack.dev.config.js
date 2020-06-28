  
process.env.NODE_ENV = 'development';

const merge = require('webpack-merge');
const config = require('./webpack.base.config');

// const prodMode = process.env.NODE_ENV === 'production';

module.exports = config.map((item) => {
  return  merge(item, {
    mode: 'development',
    devtool: '#source-map'
  });
})