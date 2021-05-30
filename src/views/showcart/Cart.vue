<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="cart-nav-bar">
      <template v-slot:center>
        <div class="nav-bar-title">购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <!-- 滚动区域 -->
    <scroll class="content" ref="scroll">
      <template v-slot:scroll>
        <div class="cart-list" v-for="(item, index) in cartList" :key="index">
          <div class="cart-list-item">
            <div class="item-left">
              <input
                type="checkbox"
                class="check-box"
                :class="{ isChecked: item.checked }"
                @click="checkClick(item)"
              />
              <img class="item-img" :src="item.img" alt="" />
            </div>
            <div class="item-right">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-desc">{{ item.desc }}</div>
              <div class="item-price-count">
                <span class="item-price">¥{{ item.price }}</span>
                <span class="item-count">{{ "x" + item.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </scroll>
    <!-- 底部汇总 -->
    <div class="bottom-bar">
      <div class="flex check">
        <input type="checkbox" class="check-box" :class="{ isChecked: isSelectAll }" @click="selectAll"/>
        <span>全选</span>
      </div>
      <div class="price">
        <span>合计：¥{{ totalPrice }}</span>
      </div>
      <div class="calculate">
        <span>去结算({{ totalLength }})</span>
      </div>
    </div>
    <!-- 加入购物车后弹窗 Toast -->
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    navBar,
    Scroll
  },
  data() {
    return {
    }
  },
  computed: {
    // 计算商品数量，即获得cartlist数组长度
    // cartLength() {
    //   return this.$store.state.cartList.length
    // },
    // // 但是当很多地方都要用到length时，就要把length封装成getters
    // cartList () {
    //   return this.$store.state.cartList
    // }

    ...mapGetters(['cartList','cartLength']),
    
    // 计算全选总价
    totalPrice(){
      return this.cartList.filter(item =>{
        return item.checked
      }).reduce((preVaule, item) => {
        return preVaule + item.price * item.count
      },0).toFixed(2)
    },

    // 计算购买商品数量
    totalLength (){
      return this.cartList.filter(item =>{
        return item.checked
      }).reduce((preVaule, item) => {
        return preVaule + item.count
      },0)
    },

    // 判断是否全部选中
    isSelectAll (){
      if(this.cartList.length === 0 ) return false;
      // every(): 对数组中每一项运行给定函数，如果该函数的\color{red}{每一项}\都返回true,则返回true
      return this.cartList.every( item => {
        return item.checked == true
      })
    }
  },
  // 添加购物车后，购物车不能滚动?
  // 往购物车添加数据后，但bs不知道你添加了数据，以为你的可滚动区域还是0，没有计算你新添加的数据。
  // 因为这个组件是有缓存keep-alive，需要在activated里refresh刷新
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    // 商品加入购物车后，是否选中按钮应该是保存在商品列表模型里的。
    checkClick (item){
      // 从v-for循环中获得的item要传入到点击事件中才能获得
      // item.checked = !item.checked
      this.$store.commit('checkClick',item)
    },
    // 选中或取消全选 
    selectAll () {
      if(this.isSelectAll){  // 1.全部选中时，要让所有都不选中
        this.cartList.forEach(item => {
          item.checked = false
      })} else {  // 部分选中或全部未选中
          this.cartList.forEach(item => {
          this.$store.commit('selectAllToItem',item)
        })
      }
    } 
  }
}
</script>

<style lang="less" scoped>
.cart-nav-bar {
  background-color: #ff8198;
  color: #fff;
  font-weight: 500;
}
.content {
  // 这玩意到底怎么用的??
  overflow: hidden;
  height: calc(100vh - 44px - 49px - 40px);
  .cart-list-item {
    display: flex;
    padding: 5px;
    border: 1px solid #eee;
    .item-left {
      width: 25%;
      display: flex;
      align-items: center;
      .check-box {
        width: 16px;
        height: 16px;
        overflow: hidden;
        border-radius: 100%;
        border: 1px solid #aaa;
      }
      .isChecked {
        background: url("~assets/img/cart/check_active.png") no-repeat center;
        background-size: cover;
        border: none;
      }
      .item-img {
        width: 55px;
        height: 70px;
        border: 1px solid #ececec;
        margin: 0 5px;
        border-radius: 10%;
        vertical-align: middle;
      }
    }
    .item-right {
      width: 75%;
      flex: 1;
      position: relative;
      font-size: 15px;
      .item-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .item-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 0;
        font-size: 12px;
      }
      .item-price-count {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .item-price {
          color: rgba(240, 63, 9, 0.959);
        }
      }
    }
  }
}
.bottom-bar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background: #eee;
  position: relative;
  .check {
    // line-height: 40px;
    .check-box {
      width: 16px;
      height: 16px;
      overflow: hidden;
      border-radius: 100%;
      border: 1px solid #aaa;
      margin: 12px 10px;
    }
    .isChecked {
      background: url("~assets/img/cart/check_active.png") no-repeat center;
      background-size: cover;
      border: none;
    }
  }
  .calculate{
    color: #fff;
    width: 90px;
    text-align: center;
    background-color: red;
  }
}
</style>
