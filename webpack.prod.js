const { join } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const distDir = join(__dirname, 'dist')

module.exports = merge(common, {
  entry: join(__dirname, 'src', 'extension', 'main.ts'),
  output: {
    filename: '[name].js',
    path: distDir,
  },
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, 'src', 'extension', 'manifest.json'),
          to: '.',
        },
      ],
    }),
  ],
})
