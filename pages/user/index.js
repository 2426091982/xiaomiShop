// pages/pay/index.js
Page({
  data() {
    userInfo: {}
    // 被收藏的商品数量
    collectNums: 0
  },
  onShow() {
    let userInfo = wx.getStorageSync("userInfo");
    let collect = wx.getStorageSync("collect");
    this.setData({
      userInfo,
      collectNums: collect.length
    })
  }
})