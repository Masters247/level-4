import { FC } from "react";
import Image from "next/image";
import MobileNav from "../Nav/Mobile-Nav/MobileNav";
import s from "./header.module.scss";

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.topBanner}>
        <p>25 years in golf making products personal</p>
      </div>
      <div className={s.mainHeader}>
        <div className={s.imageWrap}>
          <Image src="/Level-4-Lge.png" width={375} height={166} />
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
