import gulpError from './utils/gulpError';
App({
    globalData: {
      userInfo: null
    },
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
        wx.getUserInfo({
          success: res => {
            this.globalData.userInfo = res.userInfo
          }
        })
    },
    //接口请求地址
    loginHost:{
      apiUrl: 'http://sh.mengtian.com.cn:9595/md/'
    }
});
