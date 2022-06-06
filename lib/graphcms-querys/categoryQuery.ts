import graphcms from "../graph-ql";

const categoryPagesSlugQuery = async () => {
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
};

export default categoryPagesSlugQuery;
