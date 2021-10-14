// let coors;
// // 引入SDK核心类
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var app = getApp()

// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: 'G5BBZ-MMOEJ-LNPFG-F7JWO-YVAI3-XTB3W'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openNav: true,
    disValue: 0,
    tagValue: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let _page = this;

    wx.request({
      method: 'get',
      url: 'http://localhost:8100/statusTransQuery',
      data: {
        selectedTaskID:app.globalData.tempTransID
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
        var tagArr = res.data
        var tagStr = tagArr[0].status
        if(tagStr=='1'){
          _page.setData({
            tagValue:true
          })
        }
      }
    })

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        _page.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 10
        });
      }
    })
    wx.clearStorageSync('latlngstart');
    wx.clearStorageSync('latlngend');
    console.log(app.globalData.currentLngLat)
    
    this.setData({
      disValue:this.calDistance()
    })
    this.getStart()
    this.getEnd()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 起点
   */
  getStart() {
    let _page = this;


  /**
     * 
     */
    qqmapsdk.getSuggestion({
      keyword: app.globalData.navStart,
      success: function (res) {
        //console.log(e.detail.value)
        let lat = res.data[0].location.lat;
        let lng = res.data[0].location.lng;

        wx.setStorageSync('latlngstart', {
          lat: lat,
          lng: lng
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });


    /**
     * 修改为（2018-09-19）
     */

    qqmapsdk.geocoder({
      //address: res.address,
      success: function(res) {
        let lat = res.result.location.lat;
        let lng = res.result.location.lng;
        wx.setStorageSync('latlngendSend', {
          lat: lat,
          lng: lng
        });

        // 起点经纬度
        let latStart = wx.getStorageSync('latlngstartSend').lat;
        let lngStart = wx.getStorageSync('latlngstartSend').lng;

        // 终点经纬度
        let latEnd = wx.getStorageSync('latlngendSend').lat;
        let lngEnd = wx.getStorageSync('latlngendSend').lng;

        qqmapsdk.calculateDistance({
          to: [{
            latitude: latStart,
            longitude: lngStart
          }, {
            latitude: latEnd,
            longitude: lngEnd
          }],
          success: function(res) {
            console.log(res, '两点之间的距离(代送)：', res.result.elements[1].distance);
            wx.setStorageSync('kmSend', res.result.elements[1].distance + "");
          }
        });
      }
    });

  },

  /**
   * 终点
   */
  getEnd() {
    let _page = this;
    // 输入地点获取经纬度,我取得是数据的第一条数据.
    qqmapsdk.getSuggestion({
      keyword: app.globalData.navEnd,//"辽宁省葫芦岛市博禹石油",
      success: function (res) {
        let lat = res.data[0].location.lat;
        let lng = res.data[0].location.lng;

        wx.setStorageSync('latlngend', {
          lat: lat,
          lng: lng
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    // 如果输入地点为空：则不规划路线
    /*
    if (e.detail.value == '') {
      _page.setData({
        openNav: true,
        resultDistance: ''
      });
    } else {
      _page.setData({
        openNav: false
      });
    }*/
  },
  //事件回调函数
  driving: function () {

    let _page = this;

    // 起点经纬度
    let latStart = wx.getStorageSync('latlngstart').lat;
    let lngStart = wx.getStorageSync('latlngstart').lng;

    // 终点经纬度
    let latEnd = wx.getStorageSync('latlngend').lat;
    let lngEnd = wx.getStorageSync('latlngend').lng;


    _page.setData({
      latitude: latStart,
      longitude: lngStart,
      scale: 16,
      markers: [{
        id: 0,
        latitude: latStart,
        longitude: lngStart,
        // 起点图标
        iconPath: '../../image/location.png'
      },
      {
        id: 1,
        latitude: latEnd,
        longitude: lngEnd,
        // 终点图标
        iconPath: '../../image/location.png'
      },
      ]
    });
    ``

    /**
     * 获取两点的距离
     */
    qqmapsdk.calculateDistance({
      to: [{
        latitude: latStart,
        longitude: lngStart
      }, {
        latitude: latEnd,
        longitude: lngEnd
      }],
      success: function (res) {
        console.log(res, '两点之间的距离：', res.result.elements[1].distance);
        _page.setData({
          resultDistance: res.result.elements[1].distance + '米'
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

    //网络请求设置
    let opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: `https://apis.map.qq.com/ws/direction/v1/driving/?from=${latStart},${lngStart}&to=${latEnd},${lngEnd}&key=${qqmapsdk.key}`,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        let ret = res.data
        if (ret.status != 0) return; //服务异常处理
        let coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let kr = 1000000;
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来
        _page.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      }
    };
    wx.request(opt);
  },
  calDistance: function(){
    var startStr = app.globalData.currentLngLat
    var endStr = app.globalData.navLngLat
    let startLng = Number((startStr || "").split(",")[0])
    let startLat = Number((startStr || "").split(",")[1])
    let endLng = Number((endStr || "").split(",")[0])
    let endLat = Number((endStr || "").split(",")[1])

    let dis = 6371004*Math.acos(1-(Math.pow((Math.sin((90-startLat)*Math.PI/180)*Math.cos(startLng*Math.PI/180)-Math.sin((90-endLat)*Math.PI/180)*Math.cos(endLng*Math.PI/180)),2)
    +Math.pow((Math.sin((90-startLat)*Math.PI/180)*Math.sin(startLng*Math.PI/180)-Math.sin((90-endLat)*Math.PI/180)*Math.sin(endLng*Math.PI/180)),2)
    +Math.pow((Math.cos((90-startLat)*Math.PI/180)-Math.cos((90-endLat)*Math.PI/180)),2))/2)
    
    var disInteger = Number(dis).toFixed(0)
    console.log(disInteger)//this.data.distance
	  return disInteger
  },

  confirmOrder:function(e){
    app.globalData.addAmount = app.globalData.addTempAmount
    var that = this
    wx.request({
      method: 'get',
      url: 'http://localhost:8100/statusTransChange',
      data: {
        selectedTaskID:app.globalData.tempTransID
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
        that.setData({
          tagValue:true
        })
      }
    })
  }
})