import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/shoppingCart',
    component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/shoppingCart/ShoppingCart.vue')
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/Profile.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
