const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    main: path.resolve(__dirname, './src/main.ts'),
    popup: path.resolve(__dirname, '../shared/src/popup/popup.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../shared/src/popup/popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],

  watchOptions: {
    ignored: [path.resolve(__dirname, './dist'), path.resolve(__dirname, './node_modules')],
  },
};
