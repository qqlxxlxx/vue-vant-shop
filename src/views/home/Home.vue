<template>
  <div class="home" ref="home">
    <van-search disabled shape="round" placeholder="请输入搜索关键词" @click="goSearch" />

    <Swiper :bannerImages="bannerImages" />
    <Category :category="category" @gridClick="gridClick" />

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
  </div>
</template>

<script>
import tools from '@/assets/js/tools.js'
import Swiper from './components/Swiper'
import Category from './components/Category'
import Recommend from './components/Recommend'
export default {
  data() {
    return {
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
  methods: {
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
    gridClick(cate) {
      this.$router.push({ path: '/search', query: { cate } })
    },
    goSearch() {
      this.$router.push({ path: '/search' })
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
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding: 6px 20px;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
