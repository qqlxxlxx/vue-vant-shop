import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://119.23.11.79:3000/'
// 绑定后，每个组件可通过 this.$http 使用axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
