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
  let ToUserName, FromUserName, CreateTime, MsgType, Content
  const infoModel = `
    <xml>
      <ToUserName>${ToUserName}</ToUserName>
      <FromUserName>${FromUserName}</FromUserName>
      <CreateTime>${CreateTime}</CreateTime>
      <MsgType>${MsgType}</MsgType>
      <Content>${Content}</Content>
    </xml>
  `
  console.log(req)  
  resp.send(infoModel)
}

module.exports = {
  wx: wx,
  info: info
}