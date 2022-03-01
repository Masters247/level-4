import type { NextPage } from "next";
import MailingList from "../components/global/MailingList/mailingList";
import s from "../styles/pages/index.module.scss";

const Home: NextPage = () => {
  return (
    <div className={s.pageWrap}>
      <p>Home Page</p>
      <MailingList />
    </div>
  );
};

export default Home;
