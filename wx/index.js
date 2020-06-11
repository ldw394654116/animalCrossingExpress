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
  resp.send(end)
}

function info (req, resp) {
  let ToUserName = req.query.openid
  let FromUserName = '青木镜框'
  let CreateTime = new Date().getTime()
  let MsgType = 'text'
  let Content = req.body.xml.Content + '???????' || 'sb'
  const infoModel = `
    <xml>
      <ToUserName><![CDATA[${ToUserName}]]</ToUserName>
      <FromUserName><![CDATA[${FromUserName}]]</FromUserName>
      <CreateTime>${CreateTime}</CreateTime>
      <MsgType><![CDATA[${MsgType}]]</MsgType>
      <Content><![CDATA[${Content}]]</Content>
    </xml>
  `  
  console.log(infoModel.toString())
  resp.send(infoModel.toString())
}

module.exports = {
  wx: wx,
  info: info
}