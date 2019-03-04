/**
 * Webpack configuration for production
 */
import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: {
    vendor: [
      path.resolve(process.cwd(), 'vendor', 'sample-vendor-file.js'),
      'jquery',
    ],
    app: [
      path.resolve(process.cwd(), 'server', 'index.js'),
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'dist'),
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-inline-environment-variables'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(s)?css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: 'file-loader',
      },
    ],
  },
  target: 'node',
};
