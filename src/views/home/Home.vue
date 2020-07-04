<template>
  <div class="home" ref="home">
    <TopBar @click.native="toSearch">
      <MySearch disabled />
    </TopBar>

    <div class="my-swipe">
      <MySwiper :banner="bannerImages" />
    </div>

    <Category :category="category" @gridClick="cateClick" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <Recommend :productList="productList" />
    </van-list>

    <TopIcon v-show="showTopIcon" />
  </div>
</template>

<script>
import TopIcon from '@/components/TopIcon'
import TopBar from '@/components/TopBar'
import MySearch from '@/components/MySearch'
import MySwiper from './components/MySwiper'
import Category from './components/Category'
import Recommend from './components/Recommend'
import { getBannerCate, getProductList } from '@/api/home'
import { throttle, getScrollTop } from '@/utils'
export default {
  name: 'Home',
  components: {
    TopIcon,
    TopBar,
    MySearch,
    MySwiper,
    Category,
    Recommend
  },
  data() {
    return {
      timerId: null,
      flag: true,
      showTopIcon: false,
      bannerImages: [],
      category: [],
      page: 1,
      productList: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {
    this.getHomeData()
  },
  activated() {
    window.addEventListener('scroll', throttle(this.handleScroll), true)
  },
  deactivated() {
    window.removeEventListener('scroll', throttle(this.handleScroll), true)
  },
  methods: {
    handleScroll() {
      this.flag = true
      this.showTopIcon = getScrollTop() > 500
    },
    getHomeData() {
      getBannerCate().then(res => {
        this.bannerImages = res.banner
        this.category = res.category
      })
    },
    // 上拉加载
    onLoad() {
      getProductList(this.page)
        .then(res => {
          this.loading = false
          if (res.length === 0) {
            this.finished = true
          }
          this.productList.push(...res)
          this.page += 1
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    cateClick(cate) {
      this.$router.push({ path: '/search', query: { cate } })
    },
    toSearch() {
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.home {
  .my-swipe {
    @include imgWrapHeight(40%);
  }
  position: relative;
  padding-top: 0.88rem;
  padding-bottom: $tabHeight;
  box-sizing: border-box;
  margin-bottom: env(safe-area-inset-bottom);
  .top-bar {
    padding: 0 0.4rem;
  }
}
</style>
