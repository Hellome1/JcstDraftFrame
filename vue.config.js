const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        dayjs: 'dayjs'
      })
    ]
  },
  devServer: {
    
  },
  outputDir: 'dist/PVIN',
  // publicPath: process.env.NODE_ENV === 'production' ? '/EMR/EMRJCST/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/EMR/emrviewdoctor/scripts/event/PVIN/' : '/'
};
