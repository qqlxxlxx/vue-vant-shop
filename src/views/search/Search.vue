<template>
  <div class="list">
    <SearchBar
      v-model="keywords"
      :focus="focus"
      @search="search"
      @back="back"
      @inputNone="emptyInput"
    />

    <History
      :showHistory="showHistory"
      :historyList="historyList"
      @clearHistory="clearHistory"
      @itemClick="historyClick"
    />

    <div v-show="searchNone" class="search-none">没有找到呢~</div>

    <SearchList :list="list" />
  </div>
</template>

<script>
import SearchList from './components/SearchList'
import SearchBar from './components/SearchBar'
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
    SearchList,
    SearchBar,
    History
  },
  created() {
    this.getCateList()
    this.getHistory()
    this.focus = !!this.$route.query.cate
    this.showHistory = !this.$route.query.cate
  },
  methods: {
    back() {
      this.$router.back()
    },
    getCateList() {
      this.$http
        .get('/productList?cate=' + this.$route.query.cate)
        .then(res => {
          this.list = res.data
        })
    },
    // 监听输入框为空时
    emptyInput() {
      this.list = []
      this.searchNone = false
      this.showHistory = true
    },
    // 搜索事件
    search() {
      const keywords = this.keywords.trim()
      if (keywords === '') return
      this.showHistory = false
      this.saveHistory(keywords)
      this.searchRequest(keywords)
    },
    // 监听单个历史记录点击
    historyClick(value) {
      this.keywords = value
      this.search()
    },
    // 清空搜索历史
    clearHistory() {
      this.historyList = []
      sessionStorage.removeItem('history')
    },
    // 搜索网络请求
    searchRequest(keywords) {
      this.$http
        .get('/productList?name_like=' + keywords)
        .then(res => {
          this.searchNone = res.data.length === 0
          this.list = res.data
        })
        .catch(err => console.log(err))
    },
    saveHistory(keywords) {
      const index = this.historyList.indexOf(keywords)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(keywords)
      sessionStorage.setItem('history', this.historyList)
    },
    getHistory() {
      const history = sessionStorage.getItem('history')
      this.historyList = history ? history.split(',') : []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.list {
  padding-top: 50px;
  padding-bottom: $tabHeight;
}
.search-none {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
