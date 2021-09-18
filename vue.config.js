/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 20:14:51
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-18 15:11:45
 */
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? './' : '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: !isProduction,
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        // globalVars: {
        //   hack: `true; @import '~view-design/src/styles/index.less'`
        // },
        // modifyVars: {
        // 初始化可直接覆盖变量
        // '@primary-color': '#2d8cf0',
        // '@info-color': '#2db7f5',
        // '@success-color': '#19be6b',
        // '@processing-color': '@primary-color',
        // '@warning-color': '#ff9900',
        // '@error-color': '#ed4014',
        // '@normal-color': '#e6ebf1',
        // '@link-color': '#2D8cF0',
        // '@link-hover-color': 'tint(@link-color, 20%)',
        // '@link-active-color': 'shade(@link-color, 5%)',
        // '@selected-color': 'fade(@primary-color, 90%)',
        // '@tooltip-color': '#fff',
        // '@subsidiary-color': '#808695',
        // '@rate-star-color': '#f5a623',
        // '@white': '#fff',
        // '@black': '#000'
        // },
        javascriptEnabled: true
      }
    },
    sourceMap: true
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('services', path.resolve(__dirname, './src/services'))
    config.resolve.alias.set('utils', path.resolve(__dirname, './src/utils'))
    config.resolve.alias.set('public', path.resolve(__dirname, './public'))
    config.module.rule('vue').use('iview').loader('iview-loader').options({ prefix: false })
  },
  configureWebpack: (options) => {
    const plugins = []
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    }
    // options.resolve.alias = {
    //   src: path.resolve(__dirname, '../src'),
    //   components: path.resolve(__dirname, '../src/components'),
    //   api: path.resolve(__dirname, '../src/api'),
    //   utils: path.resolve(__dirname, '../src/utils'),
    //   store: path.resolve(__dirname, '../src/store'),
    //   router: path.resolve(__dirname, '../src/router'),
    //   layout: path.resolve(__dirname, '../src/views/layout'),
    // };
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        // target: 'http://192.168.0.244:9097/credible/sys',
        target: 'http://192.168.0.21:8080/credible/sys',
        // target: 'http://39.106.213.8:8089/credible/sys',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      }
    }
  }
}
