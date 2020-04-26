import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cartList: [],
  cartEmpty: false,
  updateSuccess: true
}

const mutations = {}

const actions = {
  async getCartList({ state }) {
    try {
      const { data } = await Vue.prototype.$http.get(
        '/cart?num_gte=1&_sort=update&_order=desc'
      )
      // console.log(data)
      if (data.length === 0) {
        state.cartEmpty = true
        return
      }
      state.cartList = data
      state.cartEmpty = false
    } catch (err) {
      // console.log(err)
    }
  },
  async updateGoods({ dispatch, state }, args) {
    try {
      const { id, num, update } = args
      const paramsData = {
        num: num || 0
      }
      if (update) paramsData.update = Date.now()
      const { data } = await Vue.prototype.$http.patch('/cart/' + id, paramsData)
      state.updateSuccess = !!data
      dispatch('getCartList')
    } catch (err) {
      // console.log(err)
      state.updateSuccess = false
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
