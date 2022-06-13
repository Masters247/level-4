import graphcms from "../graph-ql";

const customisePageQuery = async (params: string) => {
  console.log("params", params);

  const { customisePages } = await graphcms.request(`
  query Product {
    productPage(where: {productSlug: "${params}"}) {
      name
      productCategory
      productEmbelishment
      productVariantColours {
        customImage {
          url(transformation: {image: {resize: {height: 500, width: 500}}})
        }
        colour {
          hex
        }
        secondaryColour {
          hex
        }
        shape
      }
    }
  }
    `);
  return customisePages;
};

export default customisePageQuery;
