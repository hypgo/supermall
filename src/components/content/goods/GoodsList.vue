<template>
  <div class="goods">
    <goods-list-item v-for="(item, id) in goods" :key="id" :goods-item="item" />
  </div>
</template>

<script type="text/ecmascript-6">
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components:{
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
