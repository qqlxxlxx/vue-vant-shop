<template>
  <div class="home" ref="home">
    <TopBar @click.native="toSearch">
      <MySearch disabled />
    </TopBar>

    <div class="my-swipe">
      <Swiper :bannerImages="bannerImages" />
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
import tools from '@/assets/js/tools.js'
import TopIcon from '@/components/TopIcon'
import TopBar from '@/components/TopBar'
import MySearch from '@/components/MySearch'
import Swiper from './components/Swiper'
import Category from './components/Category'
import Recommend from './components/Recommend'
export default {
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
  components: {
    TopIcon,
    TopBar,
    MySearch,
    Swiper,
    Category,
    Recommend
  },
  created() {
    this.getHomeData()
  },
  mounted() {
    tools.setScrollTop(0)
  },
  activated() {
    window.addEventListener('scroll', tools.throttle(this.handleScroll), true)
  },
  deactivated() {
    window.removeEventListener(
      'scroll',
      tools.throttle(this.handleScroll),
      true
    )
  },
  methods: {
    handleScroll() {
      this.flag = true
      this.showTopIcon = tools.getScrollTop() > 500
    },
    async getHomeData() {
      try {
        const res = await this.$http.get('/home')
        // console.log(res)
        if (res.status !== 200) return
        this.bannerImages = res.data.banner
        this.category = res.data.category
      } catch {}
    },
    // 上拉加载
    async onLoad() {
      try {
        const queryInfo = `?_page=${this.page}&_limit=12`
        const res = await this.$http.get('/productList' + queryInfo)
        this.loading = false
        if (res.data.length === 0) this.finished = true
        this.productList.push(...res.data)
        this.page += 1
      } catch {
        this.loading = false
        this.error = true
      }
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
