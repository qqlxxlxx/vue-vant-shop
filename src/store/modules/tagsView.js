export default {
  namespaced: true,
  state: {
    keepAliveViews: ['Layout', 'Search'] // 缓存数组
  },
  mutations: {
    addCachedView(state, name) {
      if (state.keepAliveViews.includes(name)) return
      state.keepAliveViews.push(name)
    },
    delCachedView(state, name) {
      const index = state.keepAliveViews.indexOf(name)
      index > -1 && state.keepAliveViews.splice(index, 1)
    }
  }
}
