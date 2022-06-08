/* eslint-disable @next/next/no-html-link-for-pages */
import type { NextPage } from "next";
import Customer from "../../components/account/Customer/Customer";
import Designs from "../../components/account/Designs/Designs";
import s from "../../styles/pages/account.module.scss";
import useDelayedRender from "use-delayed-render";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

const Account: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const [isDetailsShown, setIsDetailsShown] = useState(true);

  const { mounted: isDetailsMounted, rendered: isDetailsRendered } =
    useDelayedRender(isDetailsShown, {
      enterDelay: 300,
      exitDelay: 300,
    });

  const toggleAccountView = () => {
    if (isDetailsMounted) {
      setIsDetailsShown(false);
    } else {
      setIsDetailsShown(true);
    }
  };

  const handleSignOut = () => {};

  // if (status === "loading") {
  //   return (
  //     <div className={s.loggingOut}>
  //       <Image src={"/loadingIcon.gif"} width={50} height={50} alt="" />
  //     </div>
  //   );
  // }

  return (
    <div className={s.accountDetailsWrap}>
      <div className={s.titleWrap}>
        <h1>Your Account</h1>
        <div className={s.loggedInTitle}>
          <button>
            <a href="/api/auth/logout">Logout</a>
          </button>
        </div>
      </div>
      <div className={s.tabWrap}>
        <button
          onClick={toggleAccountView}
          className={`${s.button} ${isDetailsShown && s.activeDetails}`}
        >
          Details
        </button>
        <button
          onClick={toggleAccountView}
          className={`${s.button} ${!isDetailsShown && s.activeDesigns}`}
        >
          My Designs
        </button>
      </div>
      {isDetailsMounted && (
        <div
          className={
            isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          {isLoading ? <p>is Loading...</p> : <Customer customer={user} />}
        </div>
      )}
      {!isDetailsMounted && (
        <div
          className={
            !isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          {isLoading ? <p>is Loading....</p> : <Designs userId={user?.sub} />}
        </div>
      )}
    </div>
  );
};

export default Account;
