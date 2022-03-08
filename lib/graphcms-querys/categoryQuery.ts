import graphcms from "../graph-ql";

const categoryQuery = async () => {
  const { categories } = await graphcms.request(`
      query {
        categories {
          categoriesSlug
        }
      }
    `);
  return categories;
};

export default categoryQuery;
