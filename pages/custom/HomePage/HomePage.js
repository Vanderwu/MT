// pages/custom/HomePage/HomePage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      mask_group :'/assets/mask-group.png'
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
    }
})