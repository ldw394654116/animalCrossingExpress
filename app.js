// 基础模块加载
const mysql = require('./mysql/main.js')
const express = require('express')
global.forbuy = mysql.forbuy
global.es = express()

// 各个功能模块加载
const fb = require('./forbuy/main.js')
const wx = require('./wx/index.js')

// 解析xml内容
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser)
global.es.use(bodyParser.xml({
  xmlParseOptions: {
    normalize: true,
    normalizeTag: true,
    explicitArray: false
  }
}))

//设置允许跨域访问该服务.
global.es.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})



global.es.get('/getUserInfo', (req, resp) => {
  fb.getUserInfo(req, resp)
})

global.es.post('/insertUserInfo', require('body-parser').json(), (req, resp) => {
  let obj = req.body
  fb.insertUserInfo(req, resp, obj)
})

global.es.get('/wx', (req, resp) => {
  wx.wx(req, resp)
})

global.es.post('/wx', (req, resp) => {
  const res = wx.wx(req, resp, 1)
  if (res) {
    wx.info(req, resp)
  }
})

global.es.listen(80, () => console.log('listen 80'))