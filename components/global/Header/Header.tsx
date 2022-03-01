import { FC } from "react";
import s from "./header.module.scss";
import { MobileNav } from "../Nav/MobileNav";
import { DesktopNav } from "../Nav/DesktopNav";

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.topBanner}>
        <p>25 years in golf making products personal</p>
      </div>
      <nav className={s.mainHeader}>
        <MobileNav />
        <DesktopNav />
      </nav>
    </header>
  );
};

export default Header;
