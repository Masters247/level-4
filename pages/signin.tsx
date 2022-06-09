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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");

  const handleSubmit = async (e: any, register: boolean) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (register) {
        await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
            organisation,
          }),
        });
      }
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
      {!signInView ? (
        <div className={s.signInForm}>
          <h1>Create Account</h1>
          <p>
            Create a Level 4 account today to make sure you don&apos;t miss out
            on exclusive product releases, as well as being able to save your
            design progress using our visualiser tool.
          </p>
          <form onSubmit={(e) => handleSubmit(e, true)}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="text"
              id="organisation"
              name="organisation"
              placeholder="Organisation/Club"
              onChange={(e) => setOrganisation(e.target.value)}
            />
            <Button
              type="submit"
              Component="button"
              variant={"primary"}
              style={{ width: "100%" }}
              loading={loading}
              className={s.button}
            >
              Sign Up
            </Button>
          </form>
          <p
            className={s.changeView}
            onClick={() => setSignInView(!signInView)}
          >
            Already have an account?
          </p>
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
      ) : (
        <div className={s.signInForm}>
          <h1>Sign In</h1>
          <p>
            Sign in with your email and password to view your Level 4 designs
            and create more.
          </p>
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
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
          <p
            className={s.changeView}
            onClick={() => setSignInView(!signInView)}
          >
            Dont have an account yet?
          </p>
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
      )}
    </div>
  );
}
