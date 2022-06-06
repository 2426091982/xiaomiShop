// pages/pay/index.js
import request from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单数据
    leftMenuList: [],
    // 右边内容数据
    rightContentList: [],
    // 选中索引
    activeIndex: 0,
    // 右侧滚动条的值
    scrollTop: 0
  },
  // 暂时存储数据
  cateList: [],

  // 获取分类数据
  async getCateList() {
    const res = await request({
      url: '/categories'
    })
    this.cateList = res;

    // 本地缓存
    wx.setStorageSync("cates", {
      time: Date.now(),
      list: this.cateList
    });


    // 左侧数据
    let leftMenuList = this.cateList.map(v => v.cat_name);
    // 右侧数据
    let rightContentList = this.cateList[0].children;

    this.setData({
      leftMenuList,
      rightContentList,
      // 切换分类滚动条设置
      scrollTop: 0
    })
  },
  // 用户点击了其他分类
  handleChange(e) {
    // 该分类索引
    let {
      index
    } = e.currentTarget.dataset;
    // 对应右侧数据
    let rightContentList = this.cateList[index].children;
    // 重新赋值
    this.setData({
      activeIndex: index,
      rightContentList,
      // 切换分类滚动条设置
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync("cates");
    console.log(cates);
    // 判断是否有本地缓存
    if (!cates) {
      this.getCateList();
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCateList();
      } else {
        console.log('使用缓存')
        this.cateList = cates.list;
        console.log(this.cateList)
        // 左侧数据
        let leftMenuList = this.cateList.map(v => v.cat_name);
        // 右侧数据
        let rightContentList = this.cateList[0].children;

        this.setData({
          leftMenuList,
          rightContentList,
        })
      }
    }
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