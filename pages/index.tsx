import type { GetStaticProps, NextPage } from "next";
import CollectionsGrid from "../components/global/CollectionsGrid";
import MailingList from "../components/global/MailingList/MailingList";
import VideoHero from "../components/global/Video";
import Link from "next/link";
import collectionsQuery, {
  Collection,
} from "../lib/graphcms-querys/collectionsQuery";
import categorySlugsQuery from "../lib/graphcms-querys/categoryQuery";
import s from "../styles/pages/index.module.scss";

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
      {/* <VideoHero />
      <CollectionsGrid collections={collections} />
      <MailingList /> */}
      <ul>
        {slugs.map((slug: any) => (
          <Link
            href={`/categories/${slug.categoriesSlug}`}
            key={slug.categoriesSlug}
          >
            <a>{slug.categoriesSlug}</a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
