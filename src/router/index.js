import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '../components/Index'
import Music from '../components/Music'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',//html5模式 去掉锚点
  saveScrollPosition: true,//记住页面的滚动位置 html5模式适用
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/Music',
      component: Music
    }
  ],
  // 让每个页面都滚动到顶部，改变模式为mode: history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
