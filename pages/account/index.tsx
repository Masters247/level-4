import type { NextPage } from "next";
import Customer from "../../components/account/Customer/Customer";
import cn from "classnames";
import Image from "next/image";
import useDelayedRender from "use-delayed-render";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import s from "../../styles/pages/account.module.scss";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
}

async function saveUser(user: any) {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

interface Props {
  users: any;
}

const Account: NextPage<Props> = ({ users }) => {
  console.log("user from prisma", users);

  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

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
    { type: "name", data: `${session?.user.name}` },
    { type: "email", data: `${session?.user.email}` },
    // { type: "image", data: `${session?.user.image}` },
    // { type: "password", data: "kdkljsfo" },
    // { type: "organisation", data: "the band academy" },
    // { type: "country", data: "United Kingdom" },
    // { type: "marketing", data: "On" },
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
            {/* <p>Hello, {session.user.name} &#40;not You&#41;</p> */}
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
          {customer.map((person: any, i: number) => (
            <Customer
              key={i + person.type}
              type={person.type}
              data={person.data}
            />
          ))}
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
