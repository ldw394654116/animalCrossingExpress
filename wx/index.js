const sha1 = require('sha1')
const o2x = require('object-to-xml')
// const parser = require('xml2json')

const config = {
  wechat: {
    appID: 'wx51922ad3ce978e78',
    appSecret: '9568e732b929ac1b0e572ee17c1198bb',
    token: 'luodawei1993'
  }
}

function wx (req, resp) {
  const signature = req.query.signature
  const token = config.wechat.token
  const nonce = req.query.nonce
  const timestamp = req.query.timestamp
  const echostr = req.query.echostr
  const str = [token, timestamp, nonce].sort().join('') // 排序并拼接
  const sha = sha1(str) // 加密
  const end = sha === signature ? echostr + '' : 'failed'
  resp.send(end)
}

function info (req, resp) {
  console.log(req)
  if (req.body && req.body.xml) {
    let ToUserName = req.query.openid
    let FromUserName = req.body.xml.FromUserName ? req.body.xml.FromUserName : 0
    let Content = '接口返回：' + req.body.xml.Content ? req.body.xml.Content : 0
    let CreateTime = new Date().getTime()
    let MsgType = 'text'
    let json = {
      xml: {
        ToUserName: ToUserName,
        FromUserName: FromUserName,
        CreateTime: CreateTime,
        MsgType: MsgType,
        Content: Content
      }
    }
    let infoModel = `
    <?xml version="1.0" encoding="UTF-8"?>
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]</ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]</FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[${MsgType}]]</MsgType>
        <Content><![CDATA[${Content}]]</Content>
      </xml>
    </xml>
    `
    resp.setHeader('Content-Type', 'text/xml')
    resp.send(infoModel)
  } else {
    let ToUserName = 'oK49MuMVWRb0v2Vda6_1kGuKG9xU'
    let FromUserName = 'oK49MuMVWRb0v2Vda6_1kGuKG9xU'
    let Content = '和'
    let CreateTime = new Date().getTime()
    let MsgType = 'text'
    let infoModel = `
    <?xml version="1.0" encoding="UTF-8"?>
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]</ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]</FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[${MsgType}]]</MsgType>
        <Content><![CDATA[${Content}]]</Content>
      </xml>
    </xml>
    `
    let json = {
      xml: {
        ToUserName: ToUserName,
        FromUserName: FromUserName,
        CreateTime: CreateTime,
        MsgType: MsgType,
        Content: Content
      }
    }
    resp.setHeader('Content-Type', 'text/xml')
    resp.send(infoModel)
  }
}

module.exports = {
  wx: wx,
  info: info
}