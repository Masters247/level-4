import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/global/Layout/Layout";
import "../styles/main.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
