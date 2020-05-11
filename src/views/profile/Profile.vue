<template>
  <div class="profile">
    <div class="login">
      <BackBtn class="back-btn" />
      <form method="post" @submit="onSubmit">
        <div class="title">请登录</div>
        <div class="form-item van-hairline--bottom">
          <div class="label">用户名</div>
          <input
            type="text"
            autocomplete="off"
            v-model="username"
            name="username"
            placeholder="用户名"
          />
        </div>
        <div class="form-item van-hairline--bottom">
          <div class="label">密码</div>
          <input type="password" v-model="password" name="password" placeholder="密码" />
        </div>
        <div class="btn">
          <button type="submit" :disabled="isDisabled">提交</button>
        </div>
      </form>
      <van-loading v-if="loading" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import BackBtn from '@/components/BackBtn'
Vue.use(Toast)
export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  components: {
    BackBtn
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
    onSubmit(e) {
      e.preventDefault()
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
.profile {
  position: relative;
}
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 5;
}
.back-btn {
  position: fixed;
  top: 0;
  left: 0;
  height: 0.88rem;
}
form {
  margin: 34% auto 0;
  width: 6.6rem;
}
.title {
  margin-bottom: 0.6rem;
  font-weight: bold;
  font-size: 0.34rem;
  text-align: center;
}
.form-item {
  padding: 0.2rem 0.4rem;
  font-size: 0.26rem;
  color: #323233;
  display: flex;
}
.label {
  width: 1.6rem;
  margin-top: 2px;
}
input,
button {
  border: 0;
  outline: 0;
  background: transparent;
}
input {
  flex: 1;
  padding: 0;
}
.btn {
  width: 4rem;
  height: 0.8rem;
  margin: 0.6rem auto 0;
}
button {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background-color: #1989fa;
  color: #fff;
}
button:disabled {
  background-color: #84bcf4;
}
.van-loading {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
