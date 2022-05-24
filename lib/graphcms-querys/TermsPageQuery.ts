import graphcms from "../graph-ql";

const termsPageQuery = async () => {
  const { termsAndConditionsPages } = await graphcms.request(`
  query MyQuery {
    termsAndConditionsPages {
      content {
        html
      }
      id
      title
    }
  }
  
      `);
  return termsAndConditionsPages[0];
};

export default termsPageQuery;
