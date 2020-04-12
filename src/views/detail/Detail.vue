<template>
  <div class="detail">
    <div>detail</div>
    <router-link to="/home">home</router-link>
    <van-button @touchstart.prevent="backHome">home</van-button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  created() {
    console.log('detail.vue created')
  },
  methods: {
    backHome() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  min-height: 2000px;
  background-color: #fff;
}
</style>
