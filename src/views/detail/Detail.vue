<template>
  <div class="detail">
    <div v-if="isEmpty">
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
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in banner" :key="index">
              <img :src="item" @click="imgPreview(index)" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <Info :price="price" :title="title" />
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
        <van-goods-action-icon to="/cart" icon="cart-o" text="购物车" />
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
</template>

<script>
import Vue from 'vue'
import tools from '@/assets/js/tools.js'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { ImagePreview, Toast } from 'vant'
import BackBtn from '@/components/BackBtn'
import TopIcon from '@/components/TopIcon'
import Info from './components/Info'
import Specifications from './components/Specifications'
import Service from './components/Service'
Vue.use(Toast)
export default {
  name: 'Detail',
  components: {
    BackBtn,
    TopIcon,
    Swiper,
    SwiperSlide,
    Info,
    Specifications,
    Service
  },
  data() {
    return {
      isEmpty: true,
      showTopIcon: false,
      active: 0,
      banner: [],
      price: '',
      title: '',
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
  created() {
    this.getDetailData()
  },
  mounted() {
    window.addEventListener('scroll', tools.throttle(this.scroll), true)
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll() {
      this.showTopIcon = tools.getScrollTop() > 500
      const oLasyImg = document.querySelectorAll('[data-src]')
      oLasyImg.forEach(item => {
        if (item.getBoundingClientRect().top < innerHeight) {
          item.src = item.dataset.src
          item.removeAttribute('data-src')
        }
      })
    },
    async getDetailData() {
      try {
        const id = this.$route.params.id
        const { data: res } = await this.$http.get('/detail?id=' + id)
        // console.log(res[0])
        if (res.length === 0) {
          this.isEmpty = true
          return
        }
        this.isEmpty = false
        this.banner = res[0].banner
        this.price = res[0].price
        this.title = res[0].title
        this.specifications = this.handleKeyValue(res[0].specifications)
        this.detailImg = res[0].detailImg
        this.service = res[0].service
      } catch {}
    },
    imgPreview(index) {
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
    confirmClick() {
      if (this.isAddCart) {
        const { selectedNum, selectedSkuComb } = this.$refs.skuRef.getSkuData()
        this.$store.dispatch('updateGoods', {
          id: selectedSkuComb.id,
          num: selectedNum,
          update: true
        })
        if (this.$store.state.updateSuccess) {
          Toast('商品已成功添加到购物车')
        } else {
          Toast('商品添加到购物车失败')
        }
        this.isShowSku = false
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
