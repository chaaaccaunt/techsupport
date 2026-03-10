const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/share/css";`
      },
    }
  },
  devServer: {
    allowedHosts: ["node-dev.ru"],
    client: {
      webSocketURL: {
        port: 443,
      },
    },
  }
})
