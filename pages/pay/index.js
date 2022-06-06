// pages/pay/index.js

import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
import request from "../../request/index.js";

Page({

  data: {
    // 获取地址
    address: {},
    // 购物车数据
    cart: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },



  onShow() {
    // 获取本地存储
    let address = wx.getStorageSync("address");
    // 获取购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 过滤checked为true的
    cart = cart.filter(v => v.checked);
    console.log(this.data.cart);


    // 总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  // 点击支付
  async handleOrderPay() {
    // 1.判断缓存中有没有 token
    const token = wx.getStorageSync("token");
    // 2. 判断
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    }
    // 3.创建订单
    // 3.1 准备请求头参数
    // 3.2 准备 请求体参数
    //  总价
    const order_price = this.data.totalPrice;
    // 收货地址
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    // 商品列表
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderParams = {
      order_price,
      consignee_addr,
      goods
    };
    // 模拟请求 创建订单编号
    const order_number = await setTimeout(()=>{
      // 返回订单编号
      return "HMDD20190809000000001059"
    },1000)

   /*  const res = await request({
      url: "/my/orders/create",
      method: "POST",
      data:orderParams,
    })
    console.log(res); */

    // 发起预支付接口
    /* const res1 = await request({
      url: "/my/orders/req_unifiedorder",
      method: 'POST',
      header,
      data: {
        order_number
      }
    }) */
    const res1 = await setTimeout(async()=>{
      await showToast({title: "支付成功!"});
      // 手动删除缓存中 已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart",newCart);
      // 支付成功跳转到订单页面
      wx.navigateTo({
        url: `/pages/order/index?type=${1}`
      })
    },1000)

  }

})