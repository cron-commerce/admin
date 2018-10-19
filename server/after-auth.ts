import {Context} from 'koa'

export default async (ctx: Context) => {
  const shopName = ctx.session.shop
  const accessToken = ctx.session.accessToken

  ctx.redirect('/')
}
