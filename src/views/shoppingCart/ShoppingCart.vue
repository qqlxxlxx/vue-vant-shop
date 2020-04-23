<template>
  <div class="shopping-cart">
    <van-nav-bar title="购物车" fixed border />
    <div class="content">
      <!-- 下拉区域 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-empty
          v-if="isEmpty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="购物车是空的"
        />
        <div class="cart-list" v-else>
          <van-checkbox-group v-model="result" ref="checkboxGroup" @change="changeCheck">
            <van-swipe-cell
              v-for="item in cartList"
              :key="item.id"
              :before-close="beforeClose"
              :name="item.id"
            >
              <div class="cell-content">
                <van-checkbox :name="item.id" />
                <van-card
                  :price="item.price"
                  :desc="item.desc"
                  :title="item.title"
                  :thumb="item.picture"
                  :thumb-link="item.link"
                >
                  <template #num>
                    <van-stepper
                      disable-input
                      v-model="item.num"
                      @change="changeNum(item.id, item.num)"
                    />
                  </template>
                </van-card>
              </div>
              <template #right>
                <van-button class="delete-button" square text="删除" type="danger" />
              </template>
            </van-swipe-cell>
          </van-checkbox-group>
        </div>
      </van-pull-refresh>
      <!-- 结算区域 -->
      <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      result: [],
      checked: false,
      totalPrice: 0
    }
  },
  created() {
    console.log(window.location.host)
    this.$store.dispatch('getCartList')
  },
  computed: {
    ...mapState({
      cartList: 'cartList',
      isEmpty: 'cartEmpty'
    })
  },
  watch: {
    checked() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(this.checked)
      } else {
        this.$refs.checkboxGroup.toggleAll(this.checked)
      }
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh() {
      await this.$store.dispatch('getCartList')
      this.isLoading = false
    },
    // 删除商品
    beforeClose({ position, instance, name }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$store.dispatch('updateGoods', { id: name })
          instance.close()
          break
      }
    },
    // 切换商品勾选时触发
    changeCheck() {
      if (this.result.length === this.cartList.length) {
        this.checked = true
      } else {
        this.checked = false
      }
      this.calcTotal(this.result, this.cartList)
    },
    // 计算价格总和的方法
    calcTotal(idArr, cartList) {
      let total = 0
      cartList.forEach((item, index) => {
        idArr.forEach(id => {
          if (item.id === id) {
            return (total += item.num * parseFloat(item.price))
          }
        })
      })
      this.totalPrice = total * 100
    },
    // 数量变化时触发
    changeNum(id, num) {
      this.calcTotal(this.result, this.cartList)
      this.$store.dispatch('updateGoods', { id, num })
    },
    onSubmit() {
      if (this.result.length === 0) return
      this.$router.push({ path: '/profile' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.shopping-cart {
  height: 100%;
  box-sizing: border-box;
  background: #f6f6f6;
  overflow: hidden;
}
.content {
  position: absolute;
  left: 0;
  top: 46px;
  bottom: $tabHeight;
  width: 100%;
  background: #f6f6f6;
  overflow: auto;
  .van-empty {
    height: 70vh;
  }
  .cart-list {
    width: 100%;
    min-height: 60vh;
    margin-bottom: 10vh;
  }
  .van-swipe-cell {
    margin: 10px 10px 0 10px;
    background: #fff;
    border-radius: 10px;
    .cell-content {
      display: flex;
    }
  }
  .van-checkbox {
    flex: 1;
    justify-content: center;
    touch-action: none;
  }
  .van-card {
    flex: 7;
    padding-left: 0;
    background: #fff;
  }
  .delete-button {
    height: 100%;
  }
  .van-submit-bar {
    position: fixed;
    left: 0;
    bottom: $tabHeight;
    touch-action: none;
  }
  .van-stepper {
    touch-action: none;
  }
}
</style>
