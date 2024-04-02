const app = getApp()
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
      s1_icon : '',
      s2_icon : '',
      s3_icon : '',
      checkboxHeight:168,
      checkboxValue: true,
      dataList:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let po = options.po;
      if(po){
        wx.request({
          url: app.loginHost.apiUrl+'api/order/list',
          data:{
            "deliveryDate": "",
            "status__c": "",
            "orderType__c": "",
            "transactionDate": "",
            "po": po,
            "accountName": "",
            "accountPhone": ""
          },
          method: 'POST',
          success: (res) => {
            if(res.data.data.length > 0){
              let dataSource = res.data.data[0];
              if(dataSource.status__c == '0'){
                this.setData({
                  s1_icon : "../../../assets/step_1.png",
                  s2_icon : "../../../assets/step2.png",
                  s3_icon : "../../../assets/step3.png" 
                })
              }else if(dataSource.status__c == '1'){
                this.setData({
                  s1_icon : "../../../assets/step1.png",
                  s2_icon : "../../../assets/step_2.png",
                  s3_icon : "../../../assets/step3.png"
                })  
              }else{
                this.setData({
                  s1_icon : "../../../assets/step1.png",
                  s2_icon : "../../../assets/step2.png",
                  s3_icon : "../../../assets/step_3.png"  
                })
              }
              this.setData({
                dataList:dataSource,
                stepIndex:dataSource.status__c,
                step1_icon:this.data.s1_icon,
                step2_icon:this.data.s2_icon,
                step3_icon:this.data.s3_icon
              });
            }else{
              wx.showToast({
                title: '请求失败，请稍后重试',
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: (err) => {
            console.error('请求后端接口失败', err);
            wx.showToast({
              title: '请求失败，请稍后重试',
              icon: 'none',
              duration: 2000
            });
          },
        });
      }else{
        wx.showToast({
          title: '外星人劫持了，您的订单',
          icon: 'none',
          duration: 2000
        });
      }
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
        url: '/pages/custom/feedback/feedback?po='+this.data.dataList.po  // 跳转到非 TabBar 页面的路径
      });  
    }
})