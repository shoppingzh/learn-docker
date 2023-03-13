const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')
const { createPool } = require('./db')
const redis = require('./redis')
const waitPort = require('wait-port')

const app = new Koa()
const router = new Router({})
let db

function query(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}

router.get('/', ctx => {
  ctx.redirect('hello')
})

router.get('/hello', ctx => {
  ctx.body = 'Hello, Koa!'
})

router.get('/db', async(ctx) => {
  const [count] = await query('SELECT 1 + 1 AS result')
  ctx.body = count.result
})

router.get('/count', async(ctx) => {
  try {
    ctx.body = await redis.incr('count')
  } catch {
    ctx.body = 'Error'
  }
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

;(async function() {
  try {
    // await waitPort({
    //   host: 'db',
    //   port: 3308,
    //   timeout: 10000,
    //   waitForDns: true,
    // })
    db = createPool()
    await redis.connect()
  } catch (err) {
    console.error(err)
  }
  app.listen(3000)
})()
