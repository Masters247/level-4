import { NextPage } from "next";
import s from "../../styles/pages/account.module.scss";

const VerifyRequest: NextPage = () => {
  return (
    <div className={s.pageWrap}>
      <div className={s.newAccountWrap}>
        <h1>Check your email</h1>
        <h3>A sign in link has been sent to your email address.</h3>
      </div>
    </div>
  );
};

export default VerifyRequest;
