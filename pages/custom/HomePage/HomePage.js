// pages/custom/HomePage/HomePage.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      mask_group :'/assets/mask-group.png',
      effective:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.logineffective()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    logineffective(){
      let that = this;
      wx.checkSession({
        success: function() {
          that.setData({
            effective: true
          });
        },
        fail: function() {
          that.setData({
            effective:false
          })
          // 登录态失效，用户未登录或登录态已过期，需要重新登录
          console.log("用户未登录或登录态已过期，需要重新登录");
          // 在这里可以执行重新登录的逻辑，比如调用 wx.login() 方法重新获取登录凭证
        }
      });
    },
    option_1:function(){
      // 我的订单
      this.logineffective()
      if(this.data.effective){
        wx.navigateTo({
          url: '/pages/custom/mine/mine'
        });
      }else{
        wx.showToast({
          title: '身份令牌已失效请重新登录',
          icon:'none',
          document:3000
        })
      }
    },
    option_2:function(){
      // 问题反馈
      this.logineffective()
      if(this.data.effective){
        wx.navigateTo({
          url: '/pages/custom/feedback/feedback'
        });
      }else{
        wx.showToast({
          title: '身份令牌已失效请重新登录',
          icon:'none',
          document:3000
        })
      }
    },
    option_3:function(){
      // 我的反馈
      this.logineffective()
      if(this.data.effective){
        wx.navigateTo({
          url: '/pages/custom/feedback_details/feedback_details'
        });
      }else{
        wx.showToast({
          title: '身份令牌已失效请重新登录',
          icon:'none',
          document:3000
        })
      }
    },
    option_4:function(){
      // 我的评价
      this.logineffective()
      if(this.data.effective){
        wx.navigateTo({
          url: '/pages/custom/evaluate/evaluate'
        });
      }else{
        wx.showToast({
          title: '身份令牌已失效请重新登录',
          icon:'none',
          document:3000
        })
      }
    }
})