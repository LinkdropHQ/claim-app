const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ],
    
    configure: {
      ignoreWarnings: [{ module: /node_modules\// }]
    }
  },
  configure: (webpackConfig) => {
    webpackConfig.resolve.extensions.push('.mjs', '.cjs')
    return {
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          assert: false,
          crypto: false,
          http: false,
          https: false,
          os: false,
          stream: false,
        }
      },
      optimization: {
        ...webpackConfig.optimization,
        concatenateModules: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                inline: 2,
                unused: true,
                dead_code: true,
              },
              mangle: {
                safari10: true,
              },
              keep_classnames: false,
              keep_fnames: false,
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            sourceMap: false,
          }),
          webpackConfig.optimization.minimizer[1]
        ],
      },
    }
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator", 
      "@babel/plugin-proposal-optional-chaining"
    ],
  },
}