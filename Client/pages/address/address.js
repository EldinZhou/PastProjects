// index.js
// 获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk = new QQMapWX({
      key: 'G5BBZ-MMOEJ-LNPFG-F7JWO-YVAI3-XTB3W' // 必填
})

Page({
  data: {
    jingdu:"",
    weidu:"",
    address:"",
    name:"",
    start:'',
    dest:'',
    distance:0.0,
    startCor:"",
    markAddr:"Positioning..."
  },

  // 事件处理函数
  getLocation:function(e){
    var that = this
    wx.getLocation({
      type: "gcj02",
      success (res) {
        that.setData({
          weidu:res.latitude,
          jingdu:res.longitude
        })
      }
    })
  },
  openLocation:function(e){
    var that = this
    wx.openLocation({
      latitude: Number(that.data.weidu),
      longitude: Number(that.data.jingdu),
    })
  },
  chooseLocation:function(e){
    var that = this
    wx.chooseLocation({
      success:function(res){
        that.setData({
          jingdu:res.longitude,
          weidu:res.latitude,
          address:res.address,
          name:res.name,
          startCor:res.longitude.toString()+","+res.latitude.toString()
        })
        app.globalData.currentAddress=that.data.address
        app.globalData.currentAddrName=that.data.name
        app.globalData.currentLngLat=that.data.startCor
        console.log("用户手动定位的经纬度: "+app.globalData.currentLngLat)
        if(app.globalData.currentAddress!=null){
          that.setData({
            markAddr:app.globalData.currentAddrName
          })
        }
        console.log(that.data.startCor)
      }
    })
  },

  onLoad() {

  },

  backTo: function(e){
    wx.switchTab({
      url: '../home/home',
    })
  },

  formSubmit: function(e){
    var startStr = this.data.startCor
    var endStr = e.detail.value.end
    let startLng = Number((startStr || "").split(",")[0])
    let startLat = Number((startStr || "").split(",")[1])
    let endLng = Number((endStr || "").split(",")[0])
    let endLat = Number((endStr || "").split(",")[1])

    let dis = 6371004*Math.acos(1-(Math.pow((Math.sin((90-startLat)*Math.PI/180)*Math.cos(startLng*Math.PI/180)-Math.sin((90-endLat)*Math.PI/180)*Math.cos(endLng*Math.PI/180)),2)
    +Math.pow((Math.sin((90-startLat)*Math.PI/180)*Math.sin(startLng*Math.PI/180)-Math.sin((90-endLat)*Math.PI/180)*Math.sin(endLng*Math.PI/180)),2)
    +Math.pow((Math.cos((90-startLat)*Math.PI/180)-Math.cos((90-endLat)*Math.PI/180)),2))/2)
    
    this.setData({
      distance: dis
    })
    console.log(this.data.distance)
  }

})
