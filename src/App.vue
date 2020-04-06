<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar route active-color="#2ca6cb">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/shoppingCart" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created() {
    document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px'
  }
}
</script>

<style>
/* .van-tabbar {
  height: 1rem !important;
} */
</style>
