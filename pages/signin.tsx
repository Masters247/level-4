import s from "../styles/pages/signIn.module.scss";
import {
  getProviders,
  getCsrfToken,
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

const SignIn = ({ providers, csrfToken }: any) => {
  const { data: session, status }: any = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = (id: any) => {
    signIn(id);
    setLoading(true);
  };

  console.log("hello test");

  if (status === "authenticated") {
    router.push("/account");
  }

  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Create Account</h1>
        <p>
          Create a Level 4 account today to make sure you don’t miss out on
          exclusive product releases, as well as being able to save your design
          progress using our visualiser tool.
        </p>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name} className={s.providerWrap}>
            {loading ? (
              <div className={s.loggingIn}>
                <Image src={"/loadingIcon.gif"} width={50} height={50} alt="" />
              </div>
            ) : (
              <button onClick={() => handleSignIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignIn;
