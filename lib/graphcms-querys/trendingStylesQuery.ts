import graphcms from "../graph-ql";

const trendingQuery = async () => {
  const { trendingStyles } = await graphcms.request(`
    query MyQuery {
        trendingStyles {
          trendingStyleTitle
          trendingStylesFourSlug
          trendingStylesOneSlug
          trendingStylesThreeSlug
          trendingStylesTwoSlug
          trendingStylesFourImage {
            height
            url
            width
          }
          trendingStylesOneImage {
            height
            url
            width
          }
          trendingStylesTwoImage {
            url
            width
            height
          }
          trendingStylesThreeImage {
            height
            url
            width
          }
        }
      }
    `);
  return trendingStyles;
};

export default trendingQuery;
