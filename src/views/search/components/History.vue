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
  padding: 10px;
}
.history-title {
  margin-bottom: 10px;
}
.history-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  .history-item {
    padding: 6px 16px;
    border-radius: 6px;
    background: #f2f2f2;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.clear-history {
  padding: 10px;
  text-align: center;
  .van-icon {
    margin-right: 4px;
    vertical-align: -2px;
  }
}
</style>
