import type { NextPage } from "next";
import Product from "../../components/products/Product/Product";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import s from "../../styles/pages/categories.module.scss";
import categoryQuery from "../../lib/graphcms-querys/categoryQuery";
import { useState } from "react";

export async function getStaticPaths() {
  const categories = await categoryQuery();

  const paths = categories.map((s: any) => ({
    params: { slug: s.categoriesSlug },
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
    categories(where: {categoriesSlug: "${params.slug}"}) {
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
        }
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
          {categories[0].products.map((p: any, i: any) => {
            const num = 0;
            const product = i;

            return <Product key={i} p={p} i={i} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Category;
