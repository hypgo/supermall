<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <!-- scroll必须要有固定的高度 -->
    <scroll class="content">
      <template v-slot:scroll>
        <detail-swiper :topImages="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" />
      </template>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import Scroll from 'components/common/scroll/Scroll'

import {getDetailData, Goods} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      // 组件传数据，要整合成一个对象 --> 面向对象的思想，用class类封装
      goods: {},
      shop: {},
      detailInfo: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetailData (this.iid).then(res => {
      const data = res.result
      console.log(data);
      // 2.1 获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      // 2.2 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      console.log(this.goods);

      // 2.3 get shop infomation
      this.shop = data.shopInfo
      console.log(this.shop);
      // 2.3 get good-detail images
      this.detailInfo = data.detailInfo
    })
  },
}
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  // 让content的父元素detail等于100的视口高度,就能让content滚动
  height: 100vh;
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
}
</style>
