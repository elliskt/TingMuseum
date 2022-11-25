// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    open: true,
    port: 8082,
  },

  lintOnSave: false,
  parallel: false,
  filenameHashing: true, //文件名哈希，为了更好的控制缓存
  // publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "./",
  productionSourceMap: false,
  publicPath: "./",
  assetsDir: "assets",
  outputDir: "dist",
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
    }
  },
};
