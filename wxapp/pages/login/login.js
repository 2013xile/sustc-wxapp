var app = getApp()
Page({
  data: {
    tmpl: {
      load: true
    },
    warn: ''
  },
  //事件处理函数
  login: function (e) {
    if (e.detail.value.username === '' || e.detail.value.password === '') {
      this.setData({
        warn: '学号或密码不能为空'
      })
      return
    } 
    this.setData({
      tmpl: {
        load: 'loading'
      }
    })
    wx.request({
      url: 'http://localhost:3000/',
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      method: 'POST', 
      success: (res) => {
        if (!res.data) {
          this.setData({
            tmpl: {
              load: true
            },
            warn: '学号或者密码错误'
          })
          return
        } else {
          wx.setStorageSync('LoginSessionKey', 'test')
          wx.setStorageSync('name', res.data)
          wx.setStorageSync('username', e.detail.value.username)
          wx.setStorageSync('password', e.detail.value.password)
          wx.redirectTo({ url: '../index/index' })
        }
      },
      fail: (res) => {
        this.setData({
          tmpl: {
            load: false
          }
        })
      }
    })
  },
  onLoad: function () {
    if (wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../index/index'})
    }
  }
})
