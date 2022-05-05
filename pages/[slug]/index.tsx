import Image from "next/image";
import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import s from "../../styles/pages/categories.module.scss";
import Product from "../../components/productApp/Product/Product";
import categoryQuery from "../../lib/graphcms-querys/categoryQuery";
import trendingQuery from "../../lib/graphcms-querys/trendingStylesQuery";
import TrendingStyle from "../../components/global/TrendingStyle/TrendingStyle";

export async function getStaticPaths() {
  const categories = await categoryQuery();

  const paths = categories.map((c: any) => ({
    params: { slug: c.categoriesSlug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const graphcms = new GraphQLClient(`${process.env.GRAPHCMS_URL}`, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const trendingStyles = await trendingQuery();

  const query = gql`
  query Category {
    categories(where: {categoriesSlug: "${params.slug}"}) {
      title
      trendingStylesOneSlug
      trendingStylesTwoSlug
      trendingStylesThreeSlug
      trendingStylesFourSlug
      trendingStylesOne {
        height
        width
        url
      }
      trendingStylesTwo {
        height
        width
        url
      }
      trendingStylesThree {
        height
        width
        url
      }
      trendingStylesFour {
        height
        width
        url
      }
      heroImage {
        height
        width
        url
      }
      productsTitle
      heroText
      heroImageAltText
      products {
        productCategory
        productSlug
        name
        productVariantColours {
          images {
            height
            url
            width
          }
          colour {
            hex
          }
          secondaryColour {
            hex
          }
        }
      }
    }
  }
  `;

  const data = await graphcms.request(query);

  return {
    props: { data, trendingStyles },
    revalidate: 10,
  };
}

interface Props {
  data: any;
  trendingStyles: any;
}

const Category: NextPage<Props> = ({ data, trendingStyles }) => {
  const { categories } = data;

  return (
    <div className={s.categoriesPageWrap}>
      <section className={s.heroWrap}>
        <div className={s.heroText}>
          <h1>{categories[0].title}</h1>
          <p>{categories[0].heroText}</p>
        </div>
        <div className={s.heroImage}>
          <Image
            layout="responsive"
            alt={categories[0].heroImageAltText}
            src={categories[0].heroImage[0].url}
            placeholder="blur"
            blurDataURL={categories[0].heroImage[0].url}
            height={categories[0].heroImage[0].height}
            width={categories[0].heroImage[0].width}
          />
        </div>
      </section>
      <section className={s.categoriesProductsWrap}>
        <div className={s.productsTitleWrap}>
          <h2>{categories[0].productsTitle}</h2>
        </div>
        <div className={s.productsWrap}>
          {categories[0].products.map((products: any, i: any) => {
            return <Product key={i} products={products} i={i} />;
          })}
        </div>
      </section>
      <TrendingStyle data={trendingStyles} category={true} />
    </div>
  );
};

export default Category;
