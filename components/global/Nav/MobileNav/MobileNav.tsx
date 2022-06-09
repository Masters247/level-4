import Link from "next/link";
import { FC, useState } from "react";
import s from "./mobileNav.module.scss";
import Image from "next/image";
import pages from "../../../../lib/pages";
import Account from "../../../ui/icons/Account";
import Search from "../../../ui/icons/Search";
import { useLockBodyScroll } from "react-use";
import { signIn, useSession } from "next-auth/react";
import { Category } from "../../../../lib/graphcms-querys/categoryQuery";

interface Props {
  menuProducts: Category[];
}

const Nav: FC<Props> = ({ menuProducts }) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <div className={`${s.navWrapper} ${open ? s.open : ""}`}>
      <div className={s.headerWrapper}>
        <div className={s.mobileLogo} onClick={() => setOpen(false)}>
          <Link href="/" passHref prefetch={false}>
            <a>
              <Image
                priority
                src="/level-4-icon.svg"
                width={35}
                height={40}
                alt="Level Four Logo"
              />
            </a>
          </Link>
        </div>
        <div className={s.mobileMenu} onClick={handleMenuToggle}>
          <div className={s.menuIcon}>
            <div className={`${s.menuLine}  ${open ? s.bar1 : ""}`}></div>
            <div className={`${s.menuLine} ${open ? s.bar2 : ""}`}></div>
          </div>
        </div>
      </div>
      <nav className={`${s.navContent} ${open ? s.show : s.hidden}`}>
        <ul className={s.navLinks}>
          {pages[0].pages?.map((page) => (
            <li key={page.name}>
              <Link href={page.link} passHref>
                <a onClick={handleMenuToggle}>{page.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.divide}></div>
        <ul className={s.navLinks}>
          {menuProducts?.map((page) => (
            <li key={page.id}>
              <Link href={`/${page.categoriesSlug}`} passHref>
                <a onClick={handleMenuToggle}>{page.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.divide}></div>
        <div className={s.navBottom}>
          <div
            className={s.account}
            style={{
              cursor: "pointer",
            }}
          >
            {!session ? (
              <button onClick={handleSignIn}>
                <Account />
              </button>
            ) : (
              <Link href="/account" passHref>
                <div className={s.signedIn}>
                  <a>My Account</a>
                  {session.user?.image ? (
                    <Image
                      src={session.user?.image}
                      alt="Profile Image"
                      height={30}
                      width={30}
                      className={s.profileImage}
                    />
                  ) : (
                    <Account fill />
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
