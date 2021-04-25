<template>
  <!-- 只是文字不一样，就不需要使用插槽 -->
  <!-- 对象语法{active.index === currentIndex}，记录列表索引 -->
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TabControl',
  props: {
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/base.less";
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
  // 防止下滑后其他元素穿过
  background-color: #fff;
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: @color-tint;
  }
  .active span {
    border-bottom: 2px solid @color-high-text;
  }
}
</style>
