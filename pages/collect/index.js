// pages/pay/index.js
Page({
  data: {
    // tabs 参数
    tabs: [{
      id: 0,
      value: '商品收藏',
      isActive: true
    }, {
      id: 1,
      value: '品牌收藏',
      isActive: false
    }, {
      id: 2,
      value: "店铺收藏",
      isActive: false
    }, {
      id: 3,
      value: '浏览器足迹',
      isActive: false
    }],
    // 收藏数组
    collect: []
  },
  // 根据点击改变tab选项
  activeChange(e) {
    // 获取被点击标题索引
    const index = e.detail.activeIndex;
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
  onShow() {
    let collect  = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  }
})