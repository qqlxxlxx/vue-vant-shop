<template>
  <div id="app">
    <keep-alive :include="keepAliveViews">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    keepAliveViews() {
      return this.$store.state.tagsView.keepAliveViews
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'Search') {
        this.$store.commit('tagsView/addCachedView', this.$route.name)
      }
    }
  }
}
</script>
