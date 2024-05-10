const app = getApp()
import { http } from "../../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFresh: false,
    isLoading: false,
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
    pageNo: 1, // 当前页数
    pageSize: 6, // 每页显示的初始数据条数
    totalCount: 0, // 加载的总数据数量
    loadingMore: false, // 是否正在加载更多数据
    timer: null,
    outerDivHeight:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.searchList();
    const screenHeight = wx.getSystemInfoSync().windowHeight;
    const calculatedHeight = screenHeight - 45; // 假设 45px 是固定的顶部高度
    this.setData({
      outerDivHeight: calculatedHeight + 'px !important'
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
    this.searchList();
    this.tabIndex = 0;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      timer: null,
      pageIndex: 1
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
  onRefresh(data){
    console.info("下来更新：：", data)
  },
  onScroll(event){
    console.info("滚动条：：", event)
  },
  onScrolled(){
    if(!this.data.isFresh){
      console.info("滚动触底：：")
      this.setData({
        pageSize: this.data.pageSize + 5,
        isLoading: true
      })
      this.searchList()
    } else{
      console.info("还没获取到数据暂不更新：：")
    }
  },

  searchList(event){
    this.setData({
      isFresh: true
    })
    http({
      url: app.loginHost.apiUrl + 'api/order/page',
      data: {
        "deliveryDate": "",
        "status__c": "",
        "orderType__c": "",
        "transactionDate": "",
        "po": "",
        "accountName": "",
        "accountPhone": "",
        "pageNo": this.data.pageNo, // 使用当前页数
        "pageSize": this.data.pageSize
      },
      method: 'POST',
      success: (res) => {
        let dataSource = res.data.data;
        if (dataSource.length > 0) {
          let data = { toBegin: [], inProgress: [], done: [] };
          data["toBegin"] = dataSource.filter(val => val["statusForClient__C"] === 1);
          data["inProgress"] = dataSource.filter(val => val["statusForClient__C"] === 2);
          data["done"] = dataSource.filter(val => val["statusForClient__C"] === 3);
          // 合并新数据与已有数据
          let newData = {
            toBegin: this.data.searchListObj.toBegin.concat(data.toBegin),
            inProgress: this.data.searchListObj.inProgress.concat(data.inProgress),
            done: this.data.searchListObj.done.concat(data.done)
          };
          // 更新数据并增加页数
          this.setData({
            searchListObj: newData,
            pageNo: this.data.pageNo + 1,
            totalCount: this.data.totalCount + dataSource.length, // 更新加载的总数据数量
            isLoading: false,
            isFresh: false
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
    // wx.request({
    //   url: app.loginHost.apiUrl+'api/order/page',
    //   data: 
    //   {
    //     "deliveryDate": "",
    //     "status__c": "",
    //     "orderType__c": "",
    //     "transactionDate": "",
    //     "po": "",
    //     "accountName": "",
    //     "accountPhone": "",
    //     "pageNo": 0,
    //     "pageSize": 6
    //   },
    //   method: 'POST',
    //   success: (res) => {
    //     let dataSource = res.data.data;
    //     // console.log(dataSource)
    //     let index = 0;
    //     if(dataSource.length > 0){
    //       setTimeout(() =>{
    //         let data = {toBegin:[],inProgress:[],done:[]};
    //         data["toBegin"] = dataSource.filter(val => val["statusForClient__C"] === 1);
    //         data["inProgress"] = dataSource.filter(val => val["statusForClient__C"] === 2);
    //         data["done"] = dataSource.filter(val => val["statusForClient__C"] === 3);
    //         if(data["toBegin"].length>0){
    //           index = 0;
    //         }
    //         if(data["inProgress"].length>0){
    //           index = 1;
    //         }
    //         if(data["done"].length>0){
    //           index = 2;
    //         }
    //         // data = this.data.srcListObj;
    //         this.setData({
    //           searchListObj: data, 
    //           // tabIndex: index
    //         });
    //         // console.log(this.data.dataList)
    //       },66)
    //     }
    //   },
    //   fail: (err) => {
    //     console.error('请求后端接口失败', err);
    //     wx.showToast({
    //       title: '请求失败，请稍后重试',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //   },
    // });
  },
  
  onClickListItem(event){
    let item = event.currentTarget.dataset.item;
    // 在当前 TabBar 页面的事件处理函数中进行跳转操作
    wx.navigateTo({
      url: '/pages/custom/mine_details/mine_details?po='+item.po  // 跳转到非 TabBar 页面的路径
    });      
  },
})