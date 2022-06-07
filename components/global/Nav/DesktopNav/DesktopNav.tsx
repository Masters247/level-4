/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { FC, useRef, useState } from "react";
import s from "./desktopNav.module.scss";
import Image from "next/image";
import Account from "../../../ui/icons/Account";
import { Category } from "../../../../lib/graphcms-querys/categoryQuery";
import { useClickAway } from "react-use";
import { useUser } from "@auth0/nextjs-auth0";

interface Props {
  menuProducts: Category[];
}

const DesktopNav: FC<Props> = ({ menuProducts }) => {
  const [dropDown, setDropDown] = useState(false);
  const { user, error, isLoading } = useUser();

  const ref = useRef(null);
  useClickAway(ref, () => {
    setDropDown(false);
  });

  return (
    <div className={s.navWrapper} ref={ref}>
      <div
        className={`${s.dropDown} ${dropDown && s.open}`}
        onClick={() => setDropDown(!dropDown)}
        onMouseLeave={() => setDropDown(false)}
      >
        <ul className={s.catLinks}>
          {menuProducts?.map((item: Category) => (
            <Link href={`/${item.categoriesSlug}`} passHref key={item.id}>
              <li>
                <Image
                  src={item.heroImage[0].url}
                  layout="responsive"
                  alt={`Product - ${item.title}`}
                  width={400}
                  height={400}
                />
                <a>{item.title}</a>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <ul className={s.navLinks}>
        <li
          onClick={() => setDropDown(!dropDown)}
          onMouseEnter={() => setDropDown(!dropDown)}
        >
          <a>Products</a>
        </li>
        {/* <li onClick={() => setDropDown(false)}>
          <Link href="/visualiser" passHref>
            <a>Visualiser</a>
          </Link>
        </li> */}
        <li onClick={() => setDropDown(false)}>
          <Link href="/about-us" passHref>
            <a>About Us</a>
          </Link>
        </li>
      </ul>
      <div className={s.logo} onClick={() => setDropDown(false)}>
        <Link href="/" passHref prefetch={false}>
          <Image
            priority
            src="/level-4-logo.svg"
            width={120}
            height={40}
            alt="Level Four Logo"
          />
        </Link>
      </div>
      <div className={s.navBottom}>
        <div
          className={s.account}
          style={{
            cursor: "pointer",
          }}
          onClick={() => setDropDown(false)}
        >
          {!user ? (
            <a href="/api/auth/login">
              <Account />
            </a>
          ) : (
            <Link href="/account" passHref>
              <a>{user?.name}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
