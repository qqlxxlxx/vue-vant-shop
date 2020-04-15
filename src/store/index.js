import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    // cartCount: state => {
    //   state.cartList.reduce((returnValue, item) => {
    //     return returnValue + item.selectedNum
    //   }, 0)
    // }
  },
  mutations: {
    handleCartList(state, skuData) {
      // state.cartList.push(skuData)
      // console.log(skuData)
    }
  },
  actions: {
  },
  modules: {
  }
})
