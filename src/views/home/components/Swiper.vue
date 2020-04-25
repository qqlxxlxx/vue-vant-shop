<template>
  <swiper ref="mySwiper" class="my-swipe" :options="swiperOptions">
    <swiper-slide v-for="(image, index) in bannerImages" :key="index">
      <img :src="image" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
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
      }
    }
  },
  props: {
    bannerImages: Array
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.my-swipe {
  // @include imgWrapHeight(40%);
}
.swiper-slide {
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
img {
  border-radius: 0.1rem;
  overflow: hidden;
  pointer-events: none;
}
.swiper-container {
  --swiper-theme-color: #f9f9f9;
}
</style>
