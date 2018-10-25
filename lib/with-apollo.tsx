import Head from 'next/head'
import * as React from 'react'
import {getDataFromTree} from 'react-apollo'

import initApollo from './init-apollo'
import isBrowser from './is-browser'

export default (App) => {
  return class Apollo extends React.Component<{}> {
    public static displayName = 'withApollo(App)'

    public static getInitialProps = async (ctx) => {
      const {Component, router} = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      const apollo = initApollo()
      if (!isBrowser) {
        try {
          await getDataFromTree(<App {...appProps} apolloClient={apollo} Component={Component} router={router} />)
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error)
        }

        Head.rewind()
      }

      return {...appProps, apolloState: apollo.cache.extract()}
    }

    private apolloClient: any

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
