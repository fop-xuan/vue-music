import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './register'
import 'common/style/index.less'

Vue.use(VueLazyload, { // 图片懒加载
  preLoad: 1,
  loading: require('./assets/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
