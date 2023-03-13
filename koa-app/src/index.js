const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')
// const db = require('./db')
const redis = require('./redis')

const app = new Koa()
const router = new Router()

// function query(sql) {
//   return new Promise((resolve, reject) => {
//     db.query(sql, (err, results) => {
//       if (err) return reject(err)
//       resolve(results)
//     })
//   })
// }

router.get('/', ctx => {
  ctx.redirect('/hello')
})

router.get('/hello', ctx => {
  ctx.body = 'Hello, Koa!'
})

// router.get('/db', async(ctx) => {
//   const [count] = await query('SELECT 1 + 1 AS result')
//   ctx.body = count.result
// })

router.get('/count', async(ctx) => {
  ctx.body = await redis.incr('count')
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

;(async function() {
  try {
    await redis.connect()
  } catch {}
  app.listen(3000)
})()
