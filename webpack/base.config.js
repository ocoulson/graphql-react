var path = require('path');

module.exports = {
  entry: {
    app: path.resolve('src', 'frontend', 'App'),
  },
  output: {
    path: path.resolve('build'),
    publicPath: '/assets/build/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [
      path.join('src', 'frontend'),
      'node_modules',
    ]
  },
};
