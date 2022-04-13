import {Configuration} from "webpack"
import * as path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

import "webpack-dev-server"
const isDevelopment = true
const config: Configuration = {
  mode: isDevelopment ? "development" : "production",
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  target: "web",
  entry: "./src/index.tsx",
  output: {
    filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/
        }
      },
      name: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}

export default config
