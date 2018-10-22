import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: process.env.CORE_GRAPHQL_URL}),
})
