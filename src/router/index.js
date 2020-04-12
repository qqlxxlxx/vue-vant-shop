import Vue from 'vue'
import VueRouter from 'vue-router'
import tools from '@/assets/js/tools.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/home/Home.vue')
  },
  {
    path: '/shoppingCart',
    component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/shoppingCart/ShoppingCart.vue')
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/Profile.vue')
  },
  {
    path: '/detail/:id',
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  // 切换到新路由时，实现页面滚到顶部，或者是保持原先的滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.path === '/home' || to.path === '/shoppingCart' || to.path === '/profile') {
        const scrollY = to.meta.position || 0
        return { x: 0, y: scrollY }
      }
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // 获取网页滚动距离，兼容谷歌、ie、火狐和高级版本等浏览器
  // from.meta.position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  from.meta.position = tools.getScrollTop()
  next()
})

export default router
