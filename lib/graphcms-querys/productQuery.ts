import graphcms from "../graph-ql";

const productQuery = async () => {
  const { products } = await graphcms.request(`
      query Category {
          products {
            productCategory
            productSlug
          }
        }
      `);
  return products;
};
export default productQuery;
