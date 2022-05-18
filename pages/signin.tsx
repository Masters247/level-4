import s from "../styles/pages/signIn.module.scss";
import {
  getProviders,
  getCsrfToken,
  signIn,
  useSession,
  getSession,
} from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import CreateAccountForm from "../components/global/CreateAccountForm/CreateAccountForm";
import { Button } from "../components/ui/Button";

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

export default function SignIn({ csrfToken }: any) {
  return (
    <div className={s.pageWrap}>
      <div className={s.signInForm}>
        <h1>Create Account</h1>
        <p>
          Create a Level 4 account today to make sure you don’t miss out on
          exclusive product releases, as well as being able to save your design
          progress using our visualiser tool.
        </p>
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>Email address</label>
          <input type="email" id="email" name="email" placeholder="Email" />

          <button type="submit">Sign in with Email</button>
        </form>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: any) {
//   const providers = await getProviders();
//   const csrfToken = await getCsrfToken(context);
//   return {
//     props: { providers, csrfToken },
//   };
// }

// export default function SignIn({ providers, csrfToken }: any) {
//   return <div></div>;
// }

// SignIn.getInitialProps = async (context: any) => {
//   const { req, res } = context;
//   const session = await getSession({ req });

//   if (session && res && session.accessToken) {
//     res.writehead(302, {
//       Location: "/",
//     });
//     res.end();
//     return;
//   }
//   return {
//     session: undefined,
//   };
// };

// const SignIn = ({ providers, csrfToken }: any) => {
//   const { data: session, status }: any = useSession();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSignIn = (id: any) => {
//     signIn(id);
//     setLoading(true);
//   };

//   if (status === "authenticated") {
//     router.push("/account");
//   }

//   return (
//     <div className={s.pageWrap}>
//       <div className={s.signInForm}>
//         <h1>Create Account</h1>
//         <p>
//           Create a Level 4 account today to make sure you don’t miss out on
//           exclusive product releases, as well as being able to save your design
//           progress using our visualiser tool.
//         </p>
//         <CreateAccountForm />
//         <div>
//           <form method="post" action="/api/auth/signin/email">
//             <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//             <label>
//               Email address
//               <input type="email" id="email" name="email" />
//             </label>
//             <button type="submit">Sign in with Email</button>
//           </form>
//           {/* {Object.values(providers).map((provider: any) => {
//             <button onClick={() => signIn(provider.id)}>
//               Sign in with {provider.name}
//             </button>;
//           })} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
