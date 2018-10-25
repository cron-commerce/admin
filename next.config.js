const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  publicRuntimeConfig: {
    CORE_GRAPHQL_URL: process.env.CORE_GRAPHQL_URL,
  }
})