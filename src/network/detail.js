// 封装对商品详情页的数据请求
import { request } from "./request.js";

export function getDetailData(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
}

// ES6定义class的方法，构造函数 new
export class Goods {
  // constructor()
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
