// pages/person/person.js
var app = getApp()
Page({
  data:{
    platformCoins:100,
    username:"",
    iosDialog1:false
  },
  onShow:function(){
    var that = this
    wx.request({
      method: 'get',
      url: 'http://localhost:8100/coinInfo',
      data: {
        username:app.globalData.userId,
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
        var coinArray = res.data
        that.setData({
          platformCoins:coinArray[0].platformCoins
        })
      }
    })
  },
  info: function() {
    // 保留当前页面，点击页面左上角箭头，返回上一个页面
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  contact: function (e) {
    // 调用拨打电话API
    wx.makePhoneCall({
      phoneNumber: '400-321'   // 该电话号码为模拟数据
    })
  },
  recharge: function() {
    this.setData({
        iosDialog1: true
    });
  },
  confirm:function(){
    var amount = this.data.platformCoins+50
    this.setData({
      iosDialog1: false,
      platformCoins:amount
    });
    var that = this
    wx.request({
      method: 'get',
      url: 'http://localhost:8100/coinUpdate',
      data: {
        username:app.globalData.userId,
        platformCoins:that.data.platformCoins
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
      }
    })
  },
  cancel:function(){
    this.setData({
      iosDialog1: false
    });
  }
})