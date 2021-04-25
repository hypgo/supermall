<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot name="scroll"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      mouseWheel: true
    })
    // 监听滚动的位置
    this.scroll.on('scroll', (position)=>{
      // console.log(position);   // 只有y轴改变，一直向下移动,是负数
      // 传回给父组件
      this.$emit('scroll', position)
    })
    // 监听上拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 封装一个方法，返回到指定位置，并设置返回花费的时间，通过组件的ref调用
    scrollTo(x,y, time=300) {
      this.scroll.scrollTo(x,y,time)
    }
  },
}
</script>

<style lang="less" scoped></style>
