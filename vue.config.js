const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 应用的基本URL
  baseUrl: process.env.VUE_APP_BASEURL,

  configureWebpack: {
    devtool: 'source-map'
  },

  // 是否开启eslint保存即检测功能
  lintOnSave: false,

  // build目录
  outputDir: '../wwwroot/m/',

  // 是否生产版本生成sourceMap
  productionSourceMap: false,

  devServer: {
    // 默认域名
    host: '0.0.0.0',
    // 是否编译完后自动打开浏览器
    open: true,
    // 跨域代理配置
    proxy: {
      '/v1': {
        target: 'http://pulupulu.idea-source.net',
        changeOrigin: true
      }
    }
  },

  css: {
    // 是否生成sourcemap文件
    sourceMap: true
  },

  chainWebpack: config => {
    // 为常用目录设置alias
    config.resolve.alias
      .set('@img', resolve('src/assets/images'))
      .set('@less', resolve('src/assets/less'))
      .set('@components', resolve('src/components'))
      .set('@mixin', resolve('src/mixin'))
      .set('@views', resolve('src/views'))

    // svg配置
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/icon-svg/icons')) // 处理svg的目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })
      .end()

    // 规避冲突
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/icon-svg/icons'))
      .end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局导入该配置
        resolve('src/assets/less/config.less')
      ]
    }
  }
}
