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

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.van-tabbar {
  height: $tabHeight !important;
}
</style>>
