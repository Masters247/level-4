import { useSession } from "next-auth/react";
import s from "./pleaseSignIn.module.scss";
import Link from "next/link";
import { Button } from "../../ui/Button";

const PleaseSignIn = () => {
  const { data: session }: any = useSession();

  return (
    <>
      {!session && (
        <div className={s.signIn}>
          <p>Please sign in to save custom images</p>
          <Link href="/signin" passHref>
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PleaseSignIn;
