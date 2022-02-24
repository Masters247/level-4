import { FC } from "react";
import pages from "../../../../lib/pages";
import Link from "next/link";

const DesktopNav: FC = () => {
  return (
    <nav>
      <ul>
        {pages[0].pages?.map((page: any) => (
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

export default DesktopNav;
