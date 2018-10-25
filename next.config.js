const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  publicRuntimeConfig: {
    SHOPIFY_APP_KEY: process.env.SHOPIFY_APP_KEY,
    CORE_GRAPHQL_URL: process.env.CORE_GRAPHQL_URL,
  }
})