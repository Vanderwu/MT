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
      // apiUrl: 'https://sh.mengtian.com.cn:9595/md/'
      apiUrl: 'https://www.mengtianwood.cn/md/'
    },
    "globalData": {
      "chart": null,
      "mapKey": "S6LBZ-NQ2EZ-UTXXW-ZZDFT-7HLF3-ABFDD",
      "baseInfo":{
        token: "",
        phone: "",
        name: ""
      },
      "dateRange": []
    }
});
