import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import s from "../../styles/pages/signIn.module.scss";

const NewPassword: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

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
      const reset = await fetch(`/api/account/password-reset`, {
        method: "POST",
        body: JSON.stringify(password),
        headers: { "Content-Type": "application/json" },
      });

      const res = await reset.json();

      await signIn("credentials", {
        ...res,
        callbackUrl: "/account",
      });
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Reset Password</h1>
        <p>
          Once you have reset your pass you will be automatically signed in.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p className={s.error}>Invalid token or password</p>}
          {passwordError && (
            <p className={s.error}>
              Must be at least 8 characters long and contain numbers
            </p>
          )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password*"
            minLength={8}
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
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
