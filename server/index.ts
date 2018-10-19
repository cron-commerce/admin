import * as Koa from 'koa'
import * as next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = new Koa()

  app.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  app.listen(port)
})