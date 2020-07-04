<template>
  <div v-show="show" class="history">
    <div class="history-title">搜索历史</div>
    <div class="history-list">
      <div
        class="history-item"
        v-for="value in historyList"
        :key="value"
        @click="$emit('itemClick', value)"
      >{{value}}</div>
    </div>
    <div class="clear-history" @click="$emit('clearHistory')">
      <van-icon name="delete" />清空搜索历史
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    showHistory: Boolean,
    historyList: Array
  },
  computed: {
    show() {
      if (this.showHistory) {
        return this.historyList.length !== 0
      }
      return this.showHistory
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  padding: 0.2rem;
  font-size: 0.24rem;
}
.history-title {
  margin-bottom: 0.32rem;
  font-size: 0.26rem;
}
.history-list {
  display: flex;
  flex-wrap: wrap;
}
.history-item {
  padding: 0.08rem 0.24rem;
  border-radius: 0.1rem;
  background: #f2f2f2;
  margin-right: 0.16rem;
  margin-bottom: 0.16rem;
}
.clear-history {
  margin-top: 0.32rem;
  text-align: center;
  color: #999;
  .van-icon {
    margin-right: 4px;
    vertical-align: -3px;
  }
}
</style>
