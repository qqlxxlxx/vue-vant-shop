<template>
  <div class="goods-info">
    <div class="price">
      <span class="symbol">￥</span>
      <span>{{price}}</span>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    price: String,
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.goods-info {
  padding: 0.22rem;
  font-weight: bold;
  .price {
    font-size: 0.52rem;
    color: $priceColor;
    .symbol {
      font-size: 0.32rem;
    }
  }
  .title {
    margin-top: 0.1rem;
    font-size: 0.3rem;
  }
}
</style>
