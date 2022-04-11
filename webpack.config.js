const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, options) => {
  const isDevelopment = options.mode !== "production"

  return {
    mode: isDevelopment ? "development" : "production",
    target: "web",
    entry: "./src/index.tsx",
    output: {
      filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
      path: path.join(__dirname, "/dist"),
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
      ],
    },
    devtool: isDevelopment ? "eval-cheap-module-source-map" : "nosources-source-map",
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
    performance: {
      hints: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: isDevelopment
          ? false
          : {
              collapseWhitespace: true,
              keepClosingSlash: true,
              minifyCSS: true,
              minifyJS: true,
              minifyURLs: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
        template: "./src/index.html",
      }),
      ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
    ],
    stats: {
      assetsSort: "!size",
      colors: true,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      groupAssetsByChunk: false,
      groupAssetsByExtension: false,
      groupAssetsByInfo: false,
      groupAssetsByPath: false,
      modules: false,
      relatedAssets: true,
      timings: false,
      version: false,
    },
    devServer: {
      contentBase: "dist",
      historyApiFallback: true,
      host: "0.0.0.0",
      hot: true,
      port: 8080,
    },
  }
}