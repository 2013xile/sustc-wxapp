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
  var loginUrl = 'https://cas.sustc.edu.cn/cas/login?service=http%3A%2F%2Fjwxt.sustc.edu.cn%2Fjsxsd%2F'
  newUser.login(loginUrl).then((response) => {
    res.send(response)
  })
})

app.listen(3000, function () {
  console.log('Hello')
})