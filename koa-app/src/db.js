const mysql = require('mysql')

const conn = mysql.createConnection({
  port: '3308',
  host: 'localhost',
  user: 'root',
  password: 'xpzheng',
  database: 'hello',
})

conn.connect()

module.exports = conn
