<template>
  <div class="recommend border-top">
    <div class="title">&bull; 猜你喜欢 &bull;</div>
    <div class="product">
      <router-link
        :to="'/detail/' + item.id"
        tag="div"
        class="product-item"
        v-for="item in productList"
        :key="item.id"
      >
        <div class="img-warp">
          <img :src="item.src" />
        </div>
        <div class="info">
          <span class="name van-ellipsis">{{item.name}}</span>
          <span class="price">￥ {{item.price}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productList: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.recommend {
  .title {
    text-align: center;
    font-size: 0.38rem;
    line-height: 2.4;
    color: #333;
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 0.1rem;
    .product-item {
      width: 47%;
      border-radius: 0.14rem;
      margin: 0.1rem 0.1rem;
      overflow: hidden;
      background: #f9f9f9;
      .img-warp {
        width: 2.6rem;
        height: 2.6rem;
        margin: 0.4rem auto 0;
        overflow: hidden;
      }
      .info {
        padding: 0.2rem 0.2rem 0.3rem;
        text-align: center;
        font-size: 0.28rem;
        display: flex;
        flex-direction: column;
        .name {
          color: #3a3a3a;
          margin-bottom: 0.08rem;
        }
        .price {
          color: $priceColor;
        }
      }
    }
  }
}
</style>
