<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TabBar'
}
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  background-color: #f6f6f6;

  box-shadow: 0 -1px 2px 0 rgba(100, 100, 100, 0.1);

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
