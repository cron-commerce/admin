import gql from 'graphql-tag'
import {Context} from 'koa'

import apolloClient from './apollo-client'

const mutation = gql`
  mutation saveShopAccessToken($name: String!, $accessToken: String!) {
    saveShopAccessToken(name: $name, accessToken: $accessToken) {
      id
    }
  }`

export default async (ctx: Context) => {
  await apolloClient.mutate({
    mutation,
    variables: {
      accessToken: ctx.session.accessToken,
      name: ctx.session.shop,
    },
  })

  ctx.redirect('/')
}
