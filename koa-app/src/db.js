const mysql = require('mysql')

const conn = mysql.createConnection({
  // host: 'localhost',
  user: 'root',
  password: 'xpzheng',
  database: 'hello',
})

conn.connect()

module.exports = conn
