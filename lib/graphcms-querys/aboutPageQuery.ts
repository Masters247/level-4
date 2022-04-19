import graphcms from "../graph-ql";

const aboutUsQuery = async () => {
    const {aboutUsPages} = await graphcms.request(`
        query MyQuery {
        aboutUsPages {
            title
            titleText
            heroImageMobile {
                url
                width
                height
          }
          categoryTitleOne
          categoryTextOne
          categoryImageOne {
            url
            width
            height
          }
          categoryTitleTwo
          categoryTextTwo
          categoryImageTwo {
            url
            width
            height
          }
          categoryTitleThree
          categoryTextThree
          categoryImageThree {
            url
            width
            height
          }
        }
      }
      `);
      return aboutUsPages

} 

export default aboutUsQuery;