const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    
    proxy : 'http://117.16.164.20:8010',
    
  }
})

