// pages/custom/HomePage/HomePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask_group :'/assets/mine_img.png',
    nickName:"",
    avatarUrl:"",
    isTrue:"display: block;"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      isTrue:true ? "display: none;" : "display: block;",
      avatarUrl:userInfo ? userInfo.avatarUrl : '/assets/logo.jpg',
      nickName: userInfo ? userInfo.nickName : '微信用户'
    });
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

  },
  clickLogin(){
    // const userInfo = wx.getStorageSync('userInfo');
    // if(userInfo){
    //   wx.showToast({
    //     title: '已登录',
    //     icon:'none',
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/custom/login/login',
    //   })
    // }
  },
  clickDevice(){
    wx.navigateTo({
      url: '/pages/custom/mine/mine',
    })  
  },
  clickProject(){
    wx.navigateTo({
      url: '/pages/custom/feedback_details/feedback_details',
    })  
  },
  //获取头像+名称方法
  getUserProfile(e) {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      console.log("存在了")
    }else{
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log("getUserProfile",res)
          this.setData({
            isTrue:true ? "display: none;" : "display: block;",
            avatarUrl:res.userInfo ? res.userInfo.avatarUrl : '/assets/logo.jpg',
            nickName: res.userInfo ? res.userInfo.nickName : '微信用户'
          });
          wx.setStorageSync('userInfo', res.userInfo);
        }
      })
    }
  }
})