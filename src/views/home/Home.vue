<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:left>
        <div></div>
      </template>
      <template v-slot:center>
        <div>购物街</div>
      </template>
      <template v-slot:right>
        <div></div>
      </template>
    </nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="backtopClick"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <template v-slot:scroll>
        <home-swiper
          :banners="banners"
          @swiperImageLoad="swiperImageLoad"
        ></home-swiper>
        <recommend-view :recommends="recommends" />
        <feature-view></feature-view>
        <tab-control
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <goods-list :goods="showgoods" />
      </template>
    </scroll>
    <!-- native监听组件的原生事件，不需要emit传来传去 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list
    }
  },

  // 组件创建完就执行函数
  created() {
    // 1.请求主页的多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 3.监听refresh，保证图片加载完成。（事件总线不需要从组件上做接收）
    const refresh = this.debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('homeItemImageLoad', () => {
      // this.$refs.scroll.scroll.refresh()
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY)
    // 保存到指定位置后，进行一次刷新
  },
  // 离开组件时调用，保存离开时滑动的位置信息
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    console.log(this.saveY);
  },
  methods: {
    // 上拉加载图片防抖
    debounce (func, delay){
      let timer = null
      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay);
      }
    },

    // 事件监听的方法
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 通过ref调用scroll组件的方法，返回到指定的位置
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },

    backtopClick(position){
      // 1.根据滑动距离判断是否出现回到顶部
      this.isShowBackTop = -(position.y) > 1200
      // 2.决定tabControl是否吸顶 position:fixed
      this.isTabFixed = (-position.y) > this.taboffsetTop
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    // 接收轮播图图片加载完成的事件，计算滚动的y轴距离
    swiperImageLoad () {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.$refs.tabControl2.$el.offsetTop);
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(res);
      })
    },
    // 请求商品数据
    getHomeGoods(type){
      // 默认请求第一页的数据，之后下拉加载数据时就可请求第二页的数据
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then( res=> {
        this.goods[type].list.push(...res.data.list)
        // 修正goods里的page数据，与请求结果保持一致。
        this.goods[type].page += 1

        // this.$refs.scroll 获取子组件scroll
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/base.less";
#home {
  // padding-top: 44px;
  height: 100vh; // vh：viewport height视口高度
  position: relative;
  .home-nav {
    background-color: @color-tint;
    color: @color-background;

    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // z-index: 9;
  }
  // content must has height,
  .content {
    // 往下拖动时，内容往上滚，不会盖过home-nav
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    // 没有必要用fixed，这里的位置相对自身当前位置
    position: relative;
    z-index: 9;
  }
}
</style>
