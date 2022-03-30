import s from "../styles/pages/signIn.module.scss";
import { getProviders, getCsrfToken, signIn } from "next-auth/react";

export async function getServerSideProps(context: any) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

const SignIn = ({ providers, csrfToken }: any) => {
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
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignIn;
