// 每执行一次请求 ajaxTime ++
let ajaxTime = 0;
const request = (option) => {
    ajaxTime++;
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

    // 判断 url中是否带有 /my/ 请求的是私有路径，带上header token
    let header = {...option.header};
    if(option.url.includes("/my/")){
        // 拼接header 带上 token
        header["Authorization"] = wx.getStorageSync("token");
        console.log(header)
    }


    // 开启加载图标
    wx.showLoading({
        title: "正在获取数据",
        mask: true,
    });
    return new Promise((resolve, reject) => {
        wx.request({
            ...option,
            url: baseUrl + option.url,
            header,
            success: (res) => {
                resolve(res.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete() {
                ajaxTime--;
                // 判断是否还有数据没回来
                if (ajaxTime === 0) {
                    // 关闭加载图标
                    wx.hideLoading();
                }
            }
        });
    })
}

export default request