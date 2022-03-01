import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/mailingList";
import VideoHero from "../components/global/Video";
import collectionsQuery, {
  Collection,
} from "../lib/graphcms-querys/collectionsQuery";
import s from "../styles/pages/index.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const collections = await collectionsQuery();
  return {
    props: { collections },
    revalidate: 60,
  };
};

interface Props {
  collections: Collection[];
}

const Home: NextPage<Props> = ({ collections }) => {
  return (
    <div>
      <VideoHero />
      <CollectionsGrid collections={collections} />
      <MailingList />
    </div>
  );
};

export default Home;
