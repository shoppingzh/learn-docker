const mysql = require('mysql2')
const { MYSQL_HOST, MYSQL_PORT } = require('./config')

let pool

exports.createPool = function() {
  pool = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: 'root',
    password: 'xpzheng',
    database: 'hello',
    charset: 'utf8mb4',
  })
  
  return pool
}

exports.init = function() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) return console.error(err)
      conn.execute('drop table if exists t_blog;', (err) => {
        if (err) return reject(err)
        conn.execute(`create table t_blog (
          title varchar(255),
          text text
        );`, (err2) => {
          if (err2) return reject(err2)
          resolve()
        })
      })
    })
  })
}
