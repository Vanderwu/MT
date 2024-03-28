// pages/custom/mine_details/mine_details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      showViews: true,
      stepIndex: 0,
      step1_icon: "../../../assets/step1.png",
      step2_icon: "../../../assets/step2.png",
      step3_icon: "../../../assets/step3.png",
      checkboxHeight:168,
      checkboxValue: true
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
    /**监听订单信息中单选框 */
    onCheckboxChange: function(event) {
      let value = false//this.data.showViews;
      let lastValue = this.data.checkboxValue;
      this.setData({
        showViews: !value,
        checkboxValue:!lastValue,
        checkboxHeight: !value ? 168 : 126 //默认高度126px当勾选单选框，则高度为168px
      });
    },
    onStepChange(e) {
      this.setData({ stepIndex: e.detail.current });
    },
    makePhoneCall: function() {
      wx.makePhoneCall({
        phoneNumber: '400-0000-000', // 替换成要拨打的手机号
      })
    },
    handleTap(){
      wx.navigateTo({
        url: '/pages/custom/feedback/feedback'  // 跳转到非 TabBar 页面的路径
      });  
    }
})