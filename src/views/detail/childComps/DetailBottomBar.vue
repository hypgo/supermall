<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <div>
        <img class="icon service" src="~assets/img/detail/icon01.png" alt="" />
        <div class="text">客服</div>
      </div>
      <div>
        <img class="icon shop" src="~assets/img/detail/icon02.png" alt="" />
        <div class="text">店铺</div>
      </div>
      <div>
        <img class="icon fav" src="~assets/img/detail/icon03.png" alt="" />
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="bar-right">
      <div class="cart" @click="addToCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  },
}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: relative;
  bottom: 0;
  height: 49px;
  z-index: 9;
  background-color: #fff;
  display: flex;
  // align-items: center;
  justify-content: space-evenly;
  font-size: 14px;
  .bar-left {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 22px;
      height: 22px;
      margin: 0 0 1px 3px;
    }
  }
  .bar-right {
    display: flex;
    flex: 1;
    line-height: 49px;
    text-align: center;
    font-size: 16px;
    .cart {
      width: 100%;
      background: orange;
      color: #000;
    }
    .buy {
      width: 100%;
      background: #ef4562;
      color: #fff;
    }
  }
}
</style>
