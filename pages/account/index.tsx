import Customer from "../../components/account/Customer/Customer";
import s from "../../styles/pages/account.module.scss";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../../components/ui/Button";
import useDelayedRender from "use-delayed-render";
import { prisma } from "../../lib/prisma";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import cn from "classnames";
import useSWR from "swr";

const fetcher = (email: any) => fetch(email).then((res) => res.json());

function useAccount(email: any) {
  const { data: user, error } = useSWR(
    `/api/account/user?email=${email}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user: user,
    isLoading: !error && !user,
    isError: error,
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

  const { user, isLoading, isError } = useAccount(email);

  const [isDetailsShown, setIsDetailsShown] = useState(true);

  console.log("user", user);

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

  const customer = [
    { type: "name", data: `${user?.name}` },
    { type: "email", data: `${user?.email}` },
  ];

  if (status === "loading") {
    return (
      <div className={s.loggingOut}>
        <Image src={"/loadingIcon.gif"} width={50} height={50} />
      </div>
    );
  }

  return (
    <div className={s.accountDetailsWrap}>
      <div className={s.titleWrap}>
        <h1>Your Account</h1>
        {session && (
          <div className={s.loggedInTitle}>
            <span>
              <Image src={session.user.image} width={30} height={30} />
            </span>
            <button onClick={handleSignOut}>
              <p>Sign Out</p>
            </button>
          </div>
        )}
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
            <p>is Loading...</p>
          ) : (
            <>
              {customer.map((person: any, i: number) => (
                <Customer
                  key={i + person.type}
                  type={person.type}
                  data={person.data}
                />
              ))}
            </>
          )}
        </div>
      )}
      {!isDetailsMounted && (
        <div
          className={
            !isDetailsRendered ? s.accountDetailsShow : s.accountDetailsHide
          }
        >
          Designs
        </div>
      )}
      <Button variant="primary" className={s.save} Component="button">
        Save changes
      </Button>
    </div>
  );
};

export default Account;
