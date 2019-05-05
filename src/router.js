import Vue from 'vue'
import Router from 'vue-router'
import nav from '../src/router/index'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'tab-list-item-active',
  routes: [
    ...nav,
    {
      path: '/hunt',
      name: 'hunt',
      title: '搜索',
      component: () => import('views/hunt/hunt')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.params.id || to.name !== from.name) { // 每次当前的路由的params存在(说明进入一个路由)就重置，或者静态路由改变也重置
    router.app.$options.store.commit('changeIndex', { listIndex: -1 })
  }
  next()
})

export default router
