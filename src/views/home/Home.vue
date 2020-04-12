<template>
  <div class="home" ref="home">
    <div class="search-bar">
      <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词" />
    </div>

    <Swiper :bannerImages="bannerImages" />
    <Category :category="category" />

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

    <div v-show="isShowBackTop" @click="backTop">
      <BackTop />
    </div>
  </div>
</template>

<script>
import tools from '@/assets/js/tools.js'
import BackTop from '@/components/BackTop'
import Swiper from './components/Swiper'
import Category from './components/Category'
import Recommend from './components/Recommend'
export default {
  data() {
    return {
      timerId: null,
      flag: true,
      isShowBackTop: false,
      searchValue: '',
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
    BackTop,
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
    window.addEventListener('scroll', this.handleScroll, true)
  },
  deactivated() {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll(e) {
      // 函数节流
      if (!this.flag) return
      this.flag = false
      this.timerId && clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.flag = true
        const scrollY = tools.getScrollTop()
        this.isShowBackTop = scrollY > 500
      }, 250)
    },
    backTop() {
      tools.setScrollTop(0)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.home {
  position: relative;
  padding-top: 46px;
  margin-bottom: $tabHeight;
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    .van-search {
      padding: 6px 12px;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
