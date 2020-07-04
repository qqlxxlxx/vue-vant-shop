<template>
  <div class="service-warp border-top">
    <label>服务</label>
    <div class="service">
      <div v-for="(item,index) in service" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Service',
  props: {
    service: Array
  }
}
</script>

<style lang="scss" scoped>
.service-warp {
  position: relative;
  padding: 0.22rem 0.22rem 0 0.22rem;
  label {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    color: #666;
  }
  .service {
    margin-left: 1.2rem;
    div {
      position: relative;
      margin-bottom: 0.22rem;
      line-height: normal;
      color: #666;
      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.1rem;
        background: url(../../../assets/images/icon_discount.png) no-repeat
          center/cover;
      }
    }
  }
}
</style>
