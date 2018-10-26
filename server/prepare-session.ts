import * as Koa from 'koa'

export default () => async (ctx: Koa.Context, next: () => any) => {
  // set the session to the req object so next.js can access it
  (ctx.req as any).session = ctx.session
  await next()
}
