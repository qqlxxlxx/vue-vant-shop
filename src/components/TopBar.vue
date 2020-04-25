<template>
  <div class="top-bar van-hairline--bottom">
    <slot name="left"></slot>
    <div class="center">
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'TopBar'
}
</script>

<style lang="scss" scoped>
.top-bar {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 0.88rem;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  display: flex;
}
.center {
  flex: 1;
}
</style>
