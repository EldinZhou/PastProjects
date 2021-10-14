// pages/home/home.js
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'G5BBZ-MMOEJ-LNPFG-F7JWO-YVAI3-XTB3W' // 必填
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[
      {
        "category_id": "1",
        "title": "Take-out",
        "icon": "/images/category/take-out.png",
        "url": "../take-out/take-out"
      },
      {
        "category_id": "2",
        "title": "Expressage",
        "icon": "/images/category/expressage.png",
        "url": "../expressage/expressage"
      },
      {
        "category_id": "3",
        "title": "Canteen",
        "icon": "/images/category/canteen.png",
        "url": "../canteen/canteen"
      },
      {
        "category_id": "4",
        "title": "Commodity",
        "icon": "/images/category/store.png",
        "url": "../commodity/commodity"
      }
    ],
    markAddr:"Positioning...",
    lng:0.0,
    lat:0.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(app.globalData.currentAddress!=null){
      this.setData({
        markAddr:app.globalData.currentAddrName
      })
      console.log("用户定位: "+this.data.markAddr)
    }
    else{
      wx.getLocation({
        type: "gcj02",
        success (res) {
          that.setData({
            lat:res.latitude,
            lng:res.longitude
          })
          var location = res.latitude.toString()+','+res.longitude.toString()
          app.globalData.currentLngLat = res.longitude.toString()+','+res.latitude.toString()
          console.log("经纬度版本: "+app.globalData.currentLngLat)
          console.log("自动定位: "+location)
          qqmapsdk.reverseGeocoder({
            location:location,
            success:function(res){
              
              that.setData({
                markAddr:res.result.address
              })
              console.log("自动定位: "+that.data.markAddr)
              app.globalData.currentAddrName = that.data.markAddr
            }
          })
        }
      })
    }
    wx.request({
      method: 'get',
      url: 'http://localhost:8100/usernickGet',
      data: {
        username:app.globalData.userId
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res)
        var tempArr = res.data
        app.globalData.usernick = tempArr[0].usernick
        console.log("用户名昵称为: "+app.globalData.usernick)
      }
    })
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
    console.log("****************HomePage******************")
    console.log(app.globalData.taskListGlobal)
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

  }
})