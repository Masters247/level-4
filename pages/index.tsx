import type { NextPage } from "next";
import s from "../styles/pages/index.module.scss";

const Home: NextPage = () => {
  return (
    <div className={s.pageWrap}>
      <p>Home Page</p>
    </div>
  );
};

export default Home;
