var express = require('express')
var bodyParser = require('body-parser')
var cheerio = require('cheerio')
var User = require('./Model/User')
var app = express()

app.use(bodyParser.json())

app.post('/', function (req, res) {
  var newUser = new User(req.body)
  newUser.login().then((response) => {
    var $ = cheerio.load(response)
    var name = $('#msg p').text().split(',')[0]
    res.send(name)
  })
})

app.get('/login', function (req, res) {
  //get session
})

app.post('/class', function (req, res) {
  var newUser = new User(req.body)
  var loginUrl = 'https://cas.sustc.edu.cn/cas/login?service=http%3A%2F%2Fjwxt.sustc.edu.cn%2Fjsxsd%2Fxskb%2Fxskb_list.do'
  var target = {
    url: 'http://jwxt.sustc.edu.cn/jsxsd/xskb/xskb_list.do',
    method: 'GET',
    data: ''
  }
  newUser.login(loginUrl, target).then((response) => {
    var classTable = []
    var $ = cheerio.load(response)
    for (var i = 1; i <= 7; i++) {
      var reg = new RegExp('[A-Z0-9]{32}(\-' + i + '\-1){1}', 'g')
      var id = response.match(reg)
      for (var j = 0, k = 0; j < id.length; j++, k = k + 2) {
        var subject = ''
        var room = ''
        var classdetail = $('#' + id[k]).text()
        if (!classdetail) break
        if (classdetail !== ' ') {
          subject = classdetail.match(/[\D]+(\d{1}习题课)?/)[0]
          room = classdetail.match(/\){1}[^-]+/)[0].slice(1)
        }
        var classinfo = {
          subject: subject,
          room: room
        }
        console.log(classinfo.room)
        if (classTable[j] === undefined) classTable[j] = []
        classTable[j].push(classinfo)
        console.log(classTable)
      }
    }
    res.send(classTable)
  })
})

app.post('/score', function (req, res) {
  var newUser = new User(req.body)
  var loginUrl = 'https://cas.sustc.edu.cn/cas/login?service=http%3A%2F%2Fjwxt.sustc.edu.cn%2Fjsxsd%2Fkscj%2Fcjcx_list'
  var target = {
    url: 'http://jwxt.sustc.edu.cn/jsxsd/kscj/cjcx_list',
    method: 'GET',
    data: ''
  }
  newUser.login(loginUrl, target).then((response) => {
    var $ = cheerio.load(response)
    var rawData = []
    var data = []
    $('#dataList tr td').each(function(i, item) {
      rawData[i] = $(this).text()
    })
    for (var i = 0; i < rawData.length; i = i + 11) {
      var scoreInfo = {
        term: rawData[i + 1],
        subject: rawData[i + 3],
        level: rawData[i + 4].match(/[A-Z]{1}(\+|\-)?/)[0],
        weight: rawData[i + 5]
      }
      data.push(scoreInfo)
    }
    res.send(data)
  })
})

app.listen(3000)