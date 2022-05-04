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
import PictureGrid from "../components/global/PictureGrid/pictureGrid";

export const getStaticProps: GetStaticProps = async () => {
  const collections = await collectionsQuery();
  const slugs = await categorySlugsQuery();
  const trendingStyles = await trendingQuery();

  return {
    props: { collections, slugs, trendingStyles },
    revalidate: 60,
  };
};

interface Props {
  collections: Collection[];
  slugs: any;
  trendingStyles: any;
}

const Home: NextPage<Props> = ({ collections, slugs, trendingStyles }) => {
  return (
    <div>
      <VideoHero />
      <CollectionsGrid collections={collections} slugs={slugs} />
      <PictureGrid radius={"50%"} data={trendingStyles} category={false} />
      <MailingList />
    </div>
  );
};

export default Home;
