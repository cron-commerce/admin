import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import getConfig from 'next/config'

import isBrowser from './is-browser'

const {publicRuntimeConfig} = getConfig()

let apolloClient = null

const create = (initialState, opts) => new ApolloClient({
  cache: new InMemoryCache().restore(initialState || {}),
  connectToDevTools: isBrowser,
  link: new HttpLink({
    credentials: 'same-origin',
    headers: {
      'X-Shop': opts.shopName,
    },
    uri: publicRuntimeConfig.CORE_GRAPHQL_URL,
  }),
  ssrMode: !isBrowser,
})

export default (initialState, opts) => {
  if (!isBrowser) {
    return create(initialState, opts)
  }

  if (!apolloClient) {
    apolloClient = create(initialState, opts)
  }

  return apolloClient
}
