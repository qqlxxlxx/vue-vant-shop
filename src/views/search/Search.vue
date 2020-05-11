<template>
  <div class="list">
    <TopBar>
      <template #left>
        <BackBtn />
      </template>
      <MySearch
        v-model="keywords"
        :isFocus="focus"
        @search="search"
        @empty="inputEmpty"
        @cleanSearch="keywords=''"
      />
      <template #right>
        <div class="search-btn" @click="search">搜索</div>
      </template>
    </TopBar>

    <History
      :showHistory="showHistory"
      :historyList="historyList"
      @clearHistory="clearHistory"
      @itemClick="historyClick"
    />

    <div class="search-none" v-show="searchNone">没有找到呢~</div>

    <SearchList :list="list" />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BackBtn from '@/components/BackBtn'
import SearchList from './components/SearchList'
import MySearch from '@/components/MySearch'
import History from './components/History'
export default {
  name: 'Search',
  data() {
    return {
      list: [],
      keywords: '',
      focus: true,
      searchNone: false,
      showHistory: false,
      historyList: []
    }
  },
  components: {
    TopBar,
    BackBtn,
    MySearch,
    SearchList,
    History
  },
  created() {
    // 是否自动获取焦点
    this.focus = !this.$route.query.cate
    // 是否显示搜索历史
    this.showHistory = !this.$route.query.cate
    // 是否获取分类数据
    if (this.$route.query.cate) {
      this.getCateList()
    }
    // 获取历史记录
    this.getHistory()
  },
  // 如果搜索页跳转到详情页，把搜索页缓存起来
  beforeRouteLeave(to, from, next) {
    if (to.path.startsWith('/detail')) {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 获取分类数据
    getCateList() {
      this.$http
        .get('/productList?cate=' + this.$route.query.cate)
        .then(res => {
          this.list = res.data
        })
    },
    // 获取搜索结果
    searchRequest(keywords) {
      this.$http
        .get('/productList?name_like=' + keywords)
        .then(res => {
          this.searchNone = res.data.length === 0
          this.list = this.highLighter(res.data, keywords)
        })
        .catch(err => console.log(err))
    },
    // 输入框为空时：清空搜索列表，隐藏搜索提示，显示搜索历史
    inputEmpty() {
      this.list = []
      this.searchNone = false
      this.showHistory = true
    },
    // 搜索
    search() {
      const keywords = this.keywords.trim()
      if (keywords === '') return
      this.showHistory = false
      this.saveHistory(keywords)
      this.searchRequest(keywords)
    },
    // 点击历史记录搜索
    historyClick(value) {
      this.keywords = value
      this.search()
    },
    // 清空搜索历史
    clearHistory() {
      this.historyList = []
      sessionStorage.removeItem('history')
    },
    // 存储历史记录的方法
    saveHistory(keywords) {
      const index = this.historyList.indexOf(keywords)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(keywords)
      sessionStorage.setItem('history', this.historyList)
    },
    // 获取历史记录的方法
    getHistory() {
      const history = sessionStorage.getItem('history')
      this.historyList = history ? history.split(',') : []
    },
    // 给搜索关键字添加高亮
    highLighter(data, keywords) {
      const reg = new RegExp(keywords, 'ig')
      const res = data.map(item => {
        const matchStr = reg.exec(item.name)[0]
        item.name = item.name.replace(
          reg,
          `<span style="color: red;">${matchStr}</span>`
        )
        return item
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.list {
  padding-top: 1rem;
  padding-bottom: $tabHeight;
}
.search-btn {
  width: 0.88rem;
  padding-right: 0.14rem;
  line-height: 0.88rem;
}
.search-none {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
