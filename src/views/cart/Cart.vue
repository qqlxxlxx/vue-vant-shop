<template>
  <div class="shopping-cart">
    <TopBar>购物车</TopBar>

    <div class="mian">
      <!-- 下拉区域 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 购物车为空提示 -->
        <van-empty
          v-if="cartList.length === 0"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="购物车是空的"
        />

        <!-- 购物车列表 -->
        <div class="cart-list" v-else>
          <van-checkbox-group v-model="result" ref="checkboxGroup" @change="changeCheck">
            <!-- 滑动单元 -->
            <van-swipe-cell
              v-for="item in cartList"
              :key="item.id"
              :before-close="beforeClose"
              :name="item.id"
            >
              <div class="cart-item">
                <div class="checkbox-wrap">
                  <van-checkbox :name="item.id" />
                </div>
                <MyCard
                  class="card"
                  :picture="item.picture"
                  :link="item.link"
                  :title="item.title"
                  :desc="item.desc"
                  :price="item.price"
                >
                  <template #num>
                    <van-stepper
                      disable-input
                      v-model="item.num"
                      @change="changeNum(item.id, item.num)"
                    />
                  </template>
                </MyCard>
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
        <van-checkbox v-model="checked" @click="CheckAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import MyCard from './components/MyCard'
export default {
  name: 'Cart',
  data() {
    return {
      isLoading: false,
      result: [],
      checked: false,
      totalPrice: 0
    }
  },
  components: {
    TopBar,
    MyCard
  },
  created() {
    this.$store.dispatch('cart/getCartList')
  },
  computed: {
    cartList() {
      return this.$store.state.cart.cartList
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh() {
      await this.$store.dispatch('cart/getCartList')
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
          this.$store.dispatch('cart/delGoods', name)
          instance.close()
          break
      }
    },
    // 切换勾选商品时触发
    changeCheck() {
      this.checked = this.result.length === this.cartList.length
      this.calcTotal(this.result, this.cartList)
    },
    // 点击切换全选
    CheckAll() {
      this.$refs.checkboxGroup.toggleAll(!this.checked)
    },
    // 加减商品数量时触发
    changeNum(id, num) {
      this.calcTotal(this.result, this.cartList)
      this.$store.dispatch('cart/updateCart', { id, num })
    },
    // 计算已选商品的总价格
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
    onSubmit() {
      if (this.result.length === 0) return
      this.$router.push({ path: '/profile' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.top-bar {
  line-height: 0.88rem;
}
.mian {
  position: absolute;
  left: 0;
  top: 0.88rem;
  bottom: $tabHeight;
  width: 100%;
  background: #f6f6f6;
  overflow: auto;
  .van-empty,
  .cart-list {
    width: 100%;
    min-height: 60vh;
    margin-bottom: 10vh;
  }
  .van-swipe-cell {
    margin: 10px 10px 0 10px;
    background: #fff;
    border-radius: 10px;
  }
  .cart-item {
    display: flex;
    .card {
      flex: 1;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .checkbox-wrap {
      width: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .delete-button {
    height: 100%;
  }
  .van-checkbox,
  .van-stepper {
    touch-action: none;
  }
  .van-submit-bar {
    position: fixed;
    left: 0;
    bottom: $tabHeight;
    touch-action: none;
  }
}
//
</style>
