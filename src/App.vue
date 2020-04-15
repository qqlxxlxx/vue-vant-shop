<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <van-tabbar route active-color="#2ca6cb">
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
  </div>
</template>

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
