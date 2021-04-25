<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 增加一个div包裹，用来做判断显示 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'rgb(229 49 83)'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      // $route 和 $router 是有区别的
      return this.$route.path === this.path
    },
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      // 解决连续点击tabbar报错
      if ( this.path != this.$route.path ){
        this.$router.push(this.path)
      }
      // this.$router.replace(this.path)
    }
  },
}

/*
路由传值 this.$router.push()
（1）想要导航到不同的URL，使用router.push()方法，这个方法会向history栈添加一个新纪录，所以，当用户点击浏览器后退按钮时，会回到之前的URL
（2）当点击 <router-link> 时，这个方法会在内部调用，即点击 <router-link :to="..."> 等同于调用 router.push(...)
*/
</script>

<style lang="less" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    // 怎么理解基线对齐???
    vertical-align: middle;
    margin-bottom: 2px;
  }
}
</style>
