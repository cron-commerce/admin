import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import getConfig from 'next/config'

import isBrowser from './is-browser'

const {publicRuntimeConfig} = getConfig()

let apolloClient = null

const create = (initialState) => new ApolloClient({
  cache: new InMemoryCache().restore(initialState || {}),
  connectToDevTools: isBrowser,
  link: new HttpLink({
    credentials: 'same-origin',
    uri: publicRuntimeConfig.CORE_GRAPHQL_URL,
  }),
  ssrMode: !isBrowser,
})

export default (initialState?) => {
  if (!isBrowser) {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
