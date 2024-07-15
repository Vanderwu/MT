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
      this.getUserProfile();
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
      return {
        title: '梦天木作售后服务中心',
        path: '/pages/custom/login/login',
        imageUrl:"../../../assets/share.jpg"
    };
    },
    option_1:function(){
      // 我的订单
      wx.navigateTo({
        url: '/pages/custom/mine/mine'
      });
    },
    option_2:function(){
      // 问题反馈
      wx.navigateTo({
        url: '/pages/custom/feedback/feedback'
      });
    },
    option_3:function(){
      // 我的反馈
      wx.navigateTo({
        url: '/pages/custom/feedback_details/feedback_details'
      });
    },
    option_4:function(){
      // 我的评价
      wx.navigateTo({
        url: '/pages/custom/evaluate/evaluate'
      });
    },
  //获取头像+名称方法
   getUserProfile(e) {
    const storedUserInfo = wx.getStorageSync('userInfo');
    if(storedUserInfo){
      console.log("本地已存在用户信息，不需要再次获取!");
    } else{
      wx.getUserProfile({
        desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          wx.setStorageSync('userInfo', res.userInfo);
        }
      })
    }
  }
})