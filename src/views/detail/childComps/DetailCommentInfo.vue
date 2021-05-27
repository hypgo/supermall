<template>
  <div class="comment-wrap" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-top">
      <div>用户评价</div>
      <div class="more-commnent">更多</div>
    </div>
    <div class="comment-user flex">
      <img :src="commentInfo.user.avatar" alt="" />
      <div class="user-name">{{ commentInfo.user.uname }}</div>
    </div>
    <div class="content">
      {{ commentInfo.content }}
    </div>
    <div class="content-detail flex">
      <div class="date">{{ commentInfo.created | showData }}</div>
      <div class="color">{{ commentInfo.style }}</div>
    </div>
    <div class="comment-img">
      <img
        :src="item"
        v-for="(item, index) in commentInfo.images"
        :key="index"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {formatDate} from 'common/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo :{
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showData (value) {
      // 将时间戳转化成Date对象
      const date = new Date(value * 1000)
      // 将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
}
</script>

<style lang="less" scoped>
.comment-wrap {
  font-size: 13px;
  padding: 0 10px;
  margin-bottom: 10px;
  border-bottom: 5px solid #eee;
  .comment-top {
    display: flex;
    line-height: 40px;
    border-bottom: 2px solid #eee;
    justify-content: space-between;
    .more-commnent {
      position: relative;
      right: 10px;
    }
  }
  .comment-user {
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .user-name {
      line-height: 40px;
      margin-left: 10px;
      color: #000;
    }
  }
  .content {
    margin: 5px 0;
  }
  .content-detail {
    color: rgb(138, 135, 135);
    margin: 10px 0;
    .date {
      margin-right: 10px;
    }
  }
  .comment-img {
    // margin-bottom: 10px;
    margin: 10px 5px 10px 0px;

    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
