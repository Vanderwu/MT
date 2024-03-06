// pages/custom/joborder/joborder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      searchValue: "",
      tabIndex: 0,
      srcListObj: {
        toBegin: [{title:"李女士的派工单",address:"上海市长宁区江苏路...",date: "2024-03-15 00:00:00"},{title:"黄先生的派工单",address:"深圳市坪山区荔景路...",date: "2024-03-18 00:00:00"},{title:"吴先生的派工单",address:"深圳市坪山区启明路...",date: "2024-03-19 00:00:00"}],
        inProgress: [{title:"姚女士的派工单",address:"上海市长宁区江苏路...",date: "2024-03-15 00:00:00"},{title:"方先生的派工单",address:"深圳市坪山区荔景路...",date: "2024-03-18 00:00:00"},{title:"刘先生的派工单",address:"深圳市坪山区启明路...",date: "2024-03-19 00:00:00"}],
        done: [{title:"赵女士的派工单",address:"上海市长宁区江苏路...",date: "2024-03-15 00:00:00"},{title:"何先生的派工单",address:"深圳市坪山区荔景路...",date: "2024-03-18 00:00:00"},{title:"彭先生的派工单",address:"深圳市坪山区启明路...",date: "2024-03-19 00:00:00"}]
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
      this.startTimer();
      this.conversionDate();
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
    startTimer(){
      this.data.timer = setTimeout(() =>{
        this.conversionDate();
        this.startTimer();
      },5000)
    },
    conversionDate()
    {
        let toBegin = this.data.searchListObj["toBegin"];
        let inProgress = this.data.searchListObj["inProgress"];
        let done = this.data.searchListObj["done"];
        for (let index = 0; index < toBegin.length; index++) {
          let element = toBegin[index];
          if(element["date"]){
            element["dateObj"] = this.formatDate(element["date"])
          }
        }
        for (let index = 0; index < inProgress.length; index++) {
          let element = inProgress[index];
          if(element["date"]){
            element["dateObj"] = this.formatDate(element["date"])
          }
        }
        for (let index = 0; index < done.length; index++) {
          let element = done[index];
          if(element["date"]){
            element["dateObj"] = this.formatDate(element["date"])
          }
        }
        let obj = {
          toBegin: toBegin,
          inProgress: inProgress,
          done: done
        }
        this.setData({
          searchListObj: obj
        }); 
    },
    onClickListItem(event){
      let item = event.currentTarget.dataset.item;
      // 在当前 TabBar 页面的事件处理函数中进行跳转操作
      wx.navigateTo({
        url: '/pages/custom/joborder_details/joborder_details'  // 跳转到非 TabBar 页面的路径
      });      
    },
    formatDate(date){
      const currentDate = new Date();
      const specifiedDate = new Date(date);
      const timeDifference = specifiedDate.getTime() - currentDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      return {
        days: daysDifference > 9 ? daysDifference : ("0" + daysDifference),
        hours: hoursDifference > 9 ? hoursDifference : ("0" + hoursDifference),
        minutes: minutesDifference > 9 ? minutesDifference : ("0" + minutesDifference),
      }
    }

})