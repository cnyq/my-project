
const path = require('path')
const port = process.env.port || process.env.npm_config_port || 1205 // dev port
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源的输出文件目录
  assetsDir: 'static',
  // eslint 关闭
  lintOnSave: false,
  // 生产环境的 source map
  productionSourceMap: false,
  // 开发服务设置
  devServer: {
    port: port,
    open: true, // 是否自动打开浏览器
    // 出现编译器错误或警告时，在浏览器中是否全屏覆盖
    overlay: {
      warnings: false,
      errors: true
    }
    // 代理服务器配置
    // proxy: {
    //     [process.env.VUE_APP_BASE_API]: {
    //         target: `http://localhost:3000/api`,
    //         changeOrigin: true,
    //         pathRewrite: {
    //            ['^' + process.env.VUE_APP_BASE_API]: ''
    //         }
    //     },
    // }
  },
  // webpack配置
  configureWebpack: {
    // 页面名称
    name: 'blog',
    // 设置别名
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    // html-webpack-plugin 增强包
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
