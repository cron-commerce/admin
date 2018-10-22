import {AppProvider, Link, Page} from '@shopify/polaris'

export default () => <AppProvider>
  <Page title='Cron Commerce'>
    <h1>Shopify Admin app</h1>
    <div>
      <Link external url='https://cron-shopify-admin.ngrok.io/stripe/oauth'>Connect to Stripe</Link>
    </div>
  </Page>
</AppProvider>
