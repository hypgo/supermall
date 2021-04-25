<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'NavBar'
}
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 44px;
  // line-height 要有内容才能撑起来，要加height
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(100, 100, 100, 0.1);

  .left,
  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
}
</style>
