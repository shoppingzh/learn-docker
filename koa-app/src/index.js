const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')
const { createPool, init } = require('./db')

const app = new Koa()
const router = new Router()
let db

function query(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}

function execute(sql) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, conn) => {
      if (err) return reject(err)
      conn.execute(sql, err2 => {
        if (err2) return reject(err2)
        resolve()
      })
    })
  })
}

router.get('/', ctx => {
  ctx.redirect('hello')
})

router.get('/hello', ctx => {
  ctx.body = 'Hello, Koa!'
})

router.get('/blog/add', async(ctx) => {
  if (!ctx.query.title || !ctx.query.text) {
    ctx.body = '请传入标题与内容'
    return
  }
  await execute(`
    insert into t_blog (title, text) values ('${ctx.query.title}', '${ctx.query.text}')
  `)
  ctx.body = true
})

router.get('/blog/list', async(ctx) => {
  const result = await query(`select * from t_blog`)
  ctx.body = result
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async(ctx, next) => {
    next()
  })

;(async function() {
  try {
    db = createPool()
    await init();
  } catch (err) {
    console.error(err)
  }
  app.listen(3000)
})()
