// logs.js
const util = require('../../utils/util.js')
const app = getApp()
const md5 = require("../../utils/md5.js")
Page({
  data: {
    username:"",
    password:""
  },
  onLoad() {
    
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

  onClick:function(){
    if((this.data.username=="")&&(this.data.password=="")){
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
      var that = this
      console.log(md5.hexMD5(that.data.password))
      app.globalData.userId = that.data.username
      console.log(app.globalData.userId)
      wx.request({
        method: 'get',
        url: 'http://localhost:8100/userLogin',
        data: {
          username:that.data.username,
          password:md5.hexMD5(that.data.password),
        },
        header: {  //请求头
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.length==0){
            wx.showModal({
              title: 'Reminder',
              content: 'You have typed in the wrong username or password!',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              }
            })
            that.setData({
              username:"",
              password:""
            })
          }
          else{
            console.log("登录成功！")
            wx.switchTab({
            url: "../home/home",
            })
          }
      }
    })
    }
  },

  backTo:function(){
    wx.navigateBack({
      delta: 1,
    })
  }
})
