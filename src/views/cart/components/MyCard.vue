<template>
  <div class="cart">
    <router-link class="card-link" :to="link" tag="div">
      <img :src="picture" />
    </router-link>
    <div class="card-content">
      <div class="card-title van-multi-ellipsis--l2">{{title}}</div>
      <div class="card-desc van-ellipsis">{{desc}}</div>
      <div class="card-bottom">
        <div class="card-price">
          <span>￥</span>
          <span class="card-price-num">{{price}}</span>
        </div>
        <slot name="num"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    picture: String,
    link: String,
    title: String,
    desc: String,
    price: String
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  background-color: #fff;
  padding: 0.14rem 0.2rem 0.14rem 0;
  font-size: 0.24rem;
}
.card-link {
  width: 1.76rem;
  height: 1.76rem;
}
.card-content {
  flex: 1;
  padding-left: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.card-desc {
  color: #646566;
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-price {
  color: #d0021b;
}
.card-price-num {
  font-size: 0.28rem;
}
</style>
