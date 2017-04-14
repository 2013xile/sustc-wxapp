//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tmpl: {
      load: 'loading'
    },
    GPA: '',
    terms: [],
    i: '0',
    scoreTable: []
  },
  //事件处理函数
  onLoad: function () {
    if (!wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../login/login'})
    } else {
      wx.request({
        url: 'http://localhost:3000/score',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password')
        },
        method: 'POST', 
        success: (res) => {
          this.setData({
            tmpl: {
              load: true
            },
            scoreTable: res.data
          })
          //储存学期
          var termid = ''
          var terms = []
          for(var i = 0; i < this.data.scoreTable.length; i++) {
            var term = this.data.scoreTable[i].term
            if (term !== termid) {
              termid = term
              terms.push(termid)
            }
          }
          this.setData({
            terms: terms
          })
          //计算GPA
          this.calcGPA()
        },
        fail: (res) => {
          this.setData({
            tmpl: {
              load: false
            }
          })
        }
      })
    }
  },
  calcGPA: function () {
    var gpa = 0;
    var score = 0;
    var totalWeight = 0;
    this.data.scoreTable.forEach((item, index) => {
      if (item.term === this.data.terms[this.data.i]) {
        var weight = parseInt(item.weight)
        switch(item.level){
          case 'A+':
            score += 4.00 * weight
            break
          case 'A':
            score += 3.94 * weight
            break
          case 'A-':
            score += 3.85 * weight
            break;
          case 'B+':
            score += 3.73 * weight
            break;
          case 'B':
            score += 3.55 * weight
            break;
          case 'B-':
            score += 3.32 * weight
            break;
          case 'C+':
            score += 3.09 * weight
            break;
          case 'C':
            score += 2.78 * weight
            break;
          case 'C-':
            score += 2.42 * weight
            break;
          case 'D+':
            score += 2.08 * weight
            break;
          case 'D':
            score += 1.63 * weight
            break;
          case 'D-':
            score += 1.15 * weight
            break;
          case 'F':
            score += 0 * weight
            break;
        }
        totalWeight += weight
      }
    })
    gpa = score / totalWeight
    this.setData({
      GPA: gpa.toFixed(2)
    })
  },
  pickTerm: function (e) {
    this.setData({
      i: e.detail.value
    })
    this.calcGPA()
  }
})
