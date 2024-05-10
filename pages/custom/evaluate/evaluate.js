// pages/custom/feedback_details/feedback_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    tabIndex: 0,
    srcListObj: {
      toBegin: [{number:"CS20240720-0001",dealer:"配送司机A",delivery_date: "2024年03月15日","install_type":"待评价"},{number:"CS20240720-0002",dealer:"安装技工B",delivery_date: "2024年03月15日","install_type":"待评价"}],

      done: [{number:"CS20240720-0001",dealer:"配送司机A",delivery_date: "2024年03月15日","install_type":"已完成"},{number:"CS20240720-0002",dealer:"安装技工B",delivery_date: "2024年03月15日","install_type":"已完成"}]
    },
    cur: {},
    position: [
      { value: 'top', text: '顶部弹出' },
      { value: 'left', text: '左侧弹出' },
      { value: 'center', text: '中间弹出' },
      { value: 'bottom', text: '底部弹出' },
      { value: 'right', text: '右侧弹出' },
    ],
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
      url:'/pages/custom/evaluate_details/evaluate_details'
      // url: '/pages/custom/evaluate_details/evaluate_details?url=https://fsc-sandbox.txscrm.com/TJWKKZIXHHF',
    });  
  },
  handlePopup(e) {
    const { item } = e.currentTarget.dataset;

    this.setData(
      {
        cur: item,
      },
      () => {
        this.setData({ visible: true });
      },
    );
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
})