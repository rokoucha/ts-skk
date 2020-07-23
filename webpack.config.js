module.exports = {
  module: {
    rules: [
      {
        exclude: '/node_modules/',
        test: /.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
