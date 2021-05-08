<template>
  <div>
    <div class="shop-info">
      <div class="logo">
        <img :src="shop.shopLogo" alt="" />
        <div class="shop-name">{{ shop.name }}</div>
      </div>
      <div class="shop-other">
        <div class="shop-other-left">
          <div class="shop-goods-amount">
            <span class="total-sale">{{ shop.cSells }}</span>
            <div class="total-sale-name">总销量</div>
          </div>
          <div class="shop-all-good">
            <span class="all-good">{{ shop.cGoods }}</span>
            <div class="all-good-name">全部宝贝</div>
          </div>
        </div>
        <div
          class="shop-evaluation"
          v-for="item in shop.score"
          :key="item.index"
        >
          <div class="shop-evaluation-item">
            <span class="name">{{ item.name }}</span>
            <span class="score">{{ item.score }}</span>
            <span class="is-better">{{ item.isBetter }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="enter-shop">
      <a :href="shop.shopUrl">进店逛逛</a>
    </div>
    <div class="h"></div>
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
.shop-info {
  padding: 5px 5px;
  .logo {
    display: flex;
    align-items: center;
    margin: 20px 0;
    img {
      height: 30px;
      border-radius: 50px;
      border: 1px solid #eee;
    }
    .shop-name {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .shop-other {
    width: 100%;
    padding: 5px 15px;
    display: flex;
    .shop-other-left {
      display: flex;
      align-items: center;
      width: 50%;
      text-align: center;
      border-right: 2px solid #eee;
      .total-sale-name,
      .all-good-name {
        font-size: 12px;
        margin-top: 2px;
      }
      .shop-all-good {
        margin: 0 15px;
      }
    }
    .shop-evaluation {
    }
  }
  // .shop-evaluation {
  //   .shop-evaluation-item {
  //     display: flex;
  //     flex-direction: row;
  //   }
  // }
}

.h {
  height: 500px;
}
</style>
