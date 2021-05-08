<template>
  <div id="detail">
    <detail-nav-bar class="home-nav" />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
  </div>
</template>

<script type="text/ecmascript-6">
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import {getDetailData, Goods} from 'network/detail.js'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      // 组件传数据，要整合成一个对象 --> 面向对象的思想，用class类封装
      goods: {},
      shop: {}
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
    })
  },
}
</script>

<style lang="less" scoped></style>
