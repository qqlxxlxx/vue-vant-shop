import Vue from 'vue'
import VueRouter from 'vue-router'
import tools from '@/assets/js/tools.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    meta: { tabbarShow: true }
  },
  {
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart/Cart.vue'),
    meta: { tabbarShow: true }
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/Profile.vue')
    // meta: { tabbarShow: true }
  },
  {
    path: '/detail/:id',
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail/Detail.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/Search.vue')
  }
]

const router = new VueRouter({
  base: 'vMall',
  routes,
  // 切换到新路由时，实现页面滚到顶部，或者是保持原先的滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.path === '/home') {
        const scrollY = to.meta.position || 0
        return { x: 0, y: scrollY }
      }
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // 将首页滚动位置存起来
  if (from.path === '/home') from.meta.position = tools.getScrollTop()
  next()
})

export default router
