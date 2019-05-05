const path=require('path')

function resolve(dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack(config) {
    config.resolve.alias
    .set('common', resolve('src/common'))
    .set('components',resolve('src/components'))
    .set('views',resolve('src/views'))
    .set('api',resolve('src/api'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://m.kugou.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/music': {
        target: 'http://www.kugou.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/music': ''
        }
      },
      '/search': {
        target: 'http://mobilecdn.kugou.com/api/v3/search',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/search': ''
        }
      }
    },
  }
}
