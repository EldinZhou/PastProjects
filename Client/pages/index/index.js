// index.js
// 获取应用实例
const app = getApp()
const md5 = require("../../utils/md5.js")
Page({
  data:{
    username:"",
    password:"",
    usernick:"",
    gender:"",
    contact:"",
    platformCoins:100
  },

  register:function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  login:function(e){
    wx.navigateTo({
      url: '../logs/logs',
    })
  }
})
