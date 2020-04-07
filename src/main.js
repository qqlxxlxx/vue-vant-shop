import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'

Vue.config.productionTip = false

document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
