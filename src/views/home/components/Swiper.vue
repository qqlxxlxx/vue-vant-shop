<template>
  <div class="my-swipe">
    <van-swipe :autoplay="5000" indicator-color="#fff">
      <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
        <div class="img-wrap">
          <img :src="image" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    bannerImages: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.my-swipe {
  @include imgWrapHeight(40%);
  .van-swipe-item {
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    // background: $themeColor;
    .img-wrap {
      width: 100%;
      height: 2.8rem;
      border-radius: 0.1rem;
      overflow: hidden;
    }
    img {
      width: 100%;
      pointer-events: none;
    }
  }
}
</style>
