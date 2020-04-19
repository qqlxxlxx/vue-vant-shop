<template>
  <div class="search van-hairline--bottom">
    <div class="back-btn" @click="$emit('back')">
      <van-icon name="arrow-left" />
    </div>
    <div class="search-content">
      <van-icon name="search" />
      <input
        v-if="focus"
        type="search"
        ref="input"
        placeholder="请输入搜索关键词"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="search"
      />
      <input
        v-else
        type="search"
        ref="input"
        v-focus
        placeholder="请输入搜索关键词"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="search"
      />
    </div>
    <div class="search-btn" @click="search">搜索</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    focus: Boolean
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  watch: {
    value() {
      if (this.value === '') {
        this.$emit('inputNone')
      }
    }
  },
  methods: {
    search() {
      this.$refs.input.blur()
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.search {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 42px;
  padding: 4px 8px;
  box-sizing: border-box;
  background: #fff;
  @include center();
  .back-btn {
    width: 38px;
    height: 100%;
    font-size: 0.34rem;
    @include center();
  }
  .search-content {
    flex: 1;
    background: #f7f8fa;
    padding: 0 10px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 99px;
    display: flex;
    .van-icon {
      margin-right: 8px;
      @include center();
    }
    input {
      width: 100%;
      height: 100%;
      outline: 0;
      border: 0;
      padding: 0;
      background-color: transparent;
      color: #323233;
    }
  }
  .search-btn {
    width: 44px;
    text-align: center;
  }
}
</style>
