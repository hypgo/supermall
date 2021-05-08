<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="tittle">{{ goods.title }}</div>
    <div class="price-info">
      <span class="newPrice">{{ goods.newPrice }}</span>
      <span class="oldPrice">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="columns-info">
      <span class="sales-volume">{{ goods.columns[0] }}</span>
      <span class="good-fav">{{ goods.columns[1] }}</span>
      <span class="shipments">{{ goods.columns[2] }}</span>
    </div>
    <!-- 遍历数组获得索引,The traversal set starts at 1  -->
    <div class="info-services">
      <span
        class="info-services-item"
        v-for="index in goods.services.length"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DetailBaseInfo',
  props:{
    goods: {
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
.base-info {
  padding: 0 5px;
  border-bottom: 5px solid #eee;
  .tittle {
    padding: 10px 5px;
  }
  .price-info {
    margin: 0 0 10px 0;
    .newPrice {
      font-size: 25px;
      color: @color-high-text;
      line-height: 30px;
      margin-right: 5px;
    }
    .oldPrice {
      font-size: 10px;
      text-decoration: line-through;
    }
    .discount {
      font-size: 12px;
      padding: 3px;
      color: #fff;
      background-color: @color-high-text;
      border-radius: 10px;
      position: relative;
      top: -10px;
      right: -5px;
    }
  }
  .columns-info {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .info-services {
    border-top: 2px solid #eee;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 13px;
    margin-top: 8px;
    padding: 18px 0;
    img {
      height: 12px;
      width: 12px;
    }
  }
}
</style>
