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
    // 1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 0/1不滚动，2/手指滚动，3/都滚动
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,   // 默认false，div不可以，button可以监听点击
      observeDOM: true,
      mouseWheel: true,
    })

    // 2.监听滚动的位置(判断属性值正确后 才能滚动)
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position)=>{
        // console.log(position);   // 只有y轴改变，一直向下移动,是负数
        // 传回给父组件
        this.$emit('scroll', position)
      })
    }

    // 3.监听上拉加载事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  },

  methods: {
    // 封装一个方法，返回到指定位置，并设置返回花费的时间，通过组件的ref调用
    scrollTo(x,y, time=300) {
      // 调用这个方法前，先判断有没有创建scroll插件，有可能发生组件已创建，但还scroll插件还没创建的情况
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 检测 scroller 内部 DOM 变化，自动调用 refresh 方法重新计算来保证滚动的正确性。
    refresh() {
      console.log('--------');
      this.scroll && this.scroll.refresh()
    },

    //
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    }
  },
}
</script>

<style lang="less" scoped></style>
