// pages/register/register.js
const app = getApp()
const md5 = require("../../utils/md5.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    usernick:"",
    gender:"",
    contact:"",
    platformCoins:100,
    iosDialog1:false,
  },
  genderSelect:function(e){
    console.log(e.detail.value)
    this.setData({
      gender:e.detail.value
    })
  },

  inputHandler1: function(e){
    this.setData({
      username:e.detail.value
    })
  },
  
  inputHandler2: function(e){
    this.setData({
      password:e.detail.value
    })
  },

  inputHandler3: function(e){
    this.setData({
      usernick:e.detail.value
    })
  },
  
  inputHandler4: function(e){
    this.setData({
      contact:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClick:function(e){
    this.setData({
      iosDialog1:true
    })
  },

  cancel: function () {
    this.setData({
        iosDialog1: false
    })
  },

  confirm: function () {
    this.setData({
        iosDialog1: false
    })
    console.log("Confirm Page")
    this.checkEmpty()
  },
  openWarnToast: function() {
    this.setData({
        warnToast: true
    });
    setTimeout(() => {
        this.setData({
            hidewarnToast: true
        });
        setTimeout(() => {
            this.setData({
                warnToast: false,
                hidewarnToast: false,
            });
        }, 300);
    }, 3000);
  },
  checkEmpty:function(){
    if((this.data.username=="")&&(this.data.password=="")&&(this.data.usernick=="")&&(this.data.gender=="")&&(this.data.contact=="")){
      wx.showModal({
        title: 'Reminder',
        content: 'You cannot submit empty information to the backend server!',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      console.log(this.data)
      console.log("密码是如下:")
      console.log(md5.hexMD5(this.data.password))
      wx.navigateBack({
        delta: 1,
      })
      var that = this
      wx.request({
        method: 'get',
        url: 'http://localhost:8100/userRegister',
        data: {
          username:that.data.username,
          password:md5.hexMD5(that.data.password),
          usernick:that.data.usernick,
          gender:that.data.gender,
          contact:that.data.contact,
          platformCoins:100
        },
        header: {  //请求头
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          console.log(res)
      }
    })
    }
  }
})