/* promise 形式的wx函数*/

/* 查看权限 */
export const getSetting =  () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err);
      }
    })
  })
}
/* 获得地址 */
export const chooseAddress =  () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err);
      }
    })
  })
}
/* 打开授权页面 */
export const openSetting =  () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err);
      }
    })
  })
}


// showModel promise形式
export const showModal =  (option) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: option.content,
      confirmText: option.text,
      success: (result) => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  })
}

// showToast promise形式
export const showToast =  ({title}) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: title,
      icon: 'none',
      success: (result) => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  })
}

// login promise形式
export const login =  () => {
  return new Promise((resolve,reject) => {
    wx.login({
      timeout: 10000,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}