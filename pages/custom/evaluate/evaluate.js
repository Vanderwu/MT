// pages/custom/feedback_details/feedback_details.js
const app = getApp()
import { http } from "../../../utils/http"
Page({
  data: {
    toBegin: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    http({
      url: app.loginHost.apiUrl+'api/service-work-valuation/list',
      method: 'POST',
      success: function(res) {
        if(res.data.code == 'success'){
          this.setData({
            toBegin: res.data.data
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
})