<template>
  <div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="flex shop-name-info">
      <img :src="shop.shopLogo" alt="" />
      <div>{{ shop.name }}</div>
    </div>
    <div class="flex shop-other-info">
      <div class="flex shop-other-item shop-other-sell">
        <div>
          <p class="fs16">{{ shop.cSells }}</p>
          <p>总销量</p>
        </div>
        <div>
          <p class="fs16">{{ shop.cGoods }}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-other-item shop-other-right">
        <div v-for="item in shop.score" :key="item.index">
          {{ item.name }} &ensp;
          <span class="score" :class="{ isColor: item.isBetter }">{{
            item.score
          }}</span>
          <span class="scoreBg" :class="{ active: item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="enter-shop-wrap">
      <a :href="shop.shopUrl">
        <div class="enter-shop">进店逛逛</div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/base.less";
.fs16 {
  font-size: 14px;
}
.shop-name-info {
  align-items: center;
  margin: 20px 10px;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50px;
    margin-right: 10px;
    border: 1px solid #eee;
    vertical-align: middle;
  }
}
.shop-other-info {
  font-size: 12px;
  align-items: center;
  line-height: 20px;
  .shop-other-item {
    flex: 1;
  }
  .shop-other-sell {
    border-right: 1px solid #ececec;
    div {
      flex: 1;
      text-align: center;
    }
  }
  .shop-other-right {
    // padding: 0 10px;
    text-align: center;
    font-size: 12px;
    .score {
      // 因为分数是span，需要变为行内块设置宽高
      display: inline-block;
      margin: 1px 0;
      width: 30px;
      padding: 0 3px;
      color: #006666;
      &.isColor {
        color: @color-high-text;
      }
    }
    .scoreBg {
      color: #fff;
      background-color: #006666;
      &.active {
        background-color: red;
      }
    }
  }
}
.enter-shop-wrap {
  text-align: center;
  font-size: 12;
  .enter-shop {
    display: inline-block;
    margin: 10px 0;
    padding: 4px 30px;
    line-height: 25px;
    background-color: #f2f2f2;
    border-radius: 100px;
  }
}
</style>
