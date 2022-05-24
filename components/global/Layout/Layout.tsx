import { FC, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from "./layout.module.scss";
import { initGA, logPageView } from "../../../lib/ga-utils";
import CookieBanner from "../CookieBanner";
import { useAcceptCookies } from "../../../lib/useAcceptCookies";

interface Props {
  pageProps: {};
}

const Layout: FC<Props> = ({ children }) => {
  // GA Init
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      initGA();
      logPageView();
    }
  });

  // Cookie Banner Functions
  const { acceptedCookies, declinedCookies, onAcceptCookies, declineCookies } =
    useAcceptCookies();

  return (
    <div className={s.wrap}>
      <Header />
      <main>{children}</main>
      <Footer />
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
