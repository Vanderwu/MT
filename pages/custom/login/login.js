Page({
    data: {
      isChecked: false,
      btnColor: '#bbd3fb' // 初始按钮颜色
    },
    onLoad(options) {
       
    },
    loginBtn(){

    },
    checkboxChange: function(e) {
      this.setData({
        isChecked: e.detail.value.length > 0,
        btnColor: e.detail.value.length > 0 ? '#007bff' : '#bbd3fb' // 改变按钮颜色
      });
    },
  
    authorize: function() {
      if (this.data.isChecked) {
        // 执行授权逻辑
        // console.log('已经勾选，执行授权操作');
        wx.switchTab({
          url: '/pages/custom/HomePage/HomePage'
        });
      } else {
        // 在需要弹出提示框的地方调用该方法
        wx.showToast({
          title: '请先勾选同意条例',
          icon: 'none', // 提示框图标，可选值：'success', 'loading', 'none'
          duration: 2000 // 提示框持续时间，单位为毫秒
        });
        // console.log('请先勾选同意条例');
      }
    }

});
