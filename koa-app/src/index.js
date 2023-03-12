const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/', ctx => {
  ctx.redirect('/hello')
})

router.get('/hello', ctx => {
  ctx.body = 'Hello, Koa!'
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
