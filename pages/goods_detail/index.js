// pages/pay/index.js
import request from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情
    goodsObj: {},
    // 是否收藏
    isCollect: false
  },

  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    // 获取 options 里面的页面参数
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options
    let {
      goods_id
    } = options;
    this.getGoodsList(goods_id);
    console.log(goods_id)
  },

  // 获取商品详情数据
  async getGoodsList(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.GoodsInfo = res;

    // 1.获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);

    // 设置值
    this.setData({
      goodsObj: {
        // 名字
        goods_name: res.goods_name,
        // 价格
        goods_price: res.goods_price,
        // iphone部分手机不支持 webp图片格式
        // 最好找后台 让他自己修改
        // 临时自己改，确保后台存在 1.webp =》 1.jpg
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },

  // 点击轮播图片预览
  handlePrevewImage(e) {
    // 先构造预览图片数组
    // 预览图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 图片路径
    const current = e.currentTarget.dataset.url;
    // 图片预览函数
    wx.previewImage({
      current,
      urls
    })
  },

  // 点击加入购物车  (用缓存技术)
  handleCartAdd(e) {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1) {
      // 第一次添加
      this.GoodsInfo.num = 1;
      // 添加是否选中属性
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else {
      // 已经添加过了，则商品数量+1
      cart[index].num++;
    }
    // 重新设置值
    wx.setStorageSync("cart",cart);
    // 弹窗提示
    wx.showToast({
      title: '添加购物车成功！',
      icon: 'success',
      mask: true,
    });
  },

  // 立即购买
  buy(){
    this.handleCartAdd();
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },

  // 点击商品收藏图标
  handleCollect() {
    // 判断是否收藏
    let isCollect;
    // 1. 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 2. 判断该商品是否已经被收藏过
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    // 3. 当index != -1 表示已经收藏过
    if(index != -1) {
      // 能找到，已经收藏过
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: "取消收藏成功！",
        icon: "success",
        mask: true
      })
    }else {
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: "收藏成功！",
        icon: "success",
        mask: true
      })
    }
    // 4. 把数组存入到缓存中
    wx.setStorageSync("collect",collect);
    // 5. 修改data中的属性
    this.setData({
      isCollect
    })
  }
})