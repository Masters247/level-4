import { FC, useState } from "react";
import Link from "next/link";
import s from "./mobileNav.module.scss";
const pages = [
  { name: "Home", link: "/index" },
  { name: "About Us", link: "/about-us" },
  { name: "Accesories", link: "/accesories" },
  { name: "Bespoke", link: "/bespoke" },
  { name: "Collections", link: "/collections" },
  { name: "Headware", link: "/headwear" },
];

const MobileNav = () => {
  const [nav, setNav] = useState(false);
  const navButtonClick = () => {
    console.log("click");
    setNav(!nav);
  };

  return (
    <>
      <button className={s.navButton} onClick={navButtonClick}>
        Click
      </button>
      <nav className={`${s.nav} ${nav ? s.navActive : s.navClosed}`}>
        <ul>
          {pages.map((page) => {
            return (
              <li>
                <Link key={page.name} href={page.link} passHref>
                  <a>{page.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
