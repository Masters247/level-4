import s from "../styles/pages/signIn.module.scss";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import Google from "../components/ui/icons/Google";
import TwitterBlue from "../components/ui/icons/TwitterBlue";
import { useRouter } from "next/router";
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

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const error = router.query.error;

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Sign In</h1>
        <p>
          Sign in with your email and password to view your Level 4 designs and
          create more.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p className={s.error}>Invalid password or email</p>}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            Component="button"
            variant={"primary"}
            style={{ width: "100%" }}
            loading={loading}
          >
            Sign In
          </Button>
        </form>
        <Link href="/signup" passHref>
          <p className={s.changeView}>Dont have an account yet?</p>
        </Link>
        <Link href="/forgot-password" passHref>
          <p className={s.changeView}>Forgot password?</p>
        </Link>
        <div className={s.line}></div>
        <Button variant="secondary" onClick={() => signIn("google")}>
          Continue With Google <Google styles={s.providerLogo} />
        </Button>
        <Button
          variant="secondary"
          onClick={() => signIn("twitter")}
          className={s.providerButton}
        >
          Continue With Twitter <TwitterBlue styles={s.providerLogo} />
        </Button>
      </div>
    </div>
  );
}
