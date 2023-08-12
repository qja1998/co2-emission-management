const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
<<<<<<< HEAD
    proxy : 'http://117.16.164.20:8001',
=======
    
    proxy : 'http://203.255.57.115:8010',
    
>>>>>>> origin/main
  }
})

