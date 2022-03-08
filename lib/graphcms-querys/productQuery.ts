import graphcms from "../graph-ql";

const productQuery = async () => {
  const { products } = await graphcms.request(`
    query {
      products {
        name
        productSlug
        description {
          html
        }
        productVariantColours {
          hexCode {
            hex {
              hex
            }
          }
          images {
            url
            width
            height
          }
        }
      }
    }
    `);
  return products;
};

export default productQuery;
