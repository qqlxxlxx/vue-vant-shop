<template>
  <div v-if="banner && banner.length > 0 && render">
    <swiper ref="mySwiper" class="my-swipe" :options="swiperOptions">
      <swiper-slide v-for="(imgSrc, index) in banner" :key="index">
        <img :src="imgSrc" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'MySwiper',
  props: {
    banner: Array
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        }
      },
      render: true
    }
  },
  activated() {
    this.render = true
  },
  deactivated() {
    this.render = false
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
img {
  transform: translate3d(0, 0, 0);
  border-radius: 0.1rem;
  overflow: hidden;
  pointer-events: none;
}
.swiper-container {
  --swiper-theme-color: #f9f9f9;
}
</style>
