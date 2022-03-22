import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import collectionsQuery, {
  Collection,
} from "../lib/graphcms-querys/collectionsQuery";
import categorySlugsQuery from "../lib/graphcms-querys/categoryQuery";
import s from "../styles/pages/index.module.scss";
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

function AuthLinks() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;

  return (
    <>
      <h1>Test</h1>
      {session ? (
        <p>
          <span>Signed in as {session?.user?.email}</span>
          <button onClick={signOut}>Sign out</button>
        </p>
      ) : (
        <>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
    </>
  );
}

const Home: NextPage<Props> = ({ collections, slugs }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <AuthLinks />
      {/* <VideoHero />
      <CollectionsGrid collections={collections} />
      <MailingList /> */}
    </div>
  );
};

export default Home;
