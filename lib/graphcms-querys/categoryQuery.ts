import graphcms from "../graph-ql";

const categoryPagesSlugQuery = async () => {
  const { categoryPages } = await graphcms.request(`
      query {
        categoryPages {
          categoriesSlug
        }
      }
    `);
  return categoryPages;
};

export default categoryPagesSlugQuery;
