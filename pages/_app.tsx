import type { AppProps } from "next/app";
import Head from "../components/global/Head/Head";
import Layout from "../components/global/Layout/Layout";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
