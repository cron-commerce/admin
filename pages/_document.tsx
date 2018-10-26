import NextDocument, {Head, Main, NextScript} from 'next/document'

export default class Document extends NextDocument {
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
