<template>
  <div class="recommend">
    <div v-for="(item, i) in recommends" :key="i" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'RecommendView',
  props: {
    recommends:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  text-align: center;
  font-size: 12px;
  .recommend-item {
    flex: 1;
    img {
      width: 70px;
      height: 100%;
      margin-bottom: 8px;
    }
  }
}
</style>
