import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import categorySlugsQuery from "../lib/graphcms-querys/categoryQuery";
import s from "../styles/pages/index.module.scss";
import homePageQuery from "../lib/graphcms-querys/homePageQuery";
import TrendingStyle from "../components/global/TrendingStyle/TrendingStyle";
import FeatureBanner from "../components/global/FeatureBanner/FeatureBanner";

export const getStaticProps: GetStaticProps = async () => {
  const homePages = await homePageQuery();
  const slugs = await categorySlugsQuery();

  return {
    props: {
      homePages,
      slugs,
    },
    revalidate: 60,
  };
};

interface Props {
  slugs: any;
  homePages: any;
}

const Home: NextPage<Props> = ({ slugs, homePages }) => {
  const { featureBanner, trendingStyle, collections, heroVideo } = homePages[0];

  return (
    <div>
      <VideoHero video={heroVideo} />
      <CollectionsGrid collections={collections} slugs={slugs} />
      <TrendingStyle
        radius={50}
        trendingStyle={trendingStyle}
        category={false}
      />
      <FeatureBanner featureBanner={featureBanner} />
      <MailingList />
    </div>
  );
};

export default Home;
