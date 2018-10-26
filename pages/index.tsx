import {Link, Page} from '@shopify/polaris'

export default () => <Page title='Home'>
  <div>
    <Link url='/about'>About</Link>
  </div>
  <div>
    <a href='https://cron-shopify-admin.ngrok.io/stripe/oauth' target='_parent'>Connect to Stripe</a>
  </div>
</Page>
