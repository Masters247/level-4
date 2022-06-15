import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import {
  Category,
  categoryPagesSlugQuery,
} from "../../lib/graphcms-querys/categoryQuery";
import productsPagesQuery from "../../lib/graphcms-querys/productsPagesQuery";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Main category pages

  const categoryPages = await categoryPagesSlugQuery();

  const categoriesFields = categoryPages.map((category: Category) => ({
    loc: `${process.env.SITE_URL}/${category.categoriesSlug}`,
    lastmod: new Date().toISOString(),
  }));

  //   Main product pages

  const productsPages = await productsPagesQuery();

  const productFields = productsPages.map((product: any) => ({
    loc: `${process.env.SITE_URL}/${product.productCategory}/${product.productSlug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields: ISitemapField[] = [...categoriesFields, ...productFields];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
