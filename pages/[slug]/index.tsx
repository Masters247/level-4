import Image from "next/image";
import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import s from "../../styles/pages/categories.module.scss";
import Product from "../../components/productApp/Product/Product";
import categoryPagesSlugQuery from "../../lib/graphcms-querys/categoryQuery";
import MailingList from "../../components/global/MailingList/MailingList";
import TrendingStyle from "../../components/global/TrendingStyle/TrendingStyle";

export async function getStaticPaths() {
  const categoryPages = await categoryPagesSlugQuery();

  const paths = categoryPages.map((c: any) => ({
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

  const query = gql`
  query Category {
    categoryPages(where: {categoriesSlug: "${params.slug}"}) {
      title
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
  `;

  const data = await graphcms.request(query);

  return {
    props: { data },
    revalidate: 10,
  };
}

interface Props {
  data: any;
}

const Category: NextPage<Props> = ({ data }) => {
  const { categoryPages } = data;

  const { trendingStyle } = categoryPages[0];

  return (
    <div className={s.categoriesPageWrap}>
      <section className={s.heroWrap}>
        <div className={s.heroText}>
          <h1>{categoryPages[0].title}</h1>
          <p>{categoryPages[0].heroText}</p>
        </div>
        <div className={s.heroImage}>
          <Image
            layout="responsive"
            alt={categoryPages[0].heroImageAltText}
            src={categoryPages[0].heroImage[0].url}
            placeholder="blur"
            blurDataURL={categoryPages[0].heroImage[0].url}
            height={categoryPages[0].heroImage[0].height}
            width={categoryPages[0].heroImage[0].width}
          />
        </div>
      </section>
      <section className={s.categoriesProductsWrap}>
        <div className={s.productsTitleWrap}>
          <h2>{categoryPages[0].productsTitle}</h2>
        </div>
        <div className={s.productsWrap}>
          {categoryPages[0].products.map((products: any, i: any) => {
            return <Product key={i} products={products} i={i} />;
          })}
        </div>
      </section>
      <TrendingStyle trendingStyle={trendingStyle} category={true} />
      <MailingList />
    </div>
  );
};

export default Category;
