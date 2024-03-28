// pages/custom/joborder/joborder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    tabIndex: 0,
    srcListObj: {
      toBegin: [{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"待处理"}],

      inProgress: [{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"处理中"},{number:"SO20240221-0002",dealer:"上海市梦天A级经销商",delivery_date: "2024年03月15日","install_type":"交付中"}],

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
    setTimeout(() =>{
      let data = {toBegin:[],inProgress:[],done:[]};
      let index = 0;
      if(event)
      {
        let keyword = event.detail.value;
        data["toBegin"] = this.data.srcListObj["toBegin"].filter(val => val["title"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1 || val["address"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1);
        data["inProgress"] = this.data.srcListObj["inProgress"].filter(val => val["title"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1 || val["address"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1)
        data["done"] = this.data.srcListObj["done"].filter(val => val["title"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1 || val["address"].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1)
        if(data["toBegin"].length>0){
          index = 0;
        }
        if(data["inProgress"].length>0){
          index = 1;
        }
        if(data["done"].length>0){
          index = 2;
        }
      }
      else
      {
        data = this.data.srcListObj;
      }
      this.setData({
        searchListObj: data,
        tabIndex: index
      });
    },66)
    

  },

  onClickListItem(event){
    let item = event.currentTarget.dataset.item;
    // 在当前 TabBar 页面的事件处理函数中进行跳转操作
    wx.navigateTo({
      url: '/pages/custom/feedback_content/feedback_content'  // 跳转到非 TabBar 页面的路径
    });      
  },

})