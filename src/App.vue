<template>
  <div id="app">
    <keep-alive exclude="Detail,Search">
      <router-view />
    </keep-alive>
    <van-tabbar v-show="$route.meta.tabbarShow" route active-color="#2ca6cb">
      <van-tabbar-item to="/home">
        <template #icon>
          <van-icon name="wap-home" size="0.37rem" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/shoppingCart">
        <template #icon>
          <van-icon name="shopping-cart" size="0.37rem" />
        </template>
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <van-icon name="manager" size="0.37rem" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
    <div v-show="isShowBackTop" @click="backTop">
      <BackTop />
    </div>
  </div>
</template>

<script>
import tools from '@/assets/js/tools.js'
import BackTop from '@/components/BackTop'
export default {
  data() {
    return {
      timerId: null,
      flag: true,
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll(e) {
      // 函数节流
      if (!this.flag) return
      this.flag = false
      this.timerId && clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.flag = true
        const scrollY = tools.getScrollTop()
        this.isShowBackTop = scrollY > 500
      }, 500)
    },
    backTop() {
      tools.setScrollTop(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
#app {
  ::v-deep .van-tabbar {
    height: $tabHeight;
    background: rgba(250, 250, 250, 0.98);
  }
  .van-tabbar-item {
    font-size: 0.22rem;
  }
}
</style>>
