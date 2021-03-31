const path   = require("path");
const webpack = require("webpack");

const TerserJSPlugin          = require('terser-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: "source-map",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "../app/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        //exclude: [/node_modules\/(?!(swiper|dom7|bootstrap|jquery|jquery-toast-plugin)\/).*/, /\.test\.jsx?$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env',
                      {    "targets": {
                            "ie": "11"
                      }, }
                     ]]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath : '../icons'
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff2|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath : '../fontswp'
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [ new OptimizeCSSAssetsPlugin(), new TerserJSPlugin() ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      Popper: ['popper.js', 'default']
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '../app/bundle.css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  
  
};