const mysql = require('mysql')

exports.createPool = function() {
  return mysql.createPool({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'xpzheng',
    database: 'hello',
    charset: 'utf8mb4',
  })
}
