import Link from "next/link";
import { FC, useState } from "react";
import s from "./mobileNav.module.scss";
import Image from "next/image";
import pages from "../../../../lib/pages";
import Account from "../../../ui/icons/Account";
import Search from "../../../ui/icons/Search";
import { useLockBodyScroll } from "react-use";

const Nav: FC = () => {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);
  return (
    <div className={`${s.navWrapper} ${open ? s.open : ""}`}>
      <div className={s.headerWrapper}>
        <div className={s.mobileLogo} onClick={() => setOpen(false)}>
          <Link href="/" passHref>
            <Image
              src="/level-4-icon.svg"
              width={35}
              height={40}
              alt="Level Four Logo"
            />
          </Link>
        </div>
        <div className={s.mobileMenu} onClick={() => setOpen(!open)}>
          <div className={s.menuIcon}>
            <div className={`${s.menuLine}  ${open ? s.bar1 : ""}`}></div>
            <div className={`${s.menuLine} ${open ? s.bar2 : ""}`}></div>
          </div>
        </div>
      </div>

      <div className={`${s.navContent} ${open ? s.show : s.hidden}`}>
        <ul className={s.navLinks}>
          {pages[0].pages?.map((page) => (
            <Link href={page.link} passHref key={page.name}>
              <li onClick={() => setOpen(!open)}>{page.name}</li>
            </Link>
          ))}
        </ul>

        <div className={s.divide}></div>

        <ul className={s.navLinks}>
          {pages[1].products?.map((page) => (
            <Link href={page.link} passHref key={page.name}>
              <li onClick={() => setOpen(!open)}>{page.name}</li>
            </Link>
          ))}
        </ul>

        <div className={s.divide}></div>

        <div className={s.navBottom}>
          <div className={s.account}>
            <Account />
          </div>

          <div className={s.search}>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
