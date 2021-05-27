<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar" />
    <!-- scroll必须要有固定的高度 -->
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <template v-slot:scroll>
        <detail-swiper :topImages="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info
          :detail-info="detailInfo"
          @detailImagesLoad="detailImagesLoad"
        />
        <detail-param-info :param-info="paramInfo" ref="params" />
        <detail-comment-info :comment-info="commentInfo" ref="comment" />
        <goods-list :goods="recommendList" ref="recommend" />
      </template>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script type="text/ecmascript-6">
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetailData, Goods,GoodsParam,getRecommend} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      // 轮播图
      topImages: [],
      // 组件传数据，要整合成一个对象 --> 面向对象的思想，用class类封装
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      detailModelTop: [],
      currentIndex: '',
      isShowBackTop: false
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
      // 2.4 get good-detail images
      this.detailInfo = data.detailInfo
      // 2.5 get good-detail params
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      console.log(this.paramInfo);

      // 2.6 get good-detail comment
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // $nextTick() DOM渲染完成，但是图片却未全部加载出来
      // offsetTop的值不对，几乎都是图片未加载完成的原因
      this.getDetailModelTop = this.debounce( () => {
        this.detailModelTop = []
        this.detailModelTop.push(0)
        this.detailModelTop.push(this.$refs.params.$el.offsetTop)
        this.detailModelTop.push(this.$refs.comment.$el.offsetTop)
        this.detailModelTop.push(this.$refs.recommend.$el.offsetTop)
        this.detailModelTop.push(Number.MAX_VALUE)

        console.log('detail模块的高度',this.detailModelTop);
      },2000)
    })

    // 3. 获取推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
    })
  },
  methods: {
    detailImagesLoad () {
      this.$refs.scroll.refresh()
      // 正确的做法是让图片加载完成后，回调给父组件时，去获得子组件各模块的高度
      this.getDetailModelTop()
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0,-this.detailModelTop[index], 100)
    },
    // 滚动模块实现标题切换
    contentScroll (position) {
      // 获取滚动的y值
      const positionY = -position.y
      // position与模块的y值进行对比
      /* [0,1000,5000,8000]，在下面分成2块去判断它的位置
      positionY 在0和1000之间，index = 0
      positionY 在=1000和5000之间，index = 1
      positionY 在=5000和8000之间，index = 2

      positionY ≥8000，index = 3
       */
      let length = this.detailModelTop.length
      // 最后一个值是js最大值，不需要再判断了。
      for (let i = 0; i < length-1; i++) {
        // 标记当前位置的索引，在当前界面下，就不需要多次执行赋值
        /* if (this.currentIndex !== i && ((i < length-1 && positionY >= this.detailModelTop[i] && positionY < this.detailModelTop[i+1]) || (i === length -1 && positionY >= this.detailModelTop[i]))) {
          this.currentIndex = i
          this.$refs.navBar.currentIndex = this.currentIndex
        } */
        if (this.currentIndex !== i && positionY >= this.detailModelTop[i] && positionY < this.detailModelTop[i+1]) {
          this.currentIndex = i
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
      // 滚动指定位置出现 回到顶部 按钮，根据滑动距离判断是否出现回到顶部
      this.isShowBackTop = -(position.y) > 1200
    },

    // 点击回到顶部
    backClick () {
      this.$refs.scroll.scrollTo(0,0,500)
    },

    // 防抖函数
    debounce (func, delay){
      let timer = null
      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay);
      }
    },

    // 商品加入购物车
    addToCart () {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.oldPrice = this.goods.oldPrice;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里 store 为什么通过commit传?
      this.$store.dispatch('addCart', product)
    }
  },
}
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  // 让content的父元素detail等于100的视口高度,就能让content滚动
  // height: 100vh;
  .content {
    height: calc(100vh - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
}
</style>
