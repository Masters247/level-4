import { FC, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from "./layout.module.scss";
import { initGA, logPageView } from "../../../lib/ga-utils";
import CookieBanner from "../CookieBanner";
import { useAcceptCookies } from "../../../lib/useAcceptCookies";
import useSWR from "swr";

interface Props {
  pageProps: {};
}
const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
const Layout: FC<Props> = ({ children }) => {
  // GA Init
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      initGA();
      logPageView();
    }
  });

  // Get menu items from GraphCMS data
  const {
    data: menuProducts,
    error,
    isValidating,
  } = useSWR(`/api/categories`, fetcher, {
    revalidateOnFocus: false,
  });

  // Cookie Banner Functions
  const { acceptedCookies, declinedCookies, onAcceptCookies, declineCookies } =
    useAcceptCookies();

  return (
    <div className={s.wrap}>
      <Header menuProducts={menuProducts} />
      <main>{children}</main>
      <Footer menuProducts={menuProducts} />
      {acceptedCookies || declinedCookies ? null : (
        <CookieBanner
          acceptCookies={onAcceptCookies}
          declineCookies={declineCookies}
        />
      )}
    </div>
  );
};
export default Layout;
