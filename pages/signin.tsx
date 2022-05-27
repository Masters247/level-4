import s from "../styles/pages/signIn.module.scss";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import Google from "../components/ui/icons/Google";
import TwitterBlue from "../components/ui/icons/TwitterBlue";

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession({ req: context.req });

  if (session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return {
    props: { csrfToken },
  };
}

export default function SignIn({ csrfToken }: any) {
  const [signInView, setSignInView] = useState(true);
  return (
    <div className={s.pageWrap}>
      {!signInView ? (
        <div className={s.signInForm}>
          <h1>Create Account</h1>
          <p>
            Create a Level 4 account today to make sure you don&apos;t miss out
            on exclusive product releases, as well as being able to save your
            design progress using our visualiser tool.
          </p>
          <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input type="email" id="email" name="email" placeholder="Email" />
            <button type="submit">Create account</button>
          </form>
          <p
            className={s.changeView}
            onClick={() => setSignInView(!signInView)}
          >
            Already have an account?
          </p>
          <div className={s.line}></div>
          <Button variant="secondary" onClick={() => signIn("google")}>
            Sign Up With Google <Google styles={s.providerLogo} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => signIn("twitter")}
            className={s.providerButton}
          >
            Sign Up With Twitter <TwitterBlue styles={s.providerLogo} />
          </Button>
        </div>
      ) : (
        <div className={s.signInForm}>
          <h1>Sign In</h1>
          <p>
            Sign in with your email to view your Level 4 designs and create
            more.
          </p>
          <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input type="email" id="email" name="email" placeholder="Email" />
            <button type="submit">Sign In</button>
          </form>
          <p
            className={s.changeView}
            onClick={() => setSignInView(!signInView)}
          >
            Dont have an account yet?
          </p>
          <div className={s.line}></div>
          <Button variant="secondary" onClick={() => signIn("google")}>
            Sign In With Google <Google styles={s.providerLogo} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => signIn("twitter")}
            className={s.providerButton}
          >
            Sign In With Twitter <TwitterBlue styles={s.providerLogo} />
          </Button>
        </div>
      )}
    </div>
  );
}
