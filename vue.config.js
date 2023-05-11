const { defineConfig } = require("@vue/cli-service");
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://47.111.178.168:9100",
        // target: "http://localhost:9100",
        pathRewrite: {'^/api': '/'},
        ws: true,
        changeOrigin: true,
      },
      "/bookmark": {
        target: "http://localhost:9011",
        pathRewrite: {'^/api': '/'},
        ws: true,
        changeOrigin: true,
      }
    },
  },
  chainWebpack(config) {
    //配置svg
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});
