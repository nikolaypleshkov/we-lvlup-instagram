/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
// const webpack = require("webpack")
// const path = require("path")
// const HtmlWebpackPlugin = require("html-webpack-plugin")
import webpack, {Configuration} from "webpack";
import * as path from "path";
import HtmlWebpackPlugin = require("html-webpack-plugin");

import "webpack-dev-server";
const isDevelopment = true;
const config: Configuration = {
    mode: isDevelopment ? "development" : "production",
    devServer: {
      port: 3000,
    },
    target: "web",
    entry: "./src/index.tsx",
    output: {
      filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
      path: path.join(__dirname, "/dist")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', "sass-loader"],
        }
      ],
    },
    optimization: {
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
          },
        },
        name: false,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
};

export default config;