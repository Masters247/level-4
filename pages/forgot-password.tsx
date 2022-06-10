import s from "../styles/pages/signIn.module.scss";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "../components/ui/Button";

import Link from "next/link";

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (session) {
    context.res.writeHead(302, { Location: "/account" });
    context.res.end();
  }

  return {
    props: {},
  };
}

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);

  const passwordReset = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const resetStart = await fetch(
        `/api/account/reset-password-email?email=${email}`
      );
      const res = await resetStart.json();

      if (res.status === "success") {
        setLoading(false);
        setResetNotify(true);
      } else {
        setLoading(false);
        setError(true);
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log("Reset Error:", error.message);
    }
  };
  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Forgot Password</h1>
        <p>Send a reset password link to your email to reset your password.</p>
        <form onSubmit={passwordReset}>
          {error && <p className={s.error}>Invalid email</p>}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {resetNotify && (
            <p className={s.passwordSuccess}>
              We&apos;ve sent you a link to reset your password. This is only
              valid for 10 minutes.
            </p>
          )}

          <Button
            type="submit"
            Component="button"
            variant={"primary"}
            style={{ width: "100%" }}
            loading={loading}
          >
            Submit
          </Button>
        </form>
        <Link href="/signin" passHref>
          <p className={s.changeView}>I remembered</p>
        </Link>
      </div>
    </div>
  );
}
