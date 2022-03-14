import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState } from "react";
import ProductView from "../../components/productApp/ProductView/ProductView";
import productQuery from "../../lib/graphcms-querys/productQuery";
import Image from "next/image";
import s from "../../styles/pages/productPage.module.scss";

export async function getStaticPaths() {
  const products = await productQuery();

  const paths = products.map((s: any) => ({
    params: { slug: s.productSlug },
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
    query Product {
      product(where: { productSlug: "${params.slug}" }) {
        featureImage {
          height
          url
          width
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

const Custom: NextPage<Props> = ({ data }) => {
  const { product } = data;

  return (
    <div className={s.pageWrap}>
      <ProductView image={product.featureImage[0]} />
    </div>
  );
};

export default Custom;
