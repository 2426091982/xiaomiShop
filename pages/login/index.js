// pages/pay/index.js
Page({
  handleLogin(e) {
    // 获取用户数据
    let  {userInfo} = e.detail;
    // 存储到本地
    wx.setStorageSync("userInfo", userInfo);
    // 后退一页
    wx.navigateBack({
      delta: 1
    });
  }

})