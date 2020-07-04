<template>
  <div class="back-top-icon" @click="backTop"></div>
</template>

<script>
import { setScrollTop } from '@/utils'
export default {
  methods: {
    backTop() {
      setScrollTop(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top-icon {
  position: fixed;
  bottom: 1.4rem;
  right: 0.2rem;
  z-index: 5;
  width: 1rem;
  height: 1rem;
  margin-bottom: env(safe-area-inset-bottom);
  background: url(../assets/images/top.png) no-repeat center/cover;
  user-select: none;
}
</style>
