export const http = async (options = {}) => {
    const token = await getToken()
    // console.info("获取token：", token)
    wx.request({
      url: options.url,
      data: options.data,
      method: options.method,
      header: {
        "Authorization": token
      },
      success: (res) => {
        console.log("token-res",res)
        // TODO： 校验Token过期
        if(res?.statusCode == 200){
          if(res.data?.code == "invalid_token"){
            wx.navigateTo({
              url: '/pages/custom/login/login',
            })
          }
        }
        options.success(res)
      },
      fail: (err) => {
        console.error('请求后端接口失败', err);
        // wx.showToast({
        //   title: '请求后端接口失败'+err,
        //   icon:'none'
        // })
        options.fail(err)
      },
    });
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'token',
      success (res) {
        // console.info("获取token：：", res)
        // console.log(res?.data)
        resolve(res?.data)
      },
      fail(err){
        // reject(err)
        resolve("")
      }
    })
  })
}

// export const getUserProfile = () => {
//   // TODO: 1. 先获取user, 如果已经存在就直接返回本地存储的数据，否则重新调用微信原生接口获取
  
//   return new Promise((resolve, _) => {
//     console.info("获取用户信息")
//     wx.getStorage({
//       key: 'user',
//       success (res) {
//         console.log(res?.data)
//         console.info("从本地存储中获取用户信息：", res.userInfo)
//         resolve(res?.data)
//       },
//       fail(err){
//         console.info("获取用户信息-1")
//         wx.getUserProfile({
//           desc: '获取用户信息',
//           success: (res) => {
//             console.info("获取成功：：", res)
//             wx.setStorage({
//               key: "user",
//               data: res.userInfo
//             })
//             console.info("第一次获取用户信息：", res.userInfo)
//             resolve(res.userInfo)
//           },
//           fail: (err) => {
//             console.info("获取失败：：：")
//             _(err)
//           }
//         })
//       }
//     })
//   })
// }


// export default http;