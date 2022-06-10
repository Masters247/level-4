import s from "../styles/pages/signIn.module.scss";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import Google from "../components/ui/icons/Google";
import TwitterBlue from "../components/ui/icons/TwitterBlue";
import { useRouter } from "next/router";
import Link from "next/link";
import Eye from "../components/ui/icons/eye";

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

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const router = useRouter();
  const authError = router.query.error;
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const passes = password.match("^(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    if (!passes) {
      setPasswordError(true);
      setLoading(false);
      return;
    } else {
      setPasswordError(false);
    }
    try {
      await fetch("api/account/register", {
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

      await signIn("credentials", {
        email,
        password,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Create Account</h1>
        <p>
          Create a Level 4 account today to make sure you don&apos;t miss out on
          exclusive product releases, as well as being able to save your design
          progress using our visualiser tool.
        </p>
        <form onSubmit={handleSubmit}>
          {authError && <p className={s.error}>Invalid password or email</p>}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {passwordError && (
            <p className={s.error}>
              Must be at least 8 characters long and contain numbers
            </p>
          )}

          <div className={s.passWrapper}>
            <input
              required
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password*"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={s.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye />
            </div>
          </div>

          <input
            required
            autoComplete="name"
            type="text"
            id="name"
            name="name"
            placeholder="Name*"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="text"
            id="organisation"
            name="organisation"
            placeholder="Organisation/Club*"
            onChange={(e) => setOrganisation(e.target.value)}
          />
          <Button
            type="submit"
            Component="button"
            variant={"primary"}
            style={{ width: "100%" }}
            loading={loading}
          >
            Sign Up
          </Button>
        </form>
        <Link href="/signin" passHref>
          <p className={s.changeView}>Already have an account?</p>
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
