import {AppProvider} from '@shopify/polaris'
import NextApp, {Container} from 'next/app'
import getConfig from 'next/config'
import {ApolloProvider} from 'react-apollo'

import withApollo from '../lib/with-apollo'

interface Props {
  apolloClient: any,
}

class App extends NextApp<Props> {
  public render() {
    const {Component, pageProps, apolloClient} = this.props
    const {publicRuntimeConfig} = getConfig()

    return <Container>
      <ApolloProvider client={apolloClient}>
        <AppProvider apiKey={publicRuntimeConfig.SHOPIFY_APP_KEY}>
          <Component {...pageProps} />
        </AppProvider>
      </ApolloProvider>
    </Container>
  }
}

export default withApollo(App)
