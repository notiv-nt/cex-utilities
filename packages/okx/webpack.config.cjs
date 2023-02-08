const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');
const postcssOptions = require('../../postcss.config.cjs');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    main: path.resolve(__dirname, './src/main.ts'),
    popup: path.resolve(__dirname, '../shared/src/popup/popup.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },

  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /\?vue/,
            use: [
              { loader: 'vue-style-loader', options: { sourceMap: false, shadowMode: false } },
              { loader: 'css-loader', options: { sourceMap: false, importLoaders: 2 } },
              { loader: 'postcss-loader', options: { sourceMap: false, postcssOptions } },
            ],
          },

          {
            use: [
              { loader: 'vue-style-loader', options: { sourceMap: false, shadowMode: false } },
              { loader: 'css-loader', options: { sourceMap: false, importLoaders: 2 } },
              { loader: 'postcss-loader', options: { sourceMap: false, postcssOptions } },
            ],
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../shared/src/popup/popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),

    new VueLoaderPlugin(),

    new DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    }),
  ],

  watchOptions: {
    ignored: /dist|node_modules|binance/,
  },
};
