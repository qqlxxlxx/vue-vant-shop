<template>
  <div id="app">
    <keep-alive exclude="Detail,Search,Profile">
      <router-view />
    </keep-alive>
    <van-tabbar v-show="$route.meta.tabbarShow" route active-color="#2ca6cb">
      <van-tabbar-item to="/home">
        <template #icon>
          <van-icon name="wap-home" size="0.36rem" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/cart">
        <template #icon>
          <van-icon name="shopping-cart" size="0.36rem" />
        </template>
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <van-icon name="manager" size="0.36rem" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
@import '@/assets/css/variable.scss';

#app {
  .van-tabbar {
    height: $tabHeight;
    background: rgba(250, 250, 250, 0.98);
  }
  .van-tabbar-item {
    font-size: 0.2rem;
  }
}
</style>
