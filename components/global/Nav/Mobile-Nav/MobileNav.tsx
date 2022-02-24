import { FC, useState } from "react";
import Search from "../../../ui/icons/Search";
import Menu from "../../../ui/icons/Menu";
import Account from "../../../ui/icons/Account";
import pages from "../../../../lib/pages";
import Link from "next/link";
import s from "./mobileNav.module.scss";

const MobileNav: FC = () => {
  const [nav, setNav] = useState(true);
  const navButtonClick = () => {
    setNav(!nav);
  };

  return (
    <div className={s.mobileNav}>
      <button className={s.navButton} onClick={navButtonClick}>
        <Menu styles={s.menu} />
      </button>
      <nav className={`${s.nav} ${nav && s.navClosed}`}>
        <ul>
          {pages[0].pages?.map((page: any) => (
            <li key={page.name} className={page?.class}>
              <Link href={page.link} passHref>
                <a>{page.name}</a>
              </Link>
            </li>
          ))}
          {pages[1].products?.map((page: any) => (
            <li key={page.name} className={page?.class}>
              <Link href={page.link} passHref>
                <a>{page.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.iconWrap}>
          <Search styles={s.search} />
          <Account styles={s.account} />
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
