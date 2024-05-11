// pages/custom/feedback/feedback.js
const app = getApp()
import { http } from "../../../utils/http"
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
      inputCity:'',
      inputCounty:'',
      inputAddress:'',
      inputTextarea:'',
      uploadedImagesCount:0,
      pictureUrl:[],
      visible: false,
      defaultValue:'0',
      selectedValue:1,
      phoneError: false,
      provinceText: '',
      historyText:'',
      storeText:'',
      provinceVisible: false,
      historyVisible: false,
      storeVisible: false,
      provinceValue: [],
      historyValue: [],
      storeValue:[],
      cityText: '',
      cityVisible: false,
      cityValue: [],
      cityList: [],
      countyList: [],
      countyText: '',
      countyVisible: false,
      provinceList: [],
      historyList: [],
      districtText:'',
      districtVisible: false,
      districtValue: [],
      districtList:[],
      orderNeoId:"",
      ServiceCodeList:[],
      province : "",
      city : "",
      district : "",
      store:"",
      storeList:[],
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
      var that = this;
      http({
        url: app.loginHost.apiUrl+'api/order/list',
        data: 
        {
          "deliveryDate": "",
          "status__c": "",
          "orderType__c": "",
          "transactionDate": "",
          "po": "",
          "accountName": "",
          "accountPhone": "",
        },
        method: 'POST',
        success: (res) => {
          if(res.data.code === "success"){
            let response = res.data.data
            let po = options.po; //订单号传值
            if(po){
              let targetItem  = po ? response.find(item => item.po === po) : null //根据订单传值匹配的数据
              let historyListMap = po ? response.filter(item => item.po).map(item => {
                return {
                  label: item.po,
                  value: item.id,
                };
              }) : null;
              that.setData({
                ServiceCodeList:response,
                historyList: historyListMap,
                historyVisible:false,
                historyValue:po,
                historyText:po,
                inputName:targetItem.accountName__C ? targetItem.accountName__C : null,//客户名称
                inputPhone:targetItem.contactTel ? targetItem.contactTel :null,//客户电话
                // provinceValue:targetItem.province__c ? province__c : null, //省份
                // cityValue: targetItem.city__c ? city__c :null, //城市
                // districtValue: targetItem.districtAndCounty__c ? districtAndCounty__c :null  //区县
              });
            }else{
              let historyListMap = response.map(item => {
                return {
                  label: item.po,
                  value: item.id,
                };
              });
              that.setData({
                historyList: historyListMap,
                ServiceCodeList:response,
              })
            }
          }else{
            wx.showToast({
              title: '请求失败，请稍后重试',
              icon: 'none',
              duration: 2000
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

      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          const { latitude, longitude } = res;
          // 调用逆地理编码接口，将经纬度转换为地点信息
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              location: `${latitude},${longitude}`,
              key: app.globalData.mapKey, // 替换为您自己的腾讯地图API密钥
              get_poi: 1 // 请求返回附近的 POI 信息
            },
            success(resp) {
              let address = resp?.data?.result?.address || "";
              if(resp.data && resp.data.result && resp.data.result.pois && resp.data.result.pois.length > 0)
              {
                address = resp.data.result.pois[0]["address"];
              }
              let district = resp?.data?.result?.address_component?.city + resp?.data?.result?.address_component?.district;
              that.setData({
                location: {
                  latitude: latitude,
                  longitude: longitude,
                  address: address,
                  district: district || "",
                  markerLongitude: longitude,
                  markerLatitude: latitude,
                },
                "marker.latitude": latitude,
                "marker.longitude": longitude,
                "marker.title": address,
                "inputAddress":resp?.data?.result?.address_component?.street_number,
                province:resp?.data?.result?.address_component?.province,
                city: resp?.data?.result?.address_component?.city,
                district: resp?.data?.result?.address_component?.district,
                inputAddress:resp?.data?.result?.address_component?.street_number
              });
            },
            fail(err) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: err?.errMsg || "地址解析错误!",
              });
              console.error('逆地理编码失败', err);
            }
          });
          that.fetchProvince()
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
    fetchProvince:function(){
      var that = this;
      ////省份
      http({
        url: app.loginHost.apiUrl+'api/common/pick-list?apiName=province',
        method: 'GET',
        success: function(res) {
          if(res.data.code == 'success'){
            let dataList = res.data.data
            that.setData({
              provinceList: dataList.map(val => {return {label: val["optionLabel"], value: val["optionCode"]}}),
            })
          }
        },
        fail: function(err) {
          console.error('请求失败', err);
        }
      });
      ///城市
      http({
        url: app.loginHost.apiUrl+'api/common/pick-list?apiName=city',
        method: 'GET',
        success: function(res) {
          if(res.data.code == 'success'){
            let dataList = res.data.data
            that.setData({
              cityList: dataList.map(val => {return {label: val["optionLabel"], value: val["optionCode"]}}),
            })
          }
        },
        fail: function(err) {
          console.error('请求失败', err);
        }
      });
      ////区县
      http({
        url: app.loginHost.apiUrl+'api/common/pick-list?apiName=district',
        method: 'GET',
        success: function(res) {
          if(res.data.code == 'success'){
            let dataList = res.data.data
            that.setData({
              districtList: dataList.map(val => {return {label: val["optionLabel"], value: val["optionCode"]}})
            })
          }
        },
        fail: function(err) {
          console.error('请求失败', err);
        }
      });
      setTimeout(function() {
        that.matchValueByProvince();
      }, 1000);
    },
    matchValueByProvince(){
      var that = this;
      const provinceItem = that.data.provinceList.find(item => item.label === that?.data?.province);//省
      const cityItem = that.data.cityList.find(item => item.label === that?.data?.city);//市
      const districtItem = that.data.districtList.find(item => item.label === that?.data?.district);//区
      //根据定位加载专卖店信息
      http({
        url: app.loginHost.apiUrl+`api/common/store?province=${provinceItem.label}&city=${cityItem.label}`,
        // url: app.loginHost.apiUrl+`api/common/store?province=广东省&city=惠州市`,
        method: 'GET',
        success: function(res) {
          if(res?.data?.code == 'success'){
            let storeItem = res?.data?.data
            that.setData({
              storeList:storeItem.map(val => {return {
                label: val["name"],
                value: val["neoId"],
                id:val["id"],
                storeNo:val["storeNo"],
                neoId:val["neoId"],
                phone:val["phone"]
              }})
            })
          }
        },
        fail: function(err) {
          console.error('请求失败', err);
        }
      });
      that.setData({
        provinceValue:provinceItem.value?provinceItem.value:"",
        provinceText:provinceItem.label?provinceItem.label:"",
        cityValue:cityItem.value?cityItem.value:"",
        cityText:cityItem.label?cityItem.label:"",
        districtValue:districtItem.value?districtItem.value:"",
        districtText:districtItem.label?districtItem.label:"",
        inputProvince:provinceItem.value?provinceItem.value:"",
        inputCity:cityItem.value?cityItem.value:"",
        inputCounty:districtItem.value?districtItem.value:"",
      })
    },

    inputName(e){
      this.setData({
        inputName:e.detail.value,
        inputNameBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputPhone(e){
      //联系方式
      const { phoneError } = this.data;
      const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
      if (phoneError === isPhoneNumber){
        this.setData({
          inputPhone:e.detail.value,
          phoneError: !isPhoneNumber,
          inputPhoneBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
        });
      }
    },
    inputAddress(e){
      //详细地址
      this.setData({
        inputAddress:e.detail.value,
        inputAddressBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
    },
    inputTextarea(e){
      this.setData({
        inputTextarea:e.detail.value,
        inputTextareaBorderStyle: e.detail.value ? "": "border: 0.5px solid rgb(235, 115, 115);"
      });
    },
    radioChange(e){
      this.setData({
        selectedValue:e.detail.value
      });
    },
    handleTap(){
      let hasEmptyField = false; // 用于记录是否存在未填写的字段
      const inputFields = ['inputName', 'inputPhone', 'inputProvince', 'inputCounty', 'inputAddress', 'inputTextarea','inputCity'];

      inputFields.forEach(field => {
        const borderStyle = field === 'inputTextarea' ? "border: 0.5px solid rgb(235, 115, 115);" : "border-bottom: 0.5px solid rgb(235, 115, 115);";
        if (!this.data[field]) {
          this.setData({
            [`${field}BorderStyle`]: borderStyle,
          });
          hasEmptyField = true; // 存在未填写字段，将标记设为 true
        } else {
          this.setData({
            [`${field}BorderStyle`]: "",
          });
        }
      });
    
      if (!hasEmptyField) {
        if(this.data.originFiles.length >0){
          this.handleUploadSuccess();
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        }else{
          this.showSuccessMessage();
          this.resetting();
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        }
      } else {
        console.log("存在未填写的字段");
      }
    },
    //上传图片接口
    uploadImage(filePath){
      var that = this;
      wx.uploadFile({
        url: app.loginHost.apiUrl+'api/common/file/upload',
        filePath: filePath.url+"",
        name:"files",
        formData:{
          files:[filePath]
        },
        success: function(res) {
          // 上传成功
          var dataList = JSON.parse(res.data);
          console.log("dataList",dataList)
          if(dataList.code =="success"){
            console.log("fileId",dataList.data[0].fileId)
            let imageUrl = dataList.data[0].fileId;
            console.log("imageUrl",imageUrl)
            let currentPictureUrl = that.data.pictureUrl.slice();
            console.log("currentPictureUrl",currentPictureUrl)
            currentPictureUrl = currentPictureUrl.concat(imageUrl);
            that.setData({
              pictureUrl: currentPictureUrl, // 更新数据
            });
            console.log("currentPictureUrl",currentPictureUrl)
          }else{
            wx.showToast({
              title: '图片上传失败',
              icon:'none',
              duration:2000
            })
          }
        },
        fail: function(res) {
          // 上传失败
          console.log('上传失败：', res);
        },
      })
    },
    //处理多张图片返回
    handleUploadSuccess(){
      if (this.data.pictureUrl.length === this.data.originFiles.length){
        this.showSuccessMessage();
        this.resetting();
      }else{
        wx.showToast({
          title: '图片上传中，请稍后在提交',
          icon: 'none',
          duration: 2000
        });
      }
    },
    showSuccessMessage() {
      let targetItem  = this.data.ServiceCodeList.find(item => item.po === this.data.historyText)
      http({
        url: app.loginHost.apiUrl+'api/service-case',
        data: 
        {
          "province":this.data.provinceValue,
          "city":this.data.cityValue,
          "district":this.data.districtValue,
          "phone": this.data.inputPhone,
          "questionType": this.data.selectedValue,
          "problemDescription": this.data.inputTextarea,
          "caseAccountName": this.data.inputName,
          "orderNeoId": targetItem == null ? null : targetItem.neoid,
          "complaintSourceC":3,
          // "caseStatus": "2",
          "clientCaseStatusC":"1",
          "picture": this.data.pictureUrl,
          "customerName":this.data.inputName,
          "caseSource":12,
          // "video": "",
          // "lockStatus": "1",
          "orderType":targetItem == null ? "" : targetItem.orderType,
          "distributorNeoId":targetItem == null ? "" : targetItem.distributorNeoId,
          "distributorName": targetItem == null ? "" : targetItem.distributorName,
          "storeNeoId":this.data.storeValue ? this.data.storeValue : null,
          "storeName": this.data.storeText ? this.data.storeText : null,
          "address":this.data.inputAddress
        },
        method: 'POST',
        success: (res) => {
          if(res.data.code =='success'){
            console.log("this.data.pictureUrl",this.data.pictureUrl)
            Message.success({
              context: this,
              offset: [20, 32],
              duration: 5000,
              content: '问题反馈提交成功',
            });
          }else{
            wx.showToast({
              title: '提交失败:'+res.message,
              icon:'none',
              duration:2000
            })
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
    },
    handleClick() {
      this.setData({ visible: true });
    },
    handleOverlayClick(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    handleSuccess(e) {
      const { files } = e.detail;
      const { originFiles, maxFiles } = this.data;
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
      // for(var i=0;i<this.data.originFiles.length;i++){
      //   this.uploadImage(this.data.originFiles[i])
      // }
      this.uploadImage(this.data.originFiles[this.data.originFiles.length-1])
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
    onPickerChange(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        provinceVisible: false,
        provinceValue: value[0],
        provinceText: label[0],
        inputProvince:value[0],
        cityValue: [],
        cityText: '',
        districtValue: [],
        districtText: '',
        'mainForm.province':value[0],
        'mainForm.city': "",
        'mainForm.district': "",
      });
    },
    //选择历史订单-取消
    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    //选择历史订单-确认
    onHistoryChange(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      let targetItem  = this.data.ServiceCodeList.find(item => item.id === value[0])
      // console.log("eeeeeeeeee",targetItem)
      this.setData({
        orderNeoId:"",
        historyVisible: false,
        historyValue: value[0],
        historyText: label[0],
        inputName:targetItem.accountName__C ? targetItem.accountName__C : null,//客户名称
        inputPhone:targetItem.contactTel ? targetItem.contactTel :null,//客户电话
        // provinceValue:targetItem.province__c ? province__c : null, //省份
        // cityValue: targetItem.city__c ? city__c :null, //城市
        // districtValue: targetItem.districtAndCounty__c ? districtAndCounty__c :null  //区县
      });
    },
    onStoreChange(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        orderNeoId:"",
        storeVisible: false,
        storeValue: value[0],
        storeText: label[0]
      });
    },

    onProvincePicker() {
      this.setData({ provinceVisible: true });
    },
    onHistoryPicker() {
      this.setData({ historyVisible: true });
    },

    onStorePicker() {
      this.setData({ storeVisible: true });
    },

    onPickerChange2(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        cityVisible: false,
        cityValue: value[0],
        cityText: label[0],
        inputCity:value[0],
        districtValue: "",
        districtText: "",
        'mainForm.city': value[0],
        'mainForm.district': "",
      });
    },

    onPickerCancel2(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },

    onPickerCancel2(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    onCityPicker() {
      this.setData({ cityVisible: true });
    },
    onCountyPicker() {
      this.setData({ countyVisible: true });
    },
    onPickerChange3(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        districtVisible: false,
        districtValue: value[0],
        districtText: label[0],
        inputCounty:value[0],
        'mainForm.district': value[0],
      });
    },

    onDistrictPicker() {
      this.setData({ districtVisible: true });
    },

    onPickerCancel3(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },


    onPickerCancel3(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    resetting(){
      this.setData({
        inputName:'',
        inputPhone:'',
        inputProvince:'',
        inputCounty:'',
        inputAddress:'',
        inputTextarea:'',
        originFiles:[],
        uploadedImagesCount:0
      });
    }
})