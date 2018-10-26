import {AppProvider} from '@shopify/polaris'
import AppRoutePropagator from '@shopify/react-shopify-app-route-propagator'
import NextApp, {Container} from 'next/app'
import getConfig from 'next/config'
import {ApolloProvider} from 'react-apollo'

import Link from '../components/link'
import updateState from '../lib/update-state'
import withApollo from '../lib/with-apollo'

interface Props {
  apolloClient: any,
}

class App extends NextApp<Props> {
  public state = {
    shouldRenderPolaris: false,
  }

  public componentDidMount() {
    this.setState(updateState({shouldRenderPolaris: true}))
  }

  public render() {
    const {Component, pageProps, apolloClient} = this.props
    const {publicRuntimeConfig} = getConfig()

    return <Container>
      <ApolloProvider client={apolloClient}>
        {this.state.shouldRenderPolaris && <AppProvider apiKey={publicRuntimeConfig.SHOPIFY_APP_KEY} forceRedirect linkComponent={Link}>
          <Component {...pageProps} />
        </AppProvider>}
      </ApolloProvider>
      <AppRoutePropagator location={this.props.router.route} />
    </Container>
  }
}

export default withApollo(App)
