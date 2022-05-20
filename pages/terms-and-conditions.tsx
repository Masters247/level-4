import { GetStaticProps, NextPage } from "next";
import termsPageQuery from "../lib/graphcms-querys/TermsPageQuery";
import s from "../styles/pages/termsPage.module.scss";
import ReactHtmlParser from "react-html-parser";

export const getStaticProps: GetStaticProps = async () => {
  const termsPage = await termsPageQuery();
  return {
    props: {
      termsPage,
    },
  };
};

interface Props {
  termsPage: {
    content: {
      html: string;
    };
    id: string;
    title: string;
  };
}

const Terms: NextPage<Props> = ({ termsPage }) => {
  return (
    <div className={s.pageWrap}>
      <h1>{termsPage.title}</h1>
      <div className={s.content}>{ReactHtmlParser(termsPage.content.html)}</div>
    </div>
  );
};

export default Terms;
