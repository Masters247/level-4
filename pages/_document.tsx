import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          id="viewportMeta"
        /> */}
        <link rel="stylesheet" href="https://use.typekit.net/dlg6cmt.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
