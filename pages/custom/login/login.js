const app = getApp()
// import { XRShadow } from "XrFrame/elements";
import { http, getUserProfile } from "../../../utils/http"

Page({
    data: {
      checkboxValue: false,
      btnColor: '#bbd3fb', // 初始按钮颜色
      isTrue:false,
      isPhone:false,
      dynamicCode: "",
      code: ""
    },
    onLoad(options) {

    },
    //勾选协议
    checkboxBtn(e)
    {
      var that = this;
      let lastValue = this.data.checkboxValue;
      if(!lastValue){
        that.authorizedLogin()
      }else{
        that.setData({
          isTrue:false
        })
      }
      this.setData({
        checkboxValue: !lastValue,
        btnColor: !lastValue ? '#007bff' : '#bbd3fb', // 改变按钮颜色
      });
    },
    authorizedLogin(){
      var that = this;
      wx.login({
        success: (res) => {
          const code = res.code;
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
                  wx.setStorage({
                    key:"token",
                    data: res.data.data.token
                  })
                }else{
                  that.setData({
                    isTrue:true,
                    isPhone:true
                  })
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
    },
    getPhoneNumber(e){
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
          // PhoneNumber:"getPhoneNumber"
        });
      } else{
        wx.getUserProfile({
          desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
            });
            wx.setStorageSync('userInfo', res.userInfo);
          }
        })
      } 
      if(!that.isPhone){
        wx.switchTab({
          url: '/pages/custom/HomePage/HomePage'
        });
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
