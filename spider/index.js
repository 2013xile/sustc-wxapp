var express = require('express')
var bodyParser = require('body-parser')
var cheerio = require('cheerio')
var User = require('./Model/User')
var app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/login', function (req, res) {
  var newUser = new User(req.body)
  var loginUrl = 'https://cas.sustc.edu.cn/cas/login'
  newUser.login(loginUrl).then((response) => {
    var $ = cheerio.load(response)
    var name = $('#msg p').text().split(',')[0]
    res.send(name)
  })
})

app.listen(3000, function () {
  console.log('Hello')
})