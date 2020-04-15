import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import './assets/js/setRem'
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.1.103:3000/'
// 绑定后，每个组件可通过 this.$http 使用axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
