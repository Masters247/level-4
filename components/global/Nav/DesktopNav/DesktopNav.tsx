import Link from "next/link";
import { FC } from "react";
import pages from "../../../../lib/pages";
import s from "./desktopNav.module.scss";
import Image from "next/image";
import Account from "../../../ui/icons/Account";
import Search from "../../../ui/icons/Search";

const DesktopNav: FC = () => {
  return (
    <div className={s.navWrapper}>
      <ul className={s.navLinks}>
        {pages[1].products?.map((page, i) => (
          <li key={i}>
            <Link href={page.link} passHref key={page.name}>
              <a>{page.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={s.logo}>
        <Link href="/" passHref>
          <a>
            <Image
              priority
              src="/level-4-logo.svg"
              width={120}
              height={40}
              alt="Level Four Logo"
            />
          </a>
        </Link>
      </div>
      <div className={s.navBottom}>
        <Link href="/about-us" passHref>
          <a>About Us</a>
        </Link>
        <div className={s.search}>
          <Search />
        </div>
        <div className={s.account}>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
