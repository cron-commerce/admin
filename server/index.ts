import 'isomorphic-fetch'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import * as next from 'next'
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'

import afterAuth from './after-auth'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

const apiKey = process.env.SHOPIFY_APP_KEY
const scopes = ['read_products', 'write_products']
const secret = process.env.SHOPIFY_APP_SECRET

nextApp.prepare().then(() => {
  const app = new Koa()

  app.keys = [secret]

  app
  .use(logger('dev'))
  .use(session(app))
  .use(shopifyAuth({afterAuth, apiKey, scopes, secret}))
  .use(verifyRequest())
  .use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  .listen(port)
})