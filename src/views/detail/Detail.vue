<template>
  <div class="detail">
    <van-tabs
      v-model="active"
      scrollspy
      sticky
      title-active-color="#2ca6cb"
      line-height="2px"
      line-width="30px"
    >
      <template #nav-left>
        <div class="tab-left" @click="backHome">
          <van-icon name="arrow-left" />
        </div>
      </template>

      <!-- 商品区域 -->
      <van-tab title="商品">
        <!-- 轮播图 -->
        <van-swipe :duration="1000" @change="changeImg">
          <van-swipe-item v-for="(item, index) in banner" :key="index" @click="PreviewImg(index)">
            <img :src="item" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ banner.length }}</div>
          </template>
        </van-swipe>

        <div class="goods-info">
          <div class="price">
            <span class="symbol">￥</span>
            <span>{{price}}</span>
          </div>
          <div class="title">{{title}}</div>
        </div>

        <div class="service-warp border-top">
          <label>服务</label>
          <div class="service">
            <div v-for="(item,index) in service" :key="index">{{item}}</div>
          </div>
        </div>
      </van-tab>
      <!-- 参数区域 -->
      <van-tab title="参数">
        <div class="props-wrap border-top">
          <div class="props">规格参数</div>
          <table>
            <tbody>
              <tr class="van-hairline--top" v-for="(item, index) in specifications" :key="index">
                <th>{{item[0]}}</th>
                <td>{{item[1]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </van-tab>
      <!-- 详情区域 -->
      <van-tab title="详情">
        <div v-for="(item, index) in detailImg" :key="index">
          <img :src="item" />
        </div>
      </van-tab>

      <template #nav-right>
        <div class="tab-right"></div>
      </template>
    </van-tabs>

    <van-goods-action>
      <van-goods-action-icon to="/shoppingCart" icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="showSku('addCart')" />
      <van-goods-action-button type="danger" text="立即购买" @click="showSku" />
    </van-goods-action>

    <van-sku
      ref="skuRef"
      v-model="isShowSku"
      :sku="sku"
      :goods="sku.goods"
      :quota="sku.quota"
      :initial-sku="sku.initial_sku"
    >
      <template #sku-actions>
        <div class="confirm-btn">
          <van-button round color="#d0021b" @click="confirmClick">确认</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview, Toast } from 'vant'
Vue.use(Toast)
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      active: 0,
      current: 0,
      banner: [],
      price: '',
      title: '',
      service: [],
      specifications: [],
      detailImg: [],
      isShowSku: true,
      sku: {},
      isAddCart: true
    }
  },
  created() {
    this.getDetailData()
  },
  computed: {},
  methods: {
    backHome() {
      this.$router.push({ path: '/home' })
    },
    async getDetailData() {
      try {
        const id = this.$route.params.id
        const { data: res } = await this.$http.get('/detail?id=' + id)
        // console.log(res[0])
        if (res.length === 0) return
        this.banner = res[0].banner
        this.price = res[0].price
        this.title = res[0].title
        this.specifications = this.handleKeyValue(res[0].specifications)
        this.detailImg = res[0].detailImg
        this.service = res[0].service
      } catch {}
    },
    changeImg(index) {
      this.current = index
    },
    PreviewImg(index) {
      ImagePreview({
        images: this.banner,
        loop: false,
        startPosition: index
      })
    },
    handleKeyValue(arr) {
      const newArr = arr.map((item, index) => {
        for (const key in item) {
          return [key, item[key]]
        }
      })
      return newArr
    },
    showSku(whichBtn) {
      this.getSkuData()
      this.isShowSku = true
      if (whichBtn === 'addCart') {
        this.isAddCart = true
      } else {
        this.isAddCart = false
      }
    },
    async getSkuData() {
      try {
        const id = this.$route.params.id
        const { data: res } = await this.$http.get('/skudata?id=' + id)
        if (res.length === 0) return
        this.sku = res[0].sku
      } catch {}
    },
    async confirmClick() {
      if (this.isAddCart) {
        try {
          const {
            selectedNum,
            selectedSkuComb
          } = this.$refs.skuRef.getSkuData()
          const { data: res } = await this.$http.put(
            '/cart/' + selectedSkuComb.id,
            {
              num: selectedNum
            }
          )
          if (res) Toast('商品已成功添加到购物车')
          this.isShowSku = false
        } catch {
          Toast('商品添加到购物车失败')
        }
      } else {
        this.$router.push({ path: '/profile' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.detail {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  min-height: 100vh;
  padding-bottom: $tabHeight;
  background-color: #fff;
  font-size: 0.26rem;
  overflow: hidden;
  img {
    width: 100%;
  }
  .border-top {
    border-top: 0.2rem solid #f9f9f9;
  }
  ::v-deep .van-tabs__line {
    background-color: #2ca6cb;
    margin-bottom: 2px;
  }
  .tab-left {
    width: 44px;
    height: 44px;
    font-size: 18px;
    @include center();
  }
  .tab-right {
    width: 44px;
  }
  .custom-indicator {
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    padding: 0.02rem 0.18rem;
    font-size: 0.28rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    color: #fff;
  }
  .van-image-preview {
    height: 50px;
  }
  .goods-info {
    padding: 0.22rem;
    font-weight: bold;
    .price {
      font-size: 0.52rem;
      color: $priceColor;
      .symbol {
        font-size: 0.32rem;
      }
    }
    .title {
      margin-top: 0.1rem;
      font-size: 0.3rem;
    }
  }
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
          background: url(../../assets/images/icon_discount.png) no-repeat
            center/cover;
        }
      }
    }
  }
  .props-wrap {
    padding: 0.22rem;
    .props {
      padding-bottom: 0.4rem;
      font-weight: bold;
      font-size: 0.3rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        th {
          width: 1.8rem;
          padding: 0.2rem 0.2rem 0.2rem 0;
          text-align: left;
          font-weight: normal;
          color: #666;
        }
        td {
          padding: 0.2rem 0 0.2rem 0.2rem;
        }
      }
    }
  }

  .van-goods-action {
    height: $tabHeight;
    .van-goods-action-icon {
      width: 80px;
    }
  }
  .confirm-btn {
    padding: 4px 8px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
