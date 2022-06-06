// pages/pay/index.js
import request from "../../request/index"

Page({
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputValue:""
  },
  TimeId: -1,

  // 搜索框输入事件
  handleInput(e) {
    // 1.获取输入框的值
    const {
      value
    } = e.detail;
    // 2.检测合法性
    if (!value.trim()) {
      // 值为空
      clearTimeout(this.TimeId);
      this.setData({
        isFocus: false,
        goods: []
      })
      return;
    }
    // 3.准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    this.setData({
      goods: res,
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inputValue: "",
      isFocus: false,
      goods:[]
    })
  }
})