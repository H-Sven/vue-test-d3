// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  baseUrl:"./",
  // assetsDir:"static", //资源文件放入static目录
  lintOnSave:false,//是否使用eslint
  productionSourceMap:false,
  devServer:{
    open:true,
  },
  transpileDependencies: [
    'webpack-dev-server/client',
  ],
  configureWebpack:{
    optimization: {
      minimizer: [
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_console: true,//console
      //         drop_debugger: false,
      //         // pure_funcs: ['console.log']//移除console
      //       }
      //     }
      // })
    ]
    }
  }
}