const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    tabIndex: 0,
    srcListObj: {
      toBegin: [{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"待交付"}],

      inProgress: [{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"交付中"},{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"交付中"}],

      done: [{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"已完成"}]
    },
    searchListObj: {
      toBegin: [],
      inProgress: [],
      done: []
    },
    timer: null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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
    this.searchList();
    this.tabIndex = 0;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      timer: null
    })
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
  onTabsChange(event) {
    this.setData({
      tabIndex: event.detail.value
    });
  },

  onTabsClick(event) {
    this.setData({
      tabIndex: event.detail.value
    });
  },

  searchList(event){
    wx.request({
      url: app.loginHost.apiUrl+'api/order/list',
      data: 
      {
        "deliveryDate": "",
        "status__c": "",
        "orderType__c": "",
        "transactionDate": "",
        "po": "",
        "accountName": "",
        "accountPhone": ""
      },
      method: 'POST',
      success: (res) => {
        let dataSource = res.data.data;
        // console.log(dataSource)
        let index = 0;
        if(dataSource.length > 0){
          setTimeout(() =>{
            let data = {toBegin:[],inProgress:[],done:[]};
            data["toBegin"] = dataSource.filter(val => val["status__c"] === "0");
            data["inProgress"] = dataSource.filter(val => val["status__c"] === "1");
            data["done"] = dataSource.filter(val => val["status__c"] === "2");
            if(data["toBegin"].length>0){
              index = 0;
            }
            if(data["inProgress"].length>0){
              index = 1;
            }
            if(data["done"].length>0){
              index = 2;
            }
            // data = this.data.srcListObj;
            this.setData({
              searchListObj: data, 
              // tabIndex: index
            });
            // console.log(this.data.dataList)
          },66)
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
  },
  onClickListItem(event){
    let item = event.currentTarget.dataset.item;
    console.log("11111",item.po)
    // 在当前 TabBar 页面的事件处理函数中进行跳转操作
    wx.navigateTo({
      url: '/pages/custom/mine_details/mine_details?po='+item.po  // 跳转到非 TabBar 页面的路径
    });      
  },
})