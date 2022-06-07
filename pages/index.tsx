import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import {
  categorySlugQuery,
  Category,
} from "../lib/graphcms-querys/categoryQuery";
import homePageQuery from "../lib/graphcms-querys/homePageQuery";
import TrendingStyle from "../components/global/TrendingStyle/TrendingStyle";
import FeatureBanner from "../components/global/FeatureBanner/FeatureBanner";

export const getStaticProps: GetStaticProps = async () => {
  const homePages = await homePageQuery();
  const categories = await categorySlugQuery();

  return {
    props: {
      homePages,
      categories,
    },
    revalidate: 60,
  };
};

interface Props {
  categories: Category[];
  homePages: any;
}

const Home: NextPage<Props> = ({ categories, homePages }) => {
  const { featureBanner, trendingStyle, heroVideo } = homePages[0];

  return (
    <>
      <VideoHero video={heroVideo} />
      <CollectionsGrid collections={categories} />
      <TrendingStyle
        radius={50}
        trendingStyle={trendingStyle}
        category={false}
      />
      <FeatureBanner featureBanner={featureBanner} />
      <MailingList />
    </>
  );
};

export default Home;
