<template>
  <div class="wrapper">
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
      v-if="showSwiper"
      class="swiper-wrapper"
    >
      <swiper-slide v-for="(item, id) in topImages" :key="id">
        <img class="swiper-img" :src="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        autoplay: {
          autoplay: true,
          delay: 2000
        },
        loop: true,
        // initialSlide: 1,
        // 根据slide的宽度自动调整展示数量。
        // slidesPerView:'auto'
      },
      isLoad: false
    }
  },
  computed: {
    showSwiper() {
      return this.topImages.length
    }
  },
  methods: {
    // @load事件 监听轮播图图片是否加载完成。
    topImagesLoad () {
      this.isLoad = true
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-wrapper {
  height: 300px;
  overflow: hidden;
  .swiper-img {
    width: 100%;
  }
}
</style>
