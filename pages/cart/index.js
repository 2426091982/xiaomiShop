// pages/pay/index.js

import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx.js"

Page({

  data: {
    // 获取地址
    address: {},
    // 购物车数据
    cart: [],
    // 全选按钮
    allChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },

  // 点击获取收货地址
  async handleChooseAddress() {
    try {
      const res1 = await getSetting()
      // 查看用户是否授权
      let scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        // 没授权就打开设置页面
        await openSetting()
      }
      // 获取收货地址api
      const address = await chooseAddress()
      // 地址拼接
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },

  // 商品的选中
  handeItemChange(e) {
    // 获取呗修改的商品的id
    let goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let cart = this.data.cart;
    console.log(cart);
    // 找到被修改的商品对象的索引
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 取反选中状态
    cart[index].checked = !cart[index].checked;
    // 把 购物车数据重新设置回data 和缓存中
    this.setCart(cart);



  },

  // 计算购物车状态
  setCart(cart) {
    // 计算是否全选
    let allChecked = true;
    // 总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {
      if (v.checked) {
        // 选中的
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })

    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);

  },
  // 全选，全不选
  handleItemAllCheck() {
    let {
      allChecked,
      cart
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    // 1.获取传递过来的参数
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 2.获取购物车数组
    let cart = this.data.cart;
    // 3.找到对应数组索引
    let index = cart.findIndex(v => v.goods_id === id);
    // 4.进行修改数量
    if (cart[index].num === 1 && operation === -1) {
      // 询问是否删除商品
      const result = await showModal({
        content: '是否删除该商品?',
        text: "删除"
      })
      if (result.confirm) {
        cart.splice(index, 1);
        // 5.设置回缓存和data中
        this.setCart(cart);
      } else if (result.cancel) {
        console.log('用户取消删除')
      }
    } else {
      cart[index].num += operation;
      // 5.设置回缓存和data中
      this.setCart(cart);
    }

  },
  onShow() {
    // 获取本地存储
    let address = wx.getStorageSync("address");
    // 获取购物车数据
    let cart = wx.getStorageSync('cart') || [];
    this.setCart(cart);
    this.setData({
      address
    })
    console.log(this.data.cart);
  },
  //  点击结算
  async handlePay(){
    // 判断收货地址
    const  {address,totalNum} = this.data; 
    if(!address.userName) {
      await showToast({title:'您还没选中收货地址'});
      return;
    }
    // 判断用户有没有选购商品
    if(totalNum === 0) {
      await showToast({title:'您还没选购商品'});
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }

})