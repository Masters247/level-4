import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import ContactForm from "../components/global/ContactForm/ContactForm";
import contactUsQuery from "../lib/graphcms-querys/contactPageQuery";
import s from "../styles/pages/contactUsPage.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const contactUs = await contactUsQuery();
  return {
    props: {
      contactUs,
    },
  };
};

interface Props {
  contactUs: any;
}

const ContactUs: NextPage<Props> = ({ contactUs }) => {
  return (
    <div className={s.contactUsPageWrap}>
      <section className={s.detailsWrap}>
        <div className={s.title}>
          <h1>{contactUs[0].title}</h1>
          <p>{contactUs[0].mainText}</p>
        </div>
        <div className={s.contactDetails}>
          <h2>{contactUs[0].titleTwo}</h2>
          <p>{contactUs[0].telephone}</p>
          <p>{contactUs[0].textTwo}</p>
          <h2>{contactUs[0].titleThree}</h2>
          <p>{contactUs[0].email}</p>
        </div>
      </section>
      <section className={s.form}>
        <ContactForm />
      </section>

      {/* SEO */}

      <NextSeo
        title={`Level 4 | Contact Us`}
        openGraph={{
          title: `Level 4 | Contact Us`,
        }}
      />
    </div>
  );
};

export default ContactUs;
