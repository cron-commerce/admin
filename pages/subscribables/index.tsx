import {Link, Page} from '@shopify/polaris'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

import Header from '../../components/header'

const QUERY = gql`
  query subscribables {
    subscribables {
      id
      sizes {
        id
        numVariants
        price
      }
    }
  }
`

export default () => <Page title='Subscribables'>
  <Header />
  <Query query={QUERY}>
    {({data, loading}) => {
      if (loading) { return <div>Loading...</div> }
      return <div>You have {data.subscribables.length} subscribables.</div>
    }}
  </Query>
  <Link url='/subscribables/new'>New</Link>
</Page>
