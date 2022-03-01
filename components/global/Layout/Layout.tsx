import { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from "./layout.module.scss";

interface Props {
  pageProps: {};
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
