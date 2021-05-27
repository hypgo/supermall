<template>
  <div class="param-wrap" v-if="Object.keys(paramInfo).length !== 0">
    <div
      v-for="(item, index) in paramInfo.rule[0]"
      :key="index"
      class="rule-list"
    >
      <div v-for="(tr, indey) in item" :key="indey" class="rule-list-item1">
        {{ tr }}
      </div>
    </div>

    <!-- <div
      v-for="(item2, index2) in paramInfo.rule[1]"
      :key="index2"
      class="rule-list"
    >
      <div v-for="(tr, indey2) in item2" :key="indey2" class="rule-list-item1">
        {{ tr }}
      </div>
    </div> -->
    <div
      v-for="item in paramInfo.infos"
      :key="item.index"
      class="rule-list-item2"
    >
      <div>{{ item.key }}</div>
      <div class="list-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
};
</script>

<style lang="less" scoped>
.param-wrap {
  border-top: 4px solid #ececec;
  border-bottom: 4px solid #ececec;
  margin-top: 20px;
  padding: 10px 20px 10px 10px;
  font-size: 14px;
  .rule-list {
    display: flex;
    .rule-list-item1 {
      flex: 1;
      padding: 10px 0 10px 0;
      border-bottom: 1px solid #ececec;
    }
  }
  .rule-list-item2 {
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #ececec;
    display: flex;
    .list-value {
      flex: 1;
      margin-left: 60px;
      color: #ef4562;
    }
  }
}
</style>
