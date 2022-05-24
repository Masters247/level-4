import Link from "next/link";
import { FC, useState } from "react";
import { Button } from "../../ui/Button";
import Remove from "../../ui/icons/Remove";
import s from "./cookieBanner.module.scss";

interface Props {
  acceptCookies: () => void;
  declineCookies: () => void;
}

const CookieBanner: FC<Props> = ({ acceptCookies, declineCookies }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [checked, setChecked] = useState(true);
  return (
    <div className={s.cookieWrapper}>
      <div
        className={s.close}
        onClick={() => {
          checked ? acceptCookies() : declineCookies();
        }}
      >
        <Remove />
      </div>
      <p className={s.text}>
        This website uses cookies to ensure you get the best experience on our
        website. If you continue without changing your settings, we will assume
        that you are happy to receive all cookies on our website.{" "}
        <Link href="/privacy-policy">Privacy policy...</Link>
      </p>

      <div className={s.actions}>
        <Button
          variant="primary"
          Component="button"
          className={s.confirm}
          onClick={() => acceptCookies()}
        >
          Got It!
        </Button>

        <p
          className={s.settingsLink}
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings...
        </p>
      </div>

      {/* Settings */}

      {showSettings && (
        <div className={s.settings}>
          <div className={s.settingsItem}>
            <label className={s.switch}>
              <input type="checkbox" disabled={true} checked />
              <span className={`${s.slider} ${s.round}`}></span>
            </label>
            <p>Functional Cookies</p>
          </div>

          <div className={s.settingsItem}>
            <label className={s.switch}>
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span className={`${s.slider} ${s.round}`}></span>
            </label>
            <p>Analytical Cookies</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
