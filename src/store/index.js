import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // cartList不能直接塞数据
    cartList: [],
  },
  // mutations唯一的目的是修改state的状态。
  // 它里面的每一个方法尽可能完成单一的事情。区分商品添加和数量增加
  mutations: {
    /* addCart(state, payload) {
      // payload 是新添加的商品
      // 查找之前数组里有无该新增商品
      let oldProduct = null;
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // let oldProduct = state.cartList.find((item) => item.iid === payload.iid);

      // 添加oldProduct商品或修改数量
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload);
      }
    }, */

    addCounter(state, payload) {
      payload.count += 1;
    },
    addToCart(state, payload) {
      payload.count = 1;
      payload.checked = false;
      state.cartList.push(payload);
    },
  },
  // 异步操作和有判断逻辑的都放在actions
  actions: {
    addCart(context, payload) {
      // 查找之前数组里有无该新增商品
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === payload.iid
      );

      // 添加oldProduct商品或修改数量
      if (oldProduct) {
        context.commit("addCounter", oldProduct);
      } else {
        context.commit("addToCart", payload);
      }
    },
  },
  modules: {},
  getters,
});
