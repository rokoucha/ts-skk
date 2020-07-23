const { join } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const distDir = join(__dirname, 'dist')

module.exports = merge(common, {
  devServer: {
    contentBase: distDir,
    disableHostCheck: true,
    host: '::',
  },
  entry: join(__dirname, 'src', 'mock', 'index.ts'),
  output: {
    filename: '[name].js',
    path: distDir,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, 'src', 'extension', 'manifest.json'),
          to: './extension',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'mock', 'index.html'),
    }),
  ],
})
