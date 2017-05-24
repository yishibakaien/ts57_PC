var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: function(webpack) {
    return [require('postcss-salad')({
        browsers: ['last 20 version'],
        partialImport: {
          addDependencyTo: webpack
        }
      })]
  }
}
