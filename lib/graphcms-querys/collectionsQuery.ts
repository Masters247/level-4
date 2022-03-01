import graphcms from "../graph-ql";

const collectionsQuery = async () => {
  const { collections } = await graphcms.request(`
    query {
      collections {
        id
        slug
        shortDesctiption
        title
        heroImage {
          height
          id
          url
          width
        }
      }
    }
  `);

  return collections;
};

export type Collection = {
  id: string;
  slug: string;
  shortDesctiption: string;
  title: string;
  heroImage: {
    height: number;
    id: string;
    url: string;
    width: number;
  };
};

export default collectionsQuery;
