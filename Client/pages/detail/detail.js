// pages/detail/detail.js
var app = getApp()
Page({
  data: {
    username: '',
    gender: 'female',
    usernick: 'xiaoyuer',
    imgUrl: "",
    contact:"xxx@xxx.xxx",
    userArray:[]
  },

  onShow:function(){
    this.setData({
      username:app.globalData.userId
    })
    var that = this
    wx.request({
      method: 'get',
      url: 'http://localhost:8100/userDownload',
      data: {
        username:that.data.username
      },
      header: {  //请求头
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res)
        that.setData({
          userArray:res.data
        })
        that.setData({
          gender: that.data.userArray[0].gender,
          usernick: that.data.userArray[0].usernick,
          contact: that.data.userArray[0].contact
        })
      }
    })
  },

  changeAvatar: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("图片路径是: "+tempFilePaths)
        this.setData({
          imgUrl: tempFilePaths
        })
      }
    })
  },

  jump: function(e) {
    // 跳转到“个人资料修改页”
    wx.navigateTo({
      // 为了避免用户名中的特殊字符破坏字符串结构，使用encodeURIComponent()编码
      url: '/pages/modify/modify?usernick=' + encodeURIComponent(this.data.usernick) + '&gender=' + encodeURIComponent(this.data.gender) + '&contact=' + encodeURIComponent(this.data.contact)
    })
  }
})