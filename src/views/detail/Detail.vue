<template>
  <div class="detail">
    <div v-if="loading" class="loading">
      <van-loading color="#1989fa" />
    </div>
    <div v-else>
      <div v-if="banner.length === 0">
        <BackBtn class="back" />
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
      <div v-else>
        <van-tabs
          v-model="active"
          scrollspy
          sticky
          title-active-color="#2ca6cb"
          line-height="2px"
          line-width="30px"
        >
          <template #nav-left>
            <BackBtn />
          </template>
          <template #nav-right>
            <div class="tab-right"></div>
          </template>

          <!-- 商品区域 -->
          <van-tab title="商品">
            <swiper
              ref="mySwiper"
              class="my-swiper"
              :options="swiperOptions"
              @click-slide="imgPreview"
            >
              <swiper-slide v-for="(item, index) in banner" :key="index">
                <img :src="item" />
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <Info :price="goodsInfo.price" :title="goodsInfo.title" />
            <Service :service="service" />
          </van-tab>

          <!-- 参数区域 -->
          <van-tab title="参数">
            <Specifications :specifications="specifications" />
          </van-tab>

          <!-- 详情区域 -->
          <van-tab class="img-detail" title="详情">
            <div v-for="(item, index) in detailImg" :key="index">
              <img src="../../assets/images/mask.png" :data-src="item" />
            </div>
          </van-tab>
        </van-tabs>

        <TopIcon v-show="showTopIcon" />

        <van-goods-action>
          <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :info="cartCounts" />
          <van-goods-action-icon icon="star-o" text="收藏" />
          <van-goods-action-button type="warning" text="加入购物车" @click="showSku('addCart')" />
          <van-goods-action-button type="danger" text="立即购买" @click="showSku" />
        </van-goods-action>

        <van-sku
          ref="skuRef"
          v-model="isShowSku"
          :sku="sku"
          :goods="sku.goods"
          :initial-sku="sku.initial_sku"
        >
          <template #sku-actions>
            <div class="confirm-btn">
              <van-button round color="#d0021b" @click="confirmClick">确认</van-button>
            </div>
          </template>
        </van-sku>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'swiper/css/swiper.css'
import BackBtn from '@/components/BackBtn'
import TopIcon from '@/components/TopIcon'
import Info from './components/Info'
import Specifications from './components/Specifications'
import Service from './components/Service'
import { throttle, getScrollTop } from '@/utils'
import { getDetail, getSku } from '@/api/detail'
import { ImagePreview, Toast } from 'vant'
Vue.use(Toast)
export default {
  name: 'Detail',
  components: {
    BackBtn,
    TopIcon,
    Info,
    Specifications,
    Service
  },
  data() {
    return {
      active: 0,
      showTopIcon: false,
      loading: true,
      banner: [],
      goodsInfo: {},
      service: [],
      specifications: [],
      detailImg: [],
      isShowSku: true,
      sku: {},
      isAddCart: true,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        loop: true
      }
    }
  },
  computed: {
    cartCounts() {
      const length = this.$store.state.cart.cartList.length
      return length === 0 ? '' : length
    }
  },
  created() {
    this.getDetailData()
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.scroll), true)
  },
  // 不是跳转到搜索页，移除搜索页缓存
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/search') {
      this.$store.commit('tagsView/delCachedView', 'Search')
    }
    next()
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll() {
      this.showTopIcon = getScrollTop() > 500
      const oLasyImg = document.querySelectorAll('[data-src]')
      oLasyImg.forEach(item => {
        const top = item.getBoundingClientRect().top
        if (top < innerHeight && top > 0) {
          item.src = item.dataset.src
          item.removeAttribute('data-src')
        }
      })
    },
    getDetailData() {
      getDetail(this.$route.params.id)
        .then(res => {
          this.loading = false
          if (res.length === 0) return
          this.banner = res[0].banner
          this.goodsInfo = {
            price: res[0].price,
            title: res[0].title
          }
          this.specifications = this.handleKeyValue(res[0].specifications)
          this.detailImg = res[0].detailImg
          this.service = res[0].service
        })
        .catch(() => {
          this.loading = false
        })
    },
    imgPreview(index, reallyIndex) {
      ImagePreview({
        images: this.banner,
        loop: false,
        startPosition: reallyIndex
      })
    },
    handleKeyValue(arr) {
      return arr.map(item => {
        for (const key in item) {
          return [key, item[key]]
        }
      })
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
    getSkuData() {
      getSku(this.$route.params.id).then(res => {
        if (res.length === 0) return
        this.sku = res[0].sku
      })
    },
    confirmClick() {
      if (this.isAddCart) {
        const { selectedNum, selectedSkuComb } = this.$refs.skuRef.getSkuData()
        this.$store
          .dispatch('cart/addCart', {
            id: selectedSkuComb.id,
            num: selectedNum
          })
          .then(_ => {
            Toast('商品已成功添加到购物车')
          })
          .catch(_ => {
            Toast('商品添加到购物车失败')
          })
        this.isShowSku = false
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.detail {
  min-height: 80vh;
  padding-bottom: 1.2rem;
  font-size: 0.26rem;
  ::v-deep .van-tabs__line {
    background-color: #2ca6cb;
    margin-bottom: 2px;
  }
  .back {
    height: 0.88rem;
  }
  .tab-right {
    width: 44px;
  }
  .van-empty {
    height: 70vh;
  }
  .loading {
    height: 80vh;
    @include center();
  }
  .my-swiper {
    min-height: 100vw;
    img {
      transform: translate3d(0, 0, 0);
    }
  }
  .swiper-pagination {
    margin-bottom: 0.36rem;
    width: 1rem;
    padding: 0.02rem 0.06rem;
    font-size: 0.28rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
  .img-detail {
    margin-bottom: env(safe-area-inset-bottom);
  }
  .van-goods-action {
    z-index: 12;
    .van-goods-action-icon {
      width: 1rem;
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
