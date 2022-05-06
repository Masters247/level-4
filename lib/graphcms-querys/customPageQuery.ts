import graphcms from "../graph-ql";

const customPageQuery = async () => {
  const { customPages } = await graphcms.request(`
    query MyQuery {
        customPages {
          trendingStyle {
            trendingStylesFourImage {
              height
              url
              width
            }
            trendingStylesFourSlug
            trendingStylesOneImage {
              height
              url
              width
            }
            trendingStylesOneSlug
            trendingStylesThreeImage {
              url
              width
              height
            }
            trendingStylesThreeSlug
            trendingStylesTwoImage {
              url
              width
              height
            }
            trendingStylesTwoSlug
            trendingStyleTitle
          }
        }
      }
    `);
  return customPages;
};

export default customPageQuery;
