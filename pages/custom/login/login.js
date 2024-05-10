const app = getApp()
import { http, getUserProfile } from "../../../utils/http"

Page({
    data: {
      checkboxValue: false,
      btnColor: '#bbd3fb', // 初始按钮颜色
      isTrue:false,
      dynamicCode: "",
      code: "",
      PhoneNumber:""
    },
    onLoad(options) {

    },
    //校验是否勾选
    getCheckboxValue(e){
      if (!this.data.checkboxValue) {
        wx.showToast({
          title: '请先勾选同意条例',
          icon: 'none', // 提示框图标，可选值：'success', 'loading', 'none'
          duration: 2000 // 提示框持续时间，单位为毫秒
        });
      }
    },
    getPhoneNumber(e){
      // console.log(e.detail.code)  // 动态令牌
      // console.log(e.detail.errMsg) // 回调信息（成功失败都会返回W）
      // console.log(e.detail.errno)  // 错误码（失败时返回）
      if (e.detail.errMsg.includes("deny")){
        wx.showToast({
          title: '获取电话号码失败，请授权',
          icon: 'none',
          duration:2000
        });
      } else {
        // 用户授权提供电话号码，可以在这里处理获取到的电话号码
        wx.login({
          success: (res) => {
            const code = res.code;
            const dynamicCode = e.detail.code;
            http({
              url: app.loginHost.apiUrl+'api/auth/login/wechat',
              data: 
              {
                "code": code,
                "userType": 0
              },
              method: 'POST',
              success: (res) => {
                if(res.data?.code === "success"){
                  if (res && res.data && res.data.data.token){
                    console.log("接口返回了 token:", res.data.data.token);
                    wx.setStorage({
                      key:"token",
                      data: res.data.data.token
                    })
                    wx.switchTab({
                      url: '/pages/custom/HomePage/HomePage'
                    });
                  }else{
                    http({
                      url: app.loginHost.apiUrl+'api/auth/login/phone-validate',
                      data: 
                      {
                        "code": dynamicCode,
                        "unionid": res.data.data.unionid ? res.data.data.unionid : "",
                        "openid": res.data.data.openid ? res.data.data.openid : "",
                        "userType": 0
                      },
                      method: 'POST',
                      success: (res) => {
                        if(res.data?.code === "success"){
                          wx.setStorage({
                            key:"token",
                            data: res.data.data.token
                          })
                          wx.switchTab({
                            url: '/pages/custom/HomePage/HomePage'
                          });
                        }else{
                          wx.showToast({
                            title: '登录失败:'+res?.message,
                            icon:'none'
                          })
                        }
                      },
                      fail: (err) => {
                        console.error('请求后端接口失败', err);
                        wx.showToast({
                          title: '请求后端接口失败'+err,
                          icon:'none'
                        })
                      },
                    });
                  }
                }else{
                  wx.showToast({
                    title: '请求后端接口失败!',
                    icon:'none'
                  })
                }
              },fail: (err) => {
                wx.showToast({
                  title: '请求后端接口失败'+err,
                  icon:'none'
                })
              }
            });
          },
        })  
      }  
    },
    // postWechat(){
    //   http({
    //     url: app.loginHost.apiUrl+'api/auth/login/wechat',
    //     data: 
    //     {
    //       "code": this.data.code,
    //       "userType": 0
    //     },
    //     method: 'POST',
    //     success: (res) => {
    //       if(res.data?.code === "success"){
    //         if (res && res.data && res?.token){
    //           console.log("接口返回了 token:", res.data.data.token);
    //           wx.setStorage({
    //             key:"token",
    //             data: res?.token
    //           })
    //           wx.switchTab({
    //             url: '/pages/custom/HomePage/HomePage'
    //           });
    //         }else{
    //           http({
    //             url: app.loginHost.apiUrl+'api/auth/login/phone-validate',
    //             data: 
    //             {
    //               "code": this.data.dynamicCode,
    //               "unionid": res.data.data.unionid ? res.data.data.unionid : "",
    //               "openid": res.data.data.openid ? res.data.data.openid : "",
    //               "userType": 0
    //             },
    //             method: 'POST',
    //             success: (res) => {
    //               if(res.data?.code === "success"){
    //                 wx.setStorage({
    //                   key:"token",
    //                   data: res?.token
    //                 })
    //                 wx.switchTab({
    //                   url: '/pages/custom/HomePage/HomePage'
    //                 });
    //               }else{
    //                 wx.showToast({
    //                   title: '登录失败:'+res?.message,
    //                   icon:'none'
    //                 })
    //               }
    //             },
    //             fail: (err) => {
    //               console.error('请求后端接口失败', err);
    //               wx.showToast({
    //                 title: '请求后端接口失败'+err,
    //                 icon:'none'
    //               })
    //             },
    //           });
    //         }
    //       }else{
    //         wx.showToast({
    //           title: '请求后端接口失败!',
    //           icon:'none'
    //         })
    //       }
    //     },
    //     fail: (err) => {
    //       console.error('请求后端接口失败', err);
    //       wx.showToast({
    //         title: '请求后端接口失败'+err,
    //         icon:'none'
    //       })
    //     },
    //   });
    // },
    checkboxBtn(e)
    {
      let lastValue = this.data.checkboxValue;
      let PhoneNumber = ""
      if(!lastValue){
        PhoneNumber = "getPhoneNumber"
      }else{
        PhoneNumber = ""
      }
      this.setData({
        checkboxValue: !lastValue,
        btnColor: !lastValue ? '#007bff' : '#bbd3fb', // 改变按钮颜色
        PhoneNumber:PhoneNumber
      });
    },
   //获取头像+名称方法
   getUserProfile(e) {
    var that = this;
    if (this.data.checkboxValue) {
      const storedUserInfo = wx.getStorageSync('userInfo');
      if(storedUserInfo){
        console.log("本地已存在用户信息，不需要再次获取。");
        this.setData({
          userInfo: storedUserInfo,
          hasUserInfo: true,
          isTrue: true,
          // PhoneNumber:"getPhoneNumber"
        });
      } else{
        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            // console.log("res",res)
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
              isTrue:true,
              // PhoneNumber:"getPhoneNumber"
            });
            wx.setStorageSync('userInfo', res.userInfo);
          }
        })
      } 
    } else {
      // 在需要弹出提示框的地方调用该方法
      wx.showToast({
        title: '请先勾选同意条例',
        icon: 'none', // 提示框图标，可选值：'success', 'loading', 'none'
        duration: 2000 // 提示框持续时间，单位为毫秒
      });
      // console.log('请先勾选同意条例');
    }
  }
});
