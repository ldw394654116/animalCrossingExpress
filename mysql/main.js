const mysql = require('mysql')

const forbuy = mysql.createConnection({
  host: '111.229.158.205',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'forbuy'
})

module.exports.forbuy = forbuy