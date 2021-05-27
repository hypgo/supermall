<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template #left>
        <div class="back" @click="backHome">
          <img src="~assets/img/common/back.svg" />
        </div>
      </template>
      <!-- v-slot: 的缩写是 # -->
      <template #center>
        <div class="title">
          <div
            class="item-title"
            :class="{ active: index === currentIndex }"
            v-for="(item, index) in titles"
            :key="index"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backHome () {
      this.$router.back()
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/base.less";
.detail-nav-bar {
  // width: 100%;
  // background-color: #fba;
  .title {
    display: flex;
    .item-title {
      flex: 1;
      font-size: 13px;
    }
    .active {
      color: @color-tint;
    }
  }
  .back img {
    // margin-top: 12px;
    vertical-align: middle;
  }
}
</style>
