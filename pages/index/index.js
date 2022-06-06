// 引入自己封装的网络请求函数
import request from "../../request/index.js"

// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    cateList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图数据
  async getSwiperList() {
    const res = await request({
      url: '/home/swiperdata',
    })
    this.setData({
      swiperList: res
    })
  },
  // 获取分类导航数据
  async getCateList() {
    const res = await request({
      url: '/home/catitems'
    })
    this.setData({
      cateList: res
    })
  },
  // 获取楼层数据
  async getFloorList() {
    const res = await request({
      url: '/home/floordata'
    })
    res.forEach(v => {
      v.product_list.forEach(y => {
        y.navigator_url = y.navigator_url.replace(/\?/,'/index?')
        console.log(y.navigator_url)
      })
    })
    this.setData({
      floorList: res
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})