import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "../Nav/Mobile-nav/MobileNav";
import DesktopNavOne from "../Nav/Desktop-nav/DesktopNavOne";
import DesktopNavTwo from "../Nav/Desktop-nav/DesktopNavTwo";
import s from "./header.module.scss";

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.topBanner}>
        <p>25 years in golf making products personal</p>
      </div>
      <div className={s.mainHeader}>
        <DesktopNavOne />
        <Link href="/" passHref>
          <a className={s.imageWrap}>
            <Image
              src="/Level-4-Lge.png"
              width={375}
              height={166}
              alt="Level Four Logo"
            />
          </a>
        </Link>
        <DesktopNavTwo />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
