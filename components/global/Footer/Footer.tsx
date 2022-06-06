import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Twitter from "../../ui/icons/Twitter";
import Facebook from "../../ui/icons/Facebook";
import Instagram from "../../ui/icons/Instagram";
import pages from "../../../lib/pages";
import s from "./footer.module.scss";
import { Category } from "../../../lib/graphcms-querys/categoryQuery";
import MastersLogo from "../../../public/m247-logo.png";

interface Props {
  menuProducts: Category[];
}

const Footer: FC<Props> = ({ menuProducts }) => {
  return (
    <footer className={s.footer}>
      <div className={s.mainFooter}>
        <div className={`${s.footerElements} ${s.footer1}`}>
          <Link href="/" passHref prefetch={false}>
            <a className={s.imageWrap}>
              <Image
                // priority
                src="/level-4-logo.svg"
                width={650}
                height={166}
                alt="Level Four Logo"
              />
            </a>
          </Link>
          <div className={s.addressWrap}>
            <p>Serbert Road</p>
            <p>Gordano Gate</p>
            <p>Portishead</p>
            <p>BS20 7GG</p>
            <p>United Kingdom</p>
          </div>
        </div>
        <div className={`${s.footerElements} ${s.footer2}`}>
          <h4>Products</h4>
          <ul>
            {menuProducts?.map((page) => (
              <li key={page.id}>
                <Link href={page.categoriesSlug} passHref prefetch={false}>
                  <a>{page.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${s.footerElements} ${s.footer3}`}>
          <h4>Information</h4>
          <ul>
            {pages[0].pages?.map((page: any) => (
              <li key={page.name} className={page?.class}>
                <Link href={page.link} passHref prefetch={false}>
                  <a>{page.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${s.footerElements} ${s.footer4}`}>
          <h4>Connect</h4>
          <div className={s.socialWrap}>
            <ul>
              <li>
                <a href="">
                  <Twitter styles={s.socialIcon} />
                </a>
              </li>
              <li>
                <a href="">
                  <Facebook styles={s.socialIcon} />
                </a>
              </li>
              <li>
                <a href="">
                  <Instagram styles={s.socialIcon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.bottomFooter}>
        <p>&copy; 2022 Level 4 All rights reserved.</p>
        <a href="https://www.masters247.com/" target="_blank" rel="noreferrer">
          <div className={s.poweredByMasters}>
            <p>Powered By</p>
            <Image
              src={MastersLogo}
              alt="Masters247 Logo"
              width={100}
              height={25}
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
