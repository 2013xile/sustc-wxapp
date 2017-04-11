var app = getApp()
Page({
  data: {
  },
  //事件处理函数
  login: function (e) {
    wx.setStorageSync('LoginSessionKey', 'test')
    wx.setStorageSync('username', e.detail.value.username)
    wx.setStorageSync('password', e.detail.value.password)
    wx.redirectTo({ url: '../index/index' })
  },
  onLoad: function () {
    if (wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../index/index'})
    }
  }
})
