const app = getApp()
Page({
    data: {
      checkboxValue: false,
      btnColor: '#bbd3fb' // 初始按钮颜色
    },
    onLoad(options) {
       
    },
    loginBtn(){

    },
    checkboxBtn: function(e) {
      this.setData({
        isChecked: e.detail.value.length > 0,
        btnColor: e.detail.value.length > 0 ? '#007bff' : '#bbd3fb' // 改变按钮颜色
      });
    },
  
    authorize: function() {
      if (this.data.checkboxValue) {
        // 执行授权逻辑
        // console.log('已经勾选，执行授权操作');
        // 前端页面的逻辑层
        wx.login({
          success: (res) => {
            if (res.code) {
              // 获取到用户登录凭证 code
              const code = res.code;
              console.log(res)
              // 将 code 发送给后端服务器
              wx.request({
                url: app.loginHost.apiUrl+'api/auth/login/wechat',
                data: 
                {
                  "code":code,
                  "userType": 0
                },
                method: 'POST',
                success: (res) => {
                  console.log(res.data)
                  // if(res.data.code == "user_not_exists")
                  // {
                  //   wx.showToast({
                  //     title: res.data.message,
                  //     icon: 'none',
                  //     duration: 2000
                  //   })
                  //   return;
                  // }else{                  
                    wx.switchTab({
                      url: '/pages/custom/HomePage/HomePage'
                    });  
                  // }
                },
                fail: (err) => {
                  console.error('请求后端接口失败', err);
                  wx.showToast({
                    title: '请求后端接口失败'+err,
                    icon:'none'
                  })
                },
              });
            } else {
              console.error('获取用户登录凭证失败', res.errMsg);
              wx.showToast({
                title: '获取用户登录凭证失败'+res.errMsg,
                icon:'none'
              })
            }
          },
          fail: (err) => {
            console.error('调用 wx.login 失败', err);
            wx.showToast({
              title: '调用 wx.login 失败'+err,
              icon:'none'
            })
          },
        });
        // wx.switchTab({
        //   url: '/pages/custom/HomePage/HomePage'
        // });
      } else {
        // 在需要弹出提示框的地方调用该方法
        wx.showToast({
          title: '请先勾选同意条例',
          icon: 'none', // 提示框图标，可选值：'success', 'loading', 'none'
          duration: 2000 // 提示框持续时间，单位为毫秒
        });
        // console.log('请先勾选同意条例');
      }
    },
    checkboxBtn(e)
    {
      let lastValue = this.data.checkboxValue;
      this.setData({
        checkboxValue: !lastValue,
        btnColor: !lastValue ? '#007bff' : '#bbd3fb' // 改变按钮颜色
      
      });
    },

});
