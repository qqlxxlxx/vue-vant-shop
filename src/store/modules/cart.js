import { getGoodsList, updateGoods, delGoods } from '@/api/cart'

export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    setCartList(state, list) {
      state.cartList = list
    }
  },
  actions: {
    getCartList({ commit }) {
      getGoodsList().then(res => {
        commit('setCartList', res)
      })
    },
    addCart({ dispatch }, { id, num }) {
      updateGoods(id, {
        num,
        update: Date.now()
      }).then(_ => {
        dispatch('getCartList')
      })
    },
    updateCart({ dispatch }, { id, num }) {
      updateGoods(id, { num }).then(_ => {
        dispatch('getCartList')
      })
    },
    delGoods({ dispatch }, id) {
      delGoods(id).then(_ => {
        dispatch('getCartList')
      })
    }
  }
}
