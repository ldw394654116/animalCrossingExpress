function getUserInfo (req, resp) {
  let html = ``
  global.forbuy.query('select * from user;', (err, res) => {
    for(let i of res) {
      html += `<h1>${i.id + '-' + i.name + i.tel + i.uid}</h1>`
    }
    resp.send(html)
  })
}

function insertUserInfo (req, resp, data) {
  let baseQueryStart = 'insert into user (name, tel, uid) values ('
  let mid = '\'' + data.name + '\',\'' + data.tel + '\',\'' + data.uid
  let baseQueryEnd = '\');'
  global.forbuy.query(baseQueryStart + mid + baseQueryEnd, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      resp.send('200')
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  insertUserInfo: insertUserInfo
}