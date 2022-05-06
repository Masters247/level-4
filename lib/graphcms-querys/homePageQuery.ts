import graphcms from "../graph-ql";

const homePageQuery = async () => {
  const { homePages } = await graphcms.request(`
  query MyQuery {
    homePages {
      heroVideo {
        height
        width
        url
        fileName
      }
      heroImageMobile {
        url
        width
        height
      }
      collections {
        title
        slug
        heroImage {
          height
          url
          width
        }
      }
      featureBanner {
        buttonSlug
        buttonText
        heroTitle
        heroImage {
          height
          url
          width
        }
      }
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
  return homePages;
};

export default homePageQuery;
