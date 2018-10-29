import NextDocument, {Head, Main, NextScript} from 'next/document'

interface Props {
  shopName: string,
}

export default class Document extends NextDocument<Props> {
  public static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return {...initialProps, shopName: ctx.req.session.shop}
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
          <script dangerouslySetInnerHTML={{__html: `shopName = "${this.props.shopName}";`}} />
        </body>
      </html>
    )
  }
}
