import graphcms from "../graph-ql";

const categoryQuerySlug = async ({ variables }: any) => {
  const { categories } = await graphcms.request(`
        query Cat($slug: String!){
          categories (where: {slug : {eq:$slug}}){
            categoriesSlug
            heroImage {
              url
              width
              height
            }
            title
            heroText {
              html
            }
            productsTitles
          }
        }
      `);
  return categories;
};

export default categoryQuerySlug;
