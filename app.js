const express = require('express')
const es = express()
const fs = require('fs')
const mysql = require('mysql')

const db = mysql.createConnection({
  host: '111.229.158.205',
  port: '3306',
  user: 'root',
  password: '',
  database: 'express'
})

//设置允许跨域访问该服务.
es.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

es.get('/', (req, resp) => {
  let html = ``
  db.query('select * from user', (err, res) => {
    for(let i of res) {      
      html += `<h1>${i.id + '-' + i.name + i.tel + i.location}</h1>`
    }
    resp.send(`<div>` + html + `</div>`)
  })
})

es.get('/vega', (req, resp) => {
  db.query('select * from vega', (err, res) => {
    if (err) {
      resp.send('后台异常：' + err)
    } else {
      resp.send(res)
    }
  })
})

es.post('/vega', require('body-parser').json(), (req, res) => {
  let body = req.body
  db.query('insert into vega (value, area) values (' + Number(body.value) + ', ' + Number(body.area) + ')')
  res.send()
});

es.listen(3000, () => console.log('listen 3000'))