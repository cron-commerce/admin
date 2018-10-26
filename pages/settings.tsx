import {Page} from '@shopify/polaris'

import Header from '../components/header'

export default () => <Page title='Settings'>
  <Header />

  <div>
    <a href='https://cron-shopify-admin.ngrok.io/stripe/oauth' target='_parent'>Connect to Stripe</a>
  </div>
</Page>
