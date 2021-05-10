<template>
  <!--  Cannot read property '0' of undefined" 
  异步数据先显示初始数据，再显示带数据的数据，初始数据为{}，渲染完成后才加载异步数据，
  所以渲染时，获取detailInfo.detailImage[0]的对象是不存在的，需要在渲染完成后即有数据后再获取。 -->
  <div class="detail-goods" v-if="Object.keys(detailInfo).length !== 0">
    <div
      class="detail-goods-imgae"
      v-for="(item, i) in detailInfo.detailImage[0].list"
      :key="i"
    >
      <img class="goods-item" :src="item" alt="" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object
    }
  }
}

// 所有图片都要加载完成，不然会影响滚动的高度。
// 要监听图片加载，判断当所有图片加载完，进行一次回调就可以了。传回给detail，做一次调用刷新
// ++counter（counter += 1）  === 图片的长度
// 监听属性的变化，获得图片的长度，不必每次都调用获取
</script>

<style lang="less" scoped>
.detail-goods {
  margin-top: 5px;
  width: 100%;
  .goods-item {
    width: 100%;
  }
}
</style>
