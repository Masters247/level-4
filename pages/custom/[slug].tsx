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
        name
        description
        productVariantColours {
          images {
            url
            width
            height
          }
          colour {
            hex
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

const Product: NextPage<Props> = ({ data }) => {
  const [productColour, setProductColour] = useState(0);
  const { product } = data;

  const images = product.productVariantColours[0].images.map((i: any) => i.url);

  return (
    <div className={s.pageWrap}>
      <ProductView />
      <section className={s.info}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>
    </div>
  );
};

export default Product;
