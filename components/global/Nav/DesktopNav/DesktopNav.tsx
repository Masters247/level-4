import Link from "next/link";
import { FC, useRef, useState } from "react";
import s from "./desktopNav.module.scss";
import Image from "next/image";
import Account from "../../../ui/icons/Account";
import { signIn, useSession } from "next-auth/react";
import { Category } from "../../../../lib/graphcms-querys/categoryQuery";
import { useClickAway } from "react-use";

interface Props {
  menuProducts: Category[];
}

const DesktopNav: FC<Props> = ({ menuProducts }) => {
  const [dropDown, setDropDown] = useState(false);
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn();
  };

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
        <div
          className={s.account}
          style={{
            cursor: "pointer",
          }}
          onClick={() => setDropDown(false)}
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
    </div>
  );
};

export default DesktopNav;
