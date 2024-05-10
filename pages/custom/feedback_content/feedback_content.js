const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
import { http } from "../../../utils/http"
Page({

    /**
     * 页面的初始数据
     */
    data: {
      stepIndex: 0,
      step1_icon: "../../../assets/step1.png",
      step2_icon: "../../../assets/step2.png",
      step3_icon: "../../../assets/step3.png",
      value: '',
      visible: false,
      name:"",
      phone:"",
      provinceValue:"",
      CityValue:"",
      countyValue:"",
      provincelabel:"",
      Citylabel:"",
      countylabel:"",
      address:"",
      dataList:{},
      defaultValue:"0",
      caseNo:"",
      gridConfig: {
        column: 5,
        width: 80,
        height: 80,
      },
      config: {
        count: 1,
      },
      originFiles: [],
      maxFiles: 3, // 设置最大上传文件数量为3
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this;
      let id = options.id
      if(id){
        http({
          url: app.loginHost.apiUrl+'api/service-case?id='+encodeURIComponent(id),
          method: 'GET',
          success: (res) => {
            let dataSource = res.data.data;
            console.log("2111",dataSource.orderNeoId)
            if(dataSource.clientCaseStatusC == '1'){
              this.setData({
                step1_icon : "../../../assets/step_1.png",
                step2_icon: "../../../assets/step2.png",
                step3_icon: "../../../assets/step3.png",
                stepIndex:0
              })
            }else if(dataSource.clientCaseStatusC == '2'){
              this.setData({
                step1_icon : "../../../assets/step1.png",
                step2_icon: "../../../assets/step_2.png",
                step3_icon: "../../../assets/step3.png",
                stepIndex:1
              })
            }else{
              this.setData({
                step1_icon : "../../../assets/step1.png",
                step2_icon: "../../../assets/step2.png",
                step3_icon: "../../../assets/step_3.png",
                stepIndex:2
              })
            }
            let picture = dataSource.picture;
            let originFiles = picture.map(fileId => {
              return {
                  url: `https://sh.mengtian.com.cn:9595/md/api/common/file/direct-download?fileId=${fileId}`
              };
          });
          http({
            url: app.loginHost.apiUrl+'api/order?neoid='+dataSource.orderNeoId,
            method: 'GET',
            success: function(res) {
              if(res.data.code == 'success'){
                that.setData({
                  caseNo:res.data.data.po
                });
              }
            },
            fail: function(err) {
              console.error('请求失败', err);
            }
          });
            this.setData({
              dataList:dataSource,
              defaultValue:dataSource.questionType+"",
              provinceValue:dataSource.province,
              CityValue:dataSource.city,
              countyValue:dataSource.district,
              originFiles:originFiles
            });
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
      ////省份
      wx.request({
        url: app.loginHost.apiUrl+'api/common/pick-list?apiName=province',
        method: 'GET',
        success: function(res) {
          if(res.data.code == 'success'){
            let dataList = res.data.data
            let codeToMatch = that.data.provinceValue;
            let matchedItem = dataList.find(item => item.optionCode === codeToMatch);

            that.setData({
              provincelabel:matchedItem ? matchedItem.optionLabel :null
            })
          }
        },
        fail: function(err) {
          console.error('请求失败', err);
        }
      });

     //市区
     wx.request({
      url: app.loginHost.apiUrl+'api/common/pick-list?apiName=city',
      method: 'GET',
      success: function(res) {
        if(res.data.code == 'success'){
          let dataList = res.data.data
          let codeToMatch = that.data.CityValue;
          let matchedItem = dataList.find(item => item.optionCode === codeToMatch);
          that.setData({
            Citylabel:matchedItem ? matchedItem.optionLabel :null
          })
        }
      },
      fail: function(err) {
        console.error('请求失败', err);
      }
    });

    //区县
    wx.request({
      url: app.loginHost.apiUrl+'api/common/pick-list?apiName=district',
      method: 'GET',
      success: function(res) {
        if(res.data.code == 'success'){
          let dataList = res.data.data
          let codeToMatch = that.data.countyValue;
          let matchedItem = dataList.find(item => item.optionCode === codeToMatch);
          that.setData({
            countylabel:matchedItem ? matchedItem.optionLabel : null
          })
        }
      },
      fail: function(err) {
        console.error('请求失败', err);
      }
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
    handleTap(){
      wx.switchTab({
        url: '/pages/custom/HomePage/HomePage'  // 跳转到非 TabBar 页面的路径
      });  
    },
    showSuccessMessage() {
      Message.success({
        context: this,
        offset: [20, 32],
        duration: 5000,
        content: '问题反馈提交成功',
      });
    },
    handleClick() {
      console.log("visible",visible)
      this.setData({ visible: true });
    },
    handleOverlayClick(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    handleOverlayClick(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    onStepChange(e) {
      this.setData({ stepIndex: e.detail.current });
    },
})