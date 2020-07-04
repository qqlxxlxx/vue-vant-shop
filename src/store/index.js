import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    tagsView
  }
})
