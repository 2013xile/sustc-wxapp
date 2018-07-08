//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    user: {
      name: '',
      id: ''
    },
    menu: [{
        name: '课程表',
        link: '../class/class'
      },
      {
        name: '成绩单',
        link: '../score/score'
      },
      {
        name: '关于 & 更新',
        link: '../about/about'
      }],
    msg: ''
  },
  //事件处理函数
  onLoad: function () {
    if (!wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../login/login'})
    } else {
      this.setData({
        user: {
          name: wx.getStorageSync('name'),
          id: wx.getStorageSync('username')
        }
      })
    }
  },
  logout: function () {
    wx.removeStorageSync('LoginSessionKey')
    wx.removeStorageSync('username')
    wx.removeStorageSync('password')
    wx.redirectTo({ url: '../login/login' })
  }
})
