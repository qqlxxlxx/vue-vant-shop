<template>
  <div class="back-btn" @click="back">
    <van-icon name="arrow-left" />
  </div>
</template>

<script>
export default {
  name: 'BackBtn',
  methods: {
    back() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.back-btn {
  width: 0.88rem;
  height: 100%;
  text-align: center;
  font-size: 0.38rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
