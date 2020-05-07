<template>
  <div class="search">
    <div class="search-content">
      <van-icon class="search" name="search" />
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
      <van-icon v-show="value && value.length!==0" class="cross" name="cross" @click="$emit('cleanSearch')" />
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
@import '../assets/css/variable.scss';
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
  padding: 0 0.8rem;
  box-sizing: border-box;
  position: relative;
  .van-icon {
    width: 0.8rem;
    height: 100%;
    padding: 0;
    font-size: 0.32rem;
    text-align: center;
    color: #aaa;
    position: absolute;
    top: 0;
    @include center();
    &.search {
      left: 0;
    }
    &.cross {
      right: 0;
    }
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
