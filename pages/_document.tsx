import NextDocument, {Head, Main, NextScript} from 'next/document'

export default class Document extends NextDocument {
  public static getInitialProps = async (ctx) => {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return {shopOrigin: ctx.req.session.shop, ...initialProps}
  }

  public render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.12.1/polaris.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
