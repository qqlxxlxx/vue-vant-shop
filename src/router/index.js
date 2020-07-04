import Vue from 'vue'
import VueRouter from 'vue-router'
import { getScrollTop } from '@/utils'
import Layout from '@/views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue')
      }
    ]
  },
  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: '/cart',
        component: () => import(/* webpackChunkName: "cart" */ '@/views/cart/Cart.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/Profile.vue')
      }
    ]
  },
  {
    path: '/detail/:id',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/Detail.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search/Search.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "search" */ '@/views/login/Login.vue')
  }
]

const router = new VueRouter({
  base: 'vmall',
  routes,
  // 切换到新路由时，实现页面滚到顶部，或者是保持原先的滚动位置：当触发浏览器后退等事件，savedPosition可用
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.path === '/home') {
      return { x: 0, y: to.meta.position || 0 }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const token = false

router.beforeEach((to, from, next) => {
  // 离开首页时，将滚动位置存起来
  if (from.path === '/home') {
    from.meta.position = getScrollTop()
  }
  if (!token) {
    if (to.path === '/profile') {
      return next('/login')
    }
  }
  next()
})

export default router
