const sha1 = require('sha1')

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
  console.log('wx-end:', end)
  resp.send(end)
  return end
}

function info (req, resp) {
  console.log('wx-info',req.body, req.query, req.params)
  if (req.body && req.body.xml) {
    let ToUserName = req.query.openid
    let FromUserName = req.body.xml.ToUserName
    let Content = '1333：' + req.body.xml.Content
    let CreateTime = req.body.CreateTime
    let MsgType = 'text'
    //
    let infoModel = '<xml><ToUserName><![CDATA['
    + ToUserName + ']]</ToUserName><FromUserName><![CDATA['
    + FromUserName + ']]</FromUserName><CreateTime>'
    + CreateTime + '</CreateTime><MsgType><![CDATA['
    + MsgType + ']]</MsgType><Content><![CDATA['
    + Content + ']]</Content></xml>'
    resp.writeHead(200, {'Content-Type': 'application/xml'})
    resp.end(infoModel)
  } else {
    let ToUserName = 'oK49MuMVWRb0v2Vda6_1kGuKG9xU'
    let FromUserName = 'gh_fc07dc4eeb0c'
    let Content = '和'
    let CreateTime = new Date().getTime()
    let MsgType = 'text'
    //
    let infoModel = '<xml><ToUserName><![CDATA['
    + ToUserName + ']]</ToUserName><FromUserName><![CDATA['
    + FromUserName + ']]</FromUserName><CreateTime>'
    + CreateTime + '</CreateTime><MsgType><![CDATA['
    + MsgType + ']]</MsgType><Content><![CDATA['
    + Content + ']]</Content></xml>'
    resp.writeHead(200, {'Content-Type': 'application/xml'})
    resp.end(infoModel)
  }
}

module.exports = {
  wx: wx,
  info: info
}