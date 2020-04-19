<template>
  <div class="search-list">
    <router-link
      class="search-item van-hairline--bottom"
      v-for="item in list"
      :key="item.id"
      tag="div"
      :to="'/detail/'+item.id"
    >
      <div class="img-wrap">
        <img :src="item.src" />
      </div>
      <div class="item-info">
        <p>{{item.name}}</p>
        <p class="price">￥{{item.price}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style lang="scss" scoped>
.search-item {
  display: flex;
  padding: 10px 20px;
  background: #fff;
  .img-wrap {
    width: 100px;
  }
  .item-info {
    flex: 1;
    padding-left: 20px;
    .price {
      color: #d0021b;
    }
  }
}
</style>
