// pages/custom/feedback/feedback.js
import Message from 'tdesign-miniprogram/message/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      value: 'SO20240221-0002',
      visible: false,
      name:"李女士",
      phone:"137xxxxxx7932",
      province:"上海",
      City:"上海市",
      address:"上海市嘉定区宝翔路宏利瑞园5栋501",
      gridConfig: {
        column: 5,
        width: 80,
        height: 80,
      },
      config: {
        count: 1,
      },
      originFiles: [
        {
          url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
          name: 'uploaded1.png',
          type: 'image',
        },
        {
          url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
          name: 'uploaded2.png',
          type: 'image',
        },
        {
          url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
          name: 'uploaded3.png',
          type: 'image',
        },
      ],
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
    // handleSuccess(e) {
    //   const { files } = e.detail;
    //   const { originFiles, maxFiles } = this.data;
    //   console.log(originFiles.length);
    //   // console.log(files.length);
    //   if (originFiles.length > 2) {
    //     wx.showToast({
    //       title: '最多只能上传3张图片',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //     return; // 不执行文件更新操作
    //   }
    //   this.setData({
    //     originFiles: files,
    //   });
    // },
    
    // handleRemove(e) {
    //   const { index } = e.detail;
    //   const { originFiles } = this.data;
    //   originFiles.splice(index, 1);
    //   this.setData({
    //     originFiles,
    //   });
    // },
    // handleClick(e) {
    //   console.log(e.detail.file);
    // }
})