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

const fetcher = (email: any) => fetch(email).then((res) => res.json());

function useAccount(email: any) {
  const { data: user, error } = useSWR(
    `/api/account/user?email=${email}`,
    fetcher,
    { revalidateOnFocus: false }
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
    { type: "name", data: `${user?.name || "----"}` },
    { type: "email", data: `${user?.email}` },
    { type: "organisation", data: `${user?.organisation || "----"}` },
  ];

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
        <h1>Your Account</h1>
        {session && (
          <div className={s.loggedInTitle}>
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
          {isLoading ? <p>is Loading....</p> : <Designs userId={user.id} />}
        </div>
      )}
      {/* <Button variant="primary" className={s.save} Component="button">
        Save changes
      </Button> */}
    </div>
  );
};

export default Account;
