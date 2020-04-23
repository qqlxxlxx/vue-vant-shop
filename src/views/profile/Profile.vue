<template>
  <div class="profile">
    <div class="login">
      <div class="back-btn" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <van-form @submit="onSubmit">
        <div class="title">请登录</div>
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" />
        <div style="margin: 30px;">
          <van-button :disabled="isDisabled" round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      <van-loading v-if="loading" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  deactivated() {
    this.username = ''
    this.password = ''
  },
  computed: {
    isDisabled() {
      return this.username === '' || this.password.length < 6
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    onSubmit(values) {
      if (this.loading) return
      this.loading = true
      setTimeout(() => {
        this.loading = false
        Toast('用户名或密码错误')
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 10;
}
.back-btn {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.4rem;
}
.van-form {
  position: absolute;
  top: 18%;
  left: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .title {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 0.4rem;
    text-align: center;
  }
}
.van-loading {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
