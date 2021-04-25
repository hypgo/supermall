<template>
  <div class="swiper-wrap">
    <swiper ref="mySwiper" :options="swiperOptions" v-if="showSwiper">
      <swiper-slide v-for="(item, id) in banners" :key="id">
        <a :href="item.link"><img class="swiper-img" :src="item.image"/></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
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
      }
    }
  },
  computed: {
    showSwiper() {
      return this.banners.length
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-img {
  width: 100%;
  height: 190px;
}
</style>
