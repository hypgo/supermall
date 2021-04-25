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

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="backtopClick"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <template v-slot:scroll>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends" />
        <feature-view></feature-view>
        <tab-control
          :titles="['流行', '新款', '精选']"
          class="tab-control"
          @tabClick="tabClick"
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
      isShowBackTop: false
    }
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list
    }
  },

  // 组件创建完就执行函数
  created() {
    // 请求主页的多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
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
    },
    backClick() {
      // 通过ref调用scroll组件的方法，返回到指定的位置
      this.$refs.scroll.scrollTo(0,0)
    },
    backtopClick(position){
      // 根据滑动距离判断是否出现回到顶部
      this.isShowBackTop = -(position.y) > 1400
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
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
        this.goods[type].page = this.goods[type].page + 1
        // this.$refs.scroll 获取
        this.$refs.scroll.scroll.finishPullUp()
        // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
        this.$refs.scroll.scroll.refresh()
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

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    // 使用bs改变原生属性，失效
    position: sticky;
    top: 44px;
    z-index: 19;
  }
  .content {
    // overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
}
</style>
