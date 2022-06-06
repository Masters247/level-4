import { FC } from "react";
import s from "./header.module.scss";
import { MobileNav } from "../Nav/MobileNav";
import { DesktopNav } from "../Nav/DesktopNav";
import { Category } from "../../../lib/graphcms-querys/categoryQuery";

interface Props {
  menuProducts: Category[];
}

const Header: FC<Props> = ({ menuProducts }) => {
  return (
    <header className={s.header}>
      <div className={s.topBanner}>
        <p>25 years in golf making products personal</p>
      </div>
      <nav className={s.mainHeader}>
        <MobileNav menuProducts={menuProducts} />
        <DesktopNav menuProducts={menuProducts} />
      </nav>
    </header>
  );
};

export default Header;
