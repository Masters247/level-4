import graphcms from "../graph-ql";

const contactUsQuery = async () => {
  const { contactUsPages } = await graphcms.request(`
        query MyQuery {
            contactUsPages {
                title
                mainText
                titleTwo
                telephone
                textTwo
                titleThree
                email
            }   
        }
      `);
  return contactUsPages;
};

export default contactUsQuery;
