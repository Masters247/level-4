import { FC } from "react";
import s from "./desktopNav.module.scss";
import pages from "../../../../lib/pages";
import Link from "next/link";
import Search from "../../../ui/icons/Search";
import Account from "../../../ui/icons/Account";

const DesktopNavTwo: FC = () => {
  const pagesSlice = pages[0].pages?.slice(1, 2);
  return (
    <nav className={s.navTwo}>
      <ul>
        {pagesSlice?.map((page: any) => (
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
  );
};

export default DesktopNavTwo;
