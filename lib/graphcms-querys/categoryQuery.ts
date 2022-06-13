import graphcms from "../graph-ql";

export const categoryPagesSlugQuery = async () => {
  const { categoryPages } = await graphcms.request(`
      query {
        categoryPages {
          categoriesSlug
          id
          title
          heroImage {
            height
            id
            url(transformation: {image: {resize: {fit: crop, height: 400, width: 400}}})
            width
          }
          homePageOrLinkImage {
            height
            width
            url(transformation: {image: {resize: {fit: crop, height: 400, width: 400}}})
            id
          }
        }
      }
    `);
  return categoryPages;
};

export const categorySlugQuery = async () => {
  const { categoryPages } = await graphcms.request(`
      query {
        categoryPages(first: 4) {
          categoriesSlug
          id
          title
          homePageOrLinkImage {
            height
            width
            url
          }
          heroImage {
            height
            id
            url
            width
          }
        }
      }
    `);
  return categoryPages;
};

export type Category = {
  id: string;
  categoriesSlug: string;
  title: string;
  heroImage: [
    {
      height: number;
      id: string;
      url: string;
      width: number;
    }
  ];
  homePageOrLinkImage: {
    height: number;
    url: string;
    width: number;
  };
};

// export default categoryPagesSlugQuery;
