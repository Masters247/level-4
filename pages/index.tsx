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
import { LocalBusinessJsonLd } from "next-seo";

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

      {/* SEO */}

      <LocalBusinessJsonLd
        type="SportingGoodsStore"
        id="http://level-four.co.uk"
        name="Level 4"
        description="Level 4 personalisation is our bespoke and custom service that gives you the finest quality products designed to meet your requirements"
        address={{
          streetAddress: "Serbert Road",
          addressLocality: "Portishead",
          addressRegion: "Bristol",
          postalCode: "BS20 7GG",
          addressCountry: "GB",
        }}
      />
    </>
  );
};

export default Home;
