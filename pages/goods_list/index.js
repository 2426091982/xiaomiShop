// pages/pay/index.js
import request from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏参数
    tabs: [{
      id: 0,
      value: '商品',
      isActive: true
    }, {
      id: 1,
      value: '分类',
      isActive: false
    }, {
      id: 2,
      value: '价格',
      isActive: false
    }],
    // 接口要的参数
    queryParams:{
      // 查询参数
      query: '',
      // 分类参数
      cid: '',
      // 页面
      pagenum:1,
      // 每页数据条数
      pagesize:10
    },
    // 商品列表
    goodsList: [],
    // 总页数
    totalPages: '',
  },

  // 接收子组件的值，修改tabs数据
  activeChange(e) {
    const index = e.detail.activeIndex;
    let {tabs} = this.data;
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
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.data.queryParams})
    console.log(res);
    // totalPages 总页 = 总条数 / 每页多少数据
    this.totalPages = Math.ceil(res.total / this.data.queryParams.pagesize);
    this.setData({
      // 拼接数组，将新获取的加在后面
      goodsList: [...this.data.goodsList,...res.goods]
    })

    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.queryParams.cid = options.cid || "";
    this.data.queryParams.query = options.query || "";
    console.log(this.data.queryParams);
    this.getGoodsList();
  },
  //用户上拉到底事件
  onReachBottom() {
    // 1.判断有没有下一页数据
    if(this.data.queryParams.pagenum >= this.totalPages) {
      console.log('没有下一页数据')
    }else {
      // 有下一页数据
      // 页码 +1
      this.data.queryParams.pagenum++;
      // 获取数据
      this.getGoodsList()
    }
  },
  ///下拉刷新事件
  onPullDownRefresh(){
    // 1.重置数组
    this.setData({
      goodsList: []
    });
    // 重置页码
    this.data.queryParams.pagenum = 1;
    // 重新发送请求
    this.getGoodsList();
  }
})