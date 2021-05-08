<template>
  <div class="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <!-- <router-view>等同于router-link to= 前者是需要指定路由地址，后者不需要指定，所有路由都跳转 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style lang="less">
@import "assets/css/base.less";
</style>
