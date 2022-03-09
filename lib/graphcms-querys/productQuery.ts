import graphcms from "../graph-ql";

const productQuery = async () => {
  const { products } = await graphcms.request(`
      query Category {
          products {
          productSlug
          }
        }
      `);
  return products;
};
export default productQuery;
