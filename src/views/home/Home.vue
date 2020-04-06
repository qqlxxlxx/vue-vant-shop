<template>
  <div class="home">
    home
    <!-- <div>55</div> -->
    <div class="bottom">bottom</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {}
  },
  components: {},
  created() {}
}
</script>

<style scoped>
.home {
  position: relative;
  height: 3000px;
  background-color: rgb(219, 146, 146);
}
.bottom {
  position: absolute;
  bottom: 0;
}
</style>
