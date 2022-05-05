import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import collectionsQuery, {
  Collection,
} from "../lib/graphcms-querys/collectionsQuery";
import categorySlugsQuery from "../lib/graphcms-querys/categoryQuery";
import trendingQuery from "../lib/graphcms-querys/trendingStylesQuery";
import s from "../styles/pages/index.module.scss";
import TrendingStyle from "../components/global/TrendingStyle/TrendingStyle";
import LevelUp from "../components/global/LevelUp/LevelUp";
import levelUpQuery from "../lib/graphcms-querys/levelUpQuery";

export const getStaticProps: GetStaticProps = async () => {
  const collections = await collectionsQuery();
  const slugs = await categorySlugsQuery();
  const trendingStyles = await trendingQuery();
  const levelUp = await levelUpQuery();

  return {
    props: {
      collections,
      slugs,
      trendingStyles,
      levelUp,
    },
    revalidate: 60,
  };
};

interface Props {
  collections: Collection[];
  slugs: any;
  trendingStyles: any;
  levelUp: any;
}

const Home: NextPage<Props> = ({
  collections,
  slugs,
  trendingStyles,
  levelUp,
}) => {
  console.log(levelUp);
  return (
    <div>
      <VideoHero />
      <CollectionsGrid collections={collections} slugs={slugs} />
      <TrendingStyle radius={50} data={trendingStyles} category={false} />
      <LevelUp levelUp={levelUp} />
      <MailingList />
    </div>
  );
};

export default Home;
