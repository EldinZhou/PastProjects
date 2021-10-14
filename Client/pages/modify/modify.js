// pages/modify/modify.js
const app = getApp()

Page({
  data: {
    username: '',
    usernick: '',
    gender: 'male',
    contact:""
  },
  onLoad: function(options) {
    this.setData({
      // 收到数据后使用decodeURIComponent()解码
      username: app.globalData.userId,
      usernick: decodeURIComponent(options.usernick),
      gender: decodeURIComponent(options.gender),
      contact: decodeURIComponent(options.contact)
    })
  },
  formSubmit: function(e) {
    // 表单返回的所有数据
    var formData = e.detail.value
    // 获取上一个页面的对象
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    // 调用上一个页面的 setData() 方法，把数据存到上一个页面中去
    prevPage.setData({
      username: app.globalData.userId,
      usernick: formData.usernick,
      gender: formData.gender,
      contact: formData.contact
    })
    wx.request({
      method: 'post',
      url: 'http://localhost:8100/userUpload',
      data: prevPage.data,
      header: {  //请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
      }
    })
    // 返回到上一个页面
    wx.navigateBack()
  }
})