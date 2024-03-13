const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    
    proxy : 'http://203.255.57.115:8010',
    
  }
})

