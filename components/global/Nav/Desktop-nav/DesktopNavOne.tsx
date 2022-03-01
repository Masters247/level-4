import { FC } from "react";
import s from "./desktopNav.module.scss";
import pages from "../../../../lib/pages";
import Link from "next/link";

const DesktopNavOne: FC = () => {
  return (
    <nav className={s.navTwo}>
      <ul>
        {pages[1].products?.map((page: any) => (
          <li key={page.name} className={page?.class}>
            <Link href={page.link} passHref>
              <a>{page.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavOne;
