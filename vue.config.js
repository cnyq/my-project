const path = require('path')
const defaultSitting = require('./src/setting')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const { title } = defaultSitting
const {
  NODE_ENV,
  port,
  npm_config_port
} = process.env
const startPort = port || npm_config_port || 1205
const IS_DEV = NODE_ENV === 'development'
const externals = {
  vue: "Vue",
  "element-ui": "ELEMENT",
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}
const cdnMap = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://unpkg.com/element-ui@2.14.1/lib/index.js'
  ]
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 别名配置
const alias = {
  '@': resolve('src') // 主目录
}
const commonWebPackConfig = {
  name: title,
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
  },
  resolve: {
    alias
  }
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: startPort,
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
  configureWebpack: () => {
    return {
      ...commonWebPackConfig
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.plugin('html').tap(args => {
      args[0].title = title // 应用的名字
      return args
    })
    config
      .when(IS_DEV,
        config => config.devtool('cheap-source-map')
      )
    // html-webpack-plugin 增强包
    config
      .when(!IS_DEV,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use(ScriptExtHtmlWebpackPlugin, [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config.plugin('html').tap(args => {
            args[0].cdn = cdnMap
            args[0].minify.minifyCSS = true // 压缩html中的css
            return args
          })
          config.externals(externals)
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
                // elementUI: {
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                // },
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
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !IS_DEV,
    modules: false,
    // 开启 CSS source maps?
    sourceMap: IS_DEV
  }
}
