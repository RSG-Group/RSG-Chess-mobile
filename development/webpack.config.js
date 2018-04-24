/* eslint-disable */
var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

var scripts = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/scripts.js",
  output: {
    path: __dirname + "/../www/src",
    filename: "scripts.min.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false })
      ]
};

var worker = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/worker.js",
  output: {
    path: __dirname + "/../www/src",
    filename: "worker.min.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false })
      ]
};

// Return Array of Configurations
module.exports = [scripts, worker];
