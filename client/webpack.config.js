const path = require("path");
/**
 * HtmlWebpackPlugin
 * The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
 */
const HtmlWebpackPlugin = require("html-webpack-plugin"); 

/**
 * MiniCssExtractPlugin
 * This plugin extracts CSS into separate files. 
 * It creates a CSS file per JS file which contains CSS. 
 * It supports On-Demand-Loading of CSS and SourceMaps.
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * dotenv-webpack and webpack so we can use .env vars inside react..
 */
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');


require('dotenv').config({path:__dirname+'/../.env'})


module.exports = {

  entry: {
    app: path.join(__dirname, "/src/Index.js"),
  },

  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'main.js'
  },

  module: {
    rules: [
      {
         /**
         * test
         * Reg.exp
         */
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        /**
         * css-loader Loads CSS file with resolved imports and returns CSS code
         * sass-loader Loads and compiles a SASS/SCSS file
         */
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: 'style-loader!css-loader'
       },
      {

        /**
         * babel-loader Loads ES2015+ code and transpiles to ES5 using Babel
         */
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        /**
         * html-loader Exports HTML as string, require references to static resources
         */
        use: "html-loader",
      },
    ],
  },

  /**
   * Attempt to resolve these extensions in order. 
   * If multiple files share the same name but have different extensions, 
   * webpack will resolve the one with the extension listed first in the array and skip the rest.
   */
  resolve: {
    extensions: [".js", ".jsx"],
  },
 /***
  * EnvironmentPlugin
  * Use .env file to specify APP_API_URL
  */
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_API_URL : JSON.stringify(process.env.APP_API_URL)
      },
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "[id].css",
    }),
  ],

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.PORT_CLIENT, 
    open: true,
    stats: "errors-only",
  }
};
