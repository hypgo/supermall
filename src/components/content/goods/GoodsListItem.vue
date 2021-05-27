<template>
  <div class="goods-item">
    <img :src="showImg" @load="imageLoad" @click="itemClick" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // this.goodsItem.image是从detail推荐页组件过来的，与当前组件的数据结构不一样，需要判断
    showImg () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 事件总线监听refresh，返回给主页
    // 但是进入到详情页，就没必要监听主页。
    imageLoad(){
      if (this.$route.path.indexOf('/home') === 0) {
        this.$bus.$emit('homeItemImageLoad')
      } else if (this.$route.path.indexOf('/detail') === 0) {
        this.$bus.$emit('detailItemImageLoad')
      }
    },
    itemClick () {
      // 这个params用法不能用 逗号,连接2
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/base.less";
.goods-item {
  padding-bottom: 40px;
  width: 48%;
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    padding: 5px 2px 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 3px;
    }
    .price {
      color: @color-tint;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      ::before {
        content: "";
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      }
    }
  }
}
</style>
