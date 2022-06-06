import {
  request
} from "../../request/index.js"
import {
  login
} from "../../utils/asyncWx.js"


// pages/pay/index.js
Page({
  async handleGetUserInfo(e) {
    try {
      // 1.获取用户信息
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;

    // 2.获取小程序登录成功后的 code
    const {
      code
    } = await login()
    let loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    // 3.发送请求 获取用户的token (模拟)
    /* const res = await request({
      url: "/users/wxlogin",
      data: loginParams,
      methods: "post",
    }) */
    // 3.发送请求 获取用户的token (模拟)
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    // 4.把 token 存入缓存中.同时跳转回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error)
    }
  },
})