// pages/pay/index.js

import request from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs 参数
    tabs: [{
      id: 0,
      value: '全部订单',
      isActive: true
    }, {
      id: 1,
      value: '待付款',
      isActive: false
    }, {
      id: 2,
      value: '待发货',
      isActive: false
    }, {
      id: 3,
      value: '退款/换货',
      isActive: false
    }],
    // 订单数组
    orders: []
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      v.isActive = false
      if (i === index) {
        v.isActive = true
      }
    })
    this.setData({
      tabs
    })
  },

  // 接收子组件的值，修改tabs数据
  activeChange(e) {
    // 获取被点击标题索引
    const index = e.detail.activeIndex;
    this.changeTitleByIndex(index);
    // 重新发送请求
    // type = 1 <对应> index = 0
    let type = index + 1;
    this.getOrders(type);
  },
  //  获取页面参数 type 并发送网络请求
  onShow() {
    // 本地存储获取token
    let token = wx.getStorageSync("token");
    // 判断是否有token
    if (!token) {
      // 没有token跳转授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return
    }
    // 获取页面参数
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let {
      type
    } = currentPage.options;
    // 获取订单列表
    this.getOrders(type)
    // 根据索引改变选项
    // type = 1 <对应> index = 0
    let index = type - 1;
    this.changeTitleByIndex(index);
  },
  // 获取订单列表方法
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    })
    console.log(res);
    this.setData({
      orders: res.orders.map(v => ({
        ...v,
        // 改变时间格式
        create_time_cn: new Date(v.create_time*1000).toLocaleDateString()
      }))
    })
  }
})