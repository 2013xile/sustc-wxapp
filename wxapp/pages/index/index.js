//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    login: false
  },
  //事件处理函数
  login: function (e) {
    wx.request({
      url: 'http://localhost:3000/login',
      data: e.detail.value,
      method: 'POST', 
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onLoad: function () {
    this.setData({
      login: false
    })
  }
})
