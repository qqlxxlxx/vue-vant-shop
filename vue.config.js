module.exports = {
  publicPath: '/vmall',
  productionSourceMap: false,
  chainWebpack: config => {
    // 产品发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // 修改默认打包入口文件
      config.entry('app').clear().add('./src/main-prod.js')
      // 通过externals加载外部cdn资源
      config.set('externals', {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vant: 'vant'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 产品开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}