const mysql = require('mysql')
const { MYSQL_HOST } = require('./config')

exports.createPool = function() {
  return mysql.createPool({
    host: MYSQL_HOST,
    port: '3306',
    user: 'root',
    password: 'xpzheng',
    database: 'hello',
    charset: 'utf8mb4',
  })
}
