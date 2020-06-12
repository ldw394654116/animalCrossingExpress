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
  if  (req.body && req.body.xml) {
    let ToUserName = req.body.xml.ToUserName ? req.body.xml.ToUserName : 0
    let FromUserName = req.body.xml.FromUserName ? req.body.xml.FromUserName : 0
    let Content = '接口返回：' + req.body.xml.Content ? req.body.xml.Content : 0
    let CreateTime = new Date().getTime()
    let MsgType = 'text'
    let MsgId = '77777'
    let json = {
      xml: {
        ToUserName: ToUserName,
        FromUserName: FromUserName,
        CreateTime: CreateTime,
        MsgType: MsgType,
        Content: Content,
        MsgId: MsgId
      }
    }
    let infoModel = `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]</ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]</FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[${MsgType}]]</MsgType>
        <Content><![CDATA[${Content}]]</Content>
      </xml>
    `
    resp.setHeader('Content-Type', 'text/xml')
    // resp.send(parser.toXml(json))
    resp.send('<xml ToUserName="0" FromUserName="0" CreateTime="1591932921876" MsgType="text" Content="0"></xml>')
  } else {
    let ToUserName = 0
    let FromUserName = 0
    let Content = 0
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
    resp.setHeader('Content-Type', 'text/xml')
    // resp.send(parser.toXml(json))
    resp.send('<xml ToUserName="0" FromUserName="0" CreateTime="1591932921876" MsgType="text" Content="0"></xml>')
  }
}

module.exports = {
  wx: wx,
  info: info
}