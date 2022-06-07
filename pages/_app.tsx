import type { AppProps } from "next/app";
import Layout from "../components/global/Layout/Layout";
import "../styles/main.scss";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
