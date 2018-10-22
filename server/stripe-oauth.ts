import gql from 'graphql-tag'
import * as Koa from 'koa'
import {URLSearchParams} from 'url'

import apolloClient from './apollo-client'

const mutation = gql`
mutation updateShop($name: String!, $input: ShopInput) {
  updateShop(name: $name, input: $input) {
    id
  }
}`

export default (app: Koa) => {
  app.use(async (ctx: Koa.Context, next: () => any) => {
    if (ctx.path === '/stripe/oauth') {
      // Begin the OAuth process
      ctx.redirect(`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write`)

    } else if (ctx.path === '/stripe/oauth/callback') {
      // Complete the OAuth process and save the user ID to core
      const body = new URLSearchParams()
      body.append('client_secret', process.env.STRIPE_SECRET_KEY)
      body.append('code', ctx.query.code)
      body.append('grant_type', 'authorization_code')

      const res = await fetch('https://connect.stripe.com/oauth/token', {body, method: 'POST'})
      const json = await res.json()

      await apolloClient.mutate({
        mutation,
        variables: {
          input: {
            stripePublishableKey: json.stripe_publishable_key,
            stripeUserId: json.stripe_user_id,
          },
          name: ctx.session.shop,
        },
      })

      ctx.redirect('/')
    } else {
      await next()
    }
  })
}
