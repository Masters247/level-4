import type { AppProps } from "next/app";

import Layout from "../components/global/Layout/Layout";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
