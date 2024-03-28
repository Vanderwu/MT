// pages/custom/feedback/feedback.js
import Message from 'tdesign-miniprogram/message/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      value: '',
      inputName:'',
      inputPhone:'',
      inputProvince:'',
      inputCounty:'',
      inputaddress:'',
      inputTextarea:'',
      visible: false,
      gridConfig: {
        column: 5,
        width: 80,
        height: 80,
      },
      config: {
        count: 1,
      },
      originFiles: [], // 初始文件列表为空
      maxFiles: 3, // 设置最大上传文件数量为3
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
    inputName(e){
      this.setData({
        inputName:e.detail.value,
        nameBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
      console.log(e.detail.value)
    },
    inputPhone(e){
      //联系方式
      this.setData({
        inputPhone:e.detail.value,
        phoneBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputProvince(e){
      //省份
      this.setData({
        inputProvince:e.detail.value,
        provinceBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputCounty(e){
      //区县
      this.setData({
        inputCounty:e.detail.value,
        countyBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputaddress(e){
      //详细地址
      this.setData({
        inputAddress:e.detail.value,
        addressBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputTextarea(e){
      this.setData({
        inputTextarea:e.detail.value,
        textareaBorderStyle: e.detail.value ? "": "border: 0.5px solid rgb(235, 115, 115);"
      });
    },
    handleTap(){
      if(!this.data.inputName){
        console.log(this.data.inputName)
        this.setData({
          'nameBorderStyle': "border-bottom: 0.5px solid rgb(235, 115, 115);"
        });
      }else{
        this.setData({
          'nameBorderStyle': ""
        });
        this.showSuccessMessage()
        this.resetting()
      }
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
      this.setData({ visible: true });
    },
    handleOverlayClick(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    chooseImage: function() {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 选择图片成功后的回调函数
          var tempFilePaths = res.tempFilePaths;
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          // 将选择的图片上传至服务器或进行其他操作
          console.log(tempFilePaths);
        }
      })
    },
    handleSuccess(e) {
      const { files } = e.detail;
      const { originFiles, maxFiles } = this.data;
      console.log(originFiles.length);
      // console.log(files.length);
      if (originFiles.length > 2) {
        wx.showToast({
          title: '最多只能上传3张图片',
          icon: 'none',
          duration: 2000
        });
        return; // 不执行文件更新操作
      }
      this.setData({
        originFiles: files,
      });
    },
    
    handleRemove(e) {
      const { index } = e.detail;
      const { originFiles } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
    handleClick(e) {
      console.log(e.detail.file);
    },
    resetting(){
      this.setData({
        inputName:'',
        inputPhone:'',
        inputProvince:'',
        inputCounty:'',
        inputaddress:'',
        inputTextarea:'',
      });
    }
})