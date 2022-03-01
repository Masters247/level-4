import { FC } from "react";

import s from "./header.module.scss";
import { Nav } from "../Nav";

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.topBanner}>
        <p>25 years in golf making products personal</p>
      </div>
      <div className={s.mainHeader}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
