const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  webpack: {
  
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      ["@babel/plugin-transform-class-properties", { "loose": true }]
    ],
  },
}