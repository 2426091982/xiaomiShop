// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏参数
    tabs: [{
      id: 0,
      value: '体验问题',
      isActive: true
    }, {
      id: 1,
      value: '商品、商家投诉',
      isActive: false
    }],
    // 被选中的图片路径数组
    chooseImage: [],
    // 文本域内容
    textVal: ''
  },
  // 外网的图片的路径数组
  upLoadImgs: [],

  // 接收子组件的值，修改tabs数据
  activeChange(e) {
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

  // 点击 + 选择图片
  handleChooseImg() {
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选择的图片和数量
      count: 9,
      // 图片的格式，原图，压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: res => {
        // 图片数组进行拼接
        let ary = [...this.data.chooseImage, ...res.tempFilePaths];
        this.setData({
          chooseImage: ary
        })
      }
    })
  },
  // 点击自定义图片组件
  handleRemoveImg(e) {
    // 2.获取被点击的组件的索引
    let {
      index
    } = e.currentTarget.dataset;
    // 3.获取data中的图片数组
    let chooseImage = this.data.chooseImage;
    // 4.删除元素
    chooseImage.splice(index, 1);
    console.log(chooseImage)
    this.setData({
      chooseImage
    })
  },
  // 文本域的输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮的点击事件
  handleFormSubmit() {
    // 1.获取文本域的内容
    const {
      textVal,
      chooseImage
    } = this.data;
    // 2.合法性的验证
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: "输入不合法",
        icon: 'none',
        mask: true
      })
      return
    }
    // 3.上传图片到专门的图片服务器
    // 上传文件的api不支持多个文件同时上传 遍历数组
    
    // 显示正在加载的图标
    wx.showLoading({
      title: "正在上传中...",
      mask: true
    })


    // 判断有没有图片需要上传
    if (chooseImage.length !== 0) {
      // 有图片上传
      chooseImage.forEach(async (v, i) => {
        /* wx.uploadFile({
          // 图片要上传到那里
          url: "https://clubajax.autohome.com.cn/Upload/UpImageOfBase64New?dir=image&cros=autohome.com.cn",
          // 被上传的文件的路径
          filePath: v,
          method: "POST",
          // 上传的文件的名称，后台获取文件
          name: 'file',
          // 顺带的文本信息
          formData: {},
          success: res => {
            console.log(1);
            console.log(res.data);
          }
        })*/
        // 模拟
        let url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595322832296&di=61040f5c354d3535aedd95aa1d8fc560&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161226%2F995192a1a7a14a05b6b49a42b30830b4_th.jpeg";
        this.upLoadImgs.push(url);

        // 所有的图片都上传完毕了才触发
        if (i === chooseImage.length - 1) {
          wx.hideLoading();
          console.log("模拟： 把文本域内容和外网的数组图片提交到后台")
          // 图片数组
          console.log(this.upLoadImgs);
          // 文字
          console.log(this.data.textVal);
          // 提交都成功了
          // 重置页面
          this.setData({
            textVal: '',
            chooseImage: []
          })
        }
      })
    } else {
      // 关闭加载图标
      wx.hideLoading();
      console.log('只是提交了文本');
    }
    // 弹窗提示
    wx.showToast({
      title: "反馈意见成功!",
      success: res => {
        setTimeout(() => {
          // 返回上一个页面
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  }
})