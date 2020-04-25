<template>
  <div class="search">
    <div class="search-content">
      <van-icon name="search" />
      <input
        ref="input"
        type="search"
        placeholder="请输入搜索关键词"
        v-focus="isFocus"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="search"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySearch',
  props: {
    value: String,
    isFocus: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    focus: {
      inserted(el, binding) {
        if (binding.value) el.focus()
      }
    }
  },
  watch: {
    value() {
      if (this.value === '') {
        this.$emit('empty')
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
.search {
  width: 100%;
  height: 100%;
  padding: 0.1rem 0;
  box-sizing: border-box;
}
.search-content {
  width: 100%;
  height: 100%;
  background: #f5f6f8;
  border-radius: 99px;
  padding-left: 0.8rem;
  box-sizing: border-box;
  position: relative;
  .van-icon {
    width: 0.8rem;
    font-size: 0.32rem;
    text-align: center;
    color: #aaa;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    flex: 1;
    width: 100%;
    height: 100%;
    outline: 0;
    border: 0;
    padding: 0;
    background-color: transparent;
    color: #323233;
  }
}
</style>
