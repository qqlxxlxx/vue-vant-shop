<template>
  <div class="category">
    <div class="grid">
      <div class="grid-item" v-for="item in category" :key="item.id" @click="gridClick(item.cate)">
        <img :src="item.img" />
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: {
    category: Array
  },
  methods: {
    gridClick(cate) {
      this.$emit('gridClick', cate)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.category {
  @include imgWrapHeight(20.8%);
  .grid {
    display: flex;
    .grid-item {
      flex: 1;
      padding: 0.1rem 0.2rem;
      text-align: center;
      img {
        width: 0.82rem;
        height: 0.82rem;
        margin: 0 auto;
      }
      div {
        margin-top: 0.2rem;
        font-size: 0.24rem;
        word-wrap: break-word;
        color: #646566;
      }
    }
  }
}
</style>
