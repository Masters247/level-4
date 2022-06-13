import type { NextPage } from "next";
import Customer from "../../components/account/Customer/Customer";
import Designs from "../../components/account/Designs/Designs";
import s from "../../styles/pages/account.module.scss";
import { signOut, useSession } from "next-auth/react";
import useDelayedRender from "use-delayed-render";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Button } from "../../components/ui/Button";

const fetcher = (email: string) => fetch(email).then((res) => res.json());

function useAccount(email: string) {
  const {
    data: user,
    error,
    mutate,
  } = useSWR(`/api/account/user?email=${email}`, fetcher);

  return {
    user: user,
    isLoading: !error && !user,
    isError: error,
    mutate,
  };
}

const Account: NextPage = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const email = session?.user.email;
  const { user, isLoading, isError, mutate } = useAccount(email);
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

  const handleSignOut = () => {
    signOut();
  };

  if (status === "loading") {
    return (
      <div className={s.loggingOut}>
        <Image src={"/loadingIcon.gif"} width={50} height={50} alt="" />
      </div>
    );
  }

  return (
    <div className={s.accountDetailsWrap}>
      <div className={s.titleWrap}>
        <h1>My Account</h1>
        <div className={s.loggedInTitle}>
          <Button onClick={handleSignOut} variant="secondary">
            <p>Sign Out</p>
          </Button>
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
          {isLoading ? (
            <div className={s.loggingOut}>
              <Image src={"/loadingIcon.gif"} width={50} height={50} alt="" />
            </div>
          ) : (
            <Customer customer={user} mutate={mutate} />
          )}
        </div>
      )}
      {!isDetailsMounted && (
        <div
          className={
            !isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          {isLoading ? (
            <div className={s.loggingOut}>
              <Image src={"/loadingIcon.gif"} width={50} height={50} alt="" />
            </div>
          ) : (
            <Designs userId={user.id} />
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
