import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import collectionsQuery, {
  Collection,
} from "../lib/graphcms-querys/collectionsQuery";
import categorySlugsQuery from "../lib/graphcms-querys/categoryQuery";
import s from "../styles/pages/index.module.scss";
import PictureGrid from "../components/global/PictureGrid/pictureGrid";
import { useSession, signIn, signOut } from "next-auth/react";

export const getStaticProps: GetStaticProps = async () => {
  const collections = await collectionsQuery();
  const slugs = await categorySlugsQuery();

  return {
    props: { collections, slugs },
    revalidate: 60,
  };
};

interface Props {
  collections: Collection[];
  slugs: any;
}

const Home: NextPage<Props> = ({ collections, slugs }) => {
  return (
    <div>
      <VideoHero />
      <CollectionsGrid collections={collections} />
      <PictureGrid title={"trending styles"} radius={"50%"} />
      <MailingList />
    </div>
  );
};

export default Home;
