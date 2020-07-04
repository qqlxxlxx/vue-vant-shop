import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import VueAwesomeSwiper from './assets/js/vue-awesome-swiper.min'
import './assets/css/global.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
