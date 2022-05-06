import graphcms from "../graph-ql";

const productsPagesQuery = async () => {
  const { productsPages } = await graphcms.request(`
  query MyQuery {
    productsPages {
      productSlug
      productCategory
    }
  }
      `);
  return productsPages;
};
export default productsPagesQuery;
