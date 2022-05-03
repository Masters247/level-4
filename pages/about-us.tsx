import type { GetStaticProps, NextPage } from "next";
import aboutUsQuery from "../lib/graphcms-querys/aboutPageQuery";
import Image from "next/image";
import MailingList from "../components/global/MailingList/MailingList";
import s from "../styles/pages/aboutUsPage.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const aboutUs = await aboutUsQuery();
  return {
    props: {
      aboutUs,
    },
  };
};

interface Props {
  aboutUs: any;
}

const AboutUs: NextPage<Props> = ({ aboutUs }) => {
  return (
    <div className={s.aboutUsPageWrap}>
      <section className={s.heroWrap}>
        <div className={s.heroText}>
          <h1>{aboutUs[0].title}</h1>
          <p>{aboutUs[0].titleText}</p>
        </div>
        <div className={s.heroImage}>
          <Image
            layout="responsive"
            alt=""
            src={aboutUs[0].heroImageMobile.url}
            placeholder="blur"
            blurDataURL={aboutUs[0].heroImageMobile.url}
            height={aboutUs[0].heroImageMobile.height}
            width={aboutUs[0].heroImageMobile.width}
          />
        </div>
      </section>
      <section className={s.gridWrap}>
        <div className={s.wrap}>
          <div className={s.textItem}>
            <h2>{aboutUs[0].categoryTitleOne}</h2>
            <p>{aboutUs[0].categoryTextOne}</p>
          </div>
          <div className={s.imageItem}>
            <Image
              layout="responsive"
              alt=""
              src={aboutUs[0].categoryImageOne.url}
              placeholder="blur"
              objectFit="cover"
              blurDataURL={aboutUs[0].categoryImageOne.url}
              height={aboutUs[0].categoryImageOne.height}
              width={aboutUs[0].categoryImageOne.width}
            />
          </div>
        </div>
        <div className={s.wrap}>
          <div className={`${s.textItem} ${s.textItemTwo}`}>
            <h2>{aboutUs[0].categoryTitleTwo}</h2>
            <p>{aboutUs[0].categoryTextTwo}</p>
          </div>
          <div className={`${s.imageItem} ${s.imageItemTwo}`}>
            <Image
              layout="responsive"
              objectFit="cover"
              alt=""
              src={aboutUs[0].categoryImageTwo.url}
              placeholder="blur"
              blurDataURL={aboutUs[0].categoryImageTwo.url}
              height={aboutUs[0].categoryImageTwo.height}
              width={aboutUs[0].categoryImageTwo.width}
            />
          </div>
        </div>
        <div className={s.wrap}>
          <div className={s.textItem}>
            <h2>{aboutUs[0].categoryTitleThree}</h2>
            <p>{aboutUs[0].categoryTextThree}</p>
          </div>
          <div className={s.imageItem}>
            <Image
              layout="responsive"
              objectFit="cover"
              alt=""
              src={aboutUs[0].categoryImageThree.url}
              placeholder="blur"
              blurDataURL={aboutUs[0].categoryImageThree.url}
              height={aboutUs[0].categoryImageThree.height}
              width={aboutUs[0].categoryImageThree.width}
            />
          </div>
        </div>
      </section>
      <MailingList />
    </div>
  );
};

export default AboutUs;
