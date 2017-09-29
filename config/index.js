// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //proxyTable参数主要是一个地址映射表，你可以通过设置将复杂的url简化
    proxyTable: {
      '/api': {
        target: 'https://api.imjad.cn/cloudmusic/',
        //changeOrigin,,本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境,
        // 线上不会将该代码打包发布,所以发布时候不用任何修改
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/html5': {
      //   target: 'http://m.douyu.com/html5/live',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/html5': ''
      //   }
      // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
