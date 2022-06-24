import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import s from "../../styles/pages/account.module.scss";

const NewAccount: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/account/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          org,
          id: session?.user?.userId,
          email: session?.user?.email,
          newUser: true,
        }),
      });
      setLoading(false);
      router.push("/account");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className={s.pageWrap}>
      <div className={s.newAccountWrap}>
        <h1>You&apos;re almost finished creating your account...</h1>
        <h3>
          Please fill in the below fields to finish creating your Level 4
          account
        </h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="organisation">Organisation / Club</label>
          <input
            required
            type="text"
            id="organisation"
            name="organisation"
            placeholder="Organisation"
            onChange={(e) => setOrg(e.target.value)}
          />
          <Button
            Component="button"
            type="submit"
            variant={"primary"}
            className={s.button}
            loading={loading}
          >
            Complete Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewAccount;
