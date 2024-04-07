// pages/custom/feedback/feedback.js
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
import utilTools from "../../../utils/utilTools";
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
      visible: false,
      defaultValue:'0',
      selectedValue:'',
      phoneError: false,
      provinceText: '',
      historyText:'',
      provinceVisible: false,
      historyVisible: false,
      provinceValue: [],
      historyValue: [],
      cityText: '',
      cityVisible: false,
      cityValue: [],
      cityList: [],
      countyList: [],
      countyText: '',
      countyVisible: false,
      countyValue: [],
      provinceList: utilTools.getProvinceList(),
      historyList: [],
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
      wx.request({
        url: app.loginHost.apiUrl+'api/order/list',
        data: 
        {
          "deliveryDate": "",
          "status__c": "",
          "orderType__c": "",
          "transactionDate": "",
          "po": "",
          "accountName": "",
          "accountPhone": ""
        },
        method: 'POST',
        success: (res) => {
          let response = res.data.data
          console.log("response",res)
          let po = options.po; //订单号传值
          let historyListMap = response.filter(item => item.status__c != 2).map(item => {
            return {
              label: item.po,
              value: item.po
            };
          });
          this.setData({
            historyList: historyListMap
          });
          if(po){
            this.setData({
              historyVisible: false,
              historyValue: po,
              historyText: po
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
        inputNameBorderStyle: e.detail.value ? "": "border-bottom: 0.5px solid rgb(235, 115, 115);"
      });
      console.log(e.detail.value)
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
        this.showSuccessMessage();
        this.resetting();
      } else {
        console.log("存在未填写的字段");
      }
    },    
    showSuccessMessage() {
      wx.request({
        url: app.loginHost.apiUrl+'api/service-case',
        data: 
        {
          "phone": this.data.inputPhone,
          "questionType": this.data.selectedValue,
          "problemDescription": this.data.inputTextarea,
          "name": this.data.inputName,
          "caseNo": this.data.historyText,
          "caseAccountId": this.data.inputName,
          "caseStatus": "2",
          "picture": "",
          "video": "",
          "lockStatus": "1"
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          Message.success({
            context: this,
            offset: [20, 32],
            duration: 5000,
            content: '问题反馈提交成功',
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
    onPickerChange(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      let cityList = utilTools.getCityList(value)
      this.setData({
        provinceVisible: false,
        provinceValue: value[0],
        provinceText: label[0],
        inputProvince:label[0],
        cityValue: [],
        cityText: '',
        cityList: cityList,
        countyValue: "",
        countyText: "",
        'mainForm.province':label[0],
        'mainForm.city': "",
        'mainForm.country': "",
        inputProvinceBorderStyle:""
      });
    },
    onHistoryChange(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        historyVisible: false,
        historyValue: value[0],
        historyText: label[0]
      });
    },
    onProvincePicker() {
      this.setData({ provinceVisible: true });
    },
    onHistoryPicker() {
      this.setData({ historyVisible: true });
    },
    onPickerChange2(e) {
      let value = e.detail.value;
      let label = e.detail.label;
      this.setData({
        cityVisible: false,
        cityValue: value[0],
        cityText: label[0],
        inputCity:label[0],
        countyValue: "",
        countyText: "",
        countyList: utilTools.getCountyList(value[0]),
        'mainForm.city': label[0],
        'mainForm.country': "",
        inputCityBorderStyle:""
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
        countyVisible: false,
        countyValue: value[0],
        countyText: label[0],
        inputCounty:label[0],
        'mainForm.country': label[0],
        inputCountyBorderStyle:""
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
      });
    }
})