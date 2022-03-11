import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";
import Visualise from "../../components/productApp/Visualise/Visualise";
import productQuery from "../../lib/graphcms-querys/productQuery";
import ProductColourButtons from "../../components/products/Product/ProductColourButtons";
import SliderContainer from "../../components/slider/SlideContainer/SliderContainer";
import Image from "next/image";
import s from "../../styles/pages/productPage.module.scss";
import Personal from "../../components/productApp/Personal/Personal";
import { useWindowSize } from "react-use";

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
        featureImage {
          height
          url
          width
        }
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
  const { width, height } = useWindowSize();
  const [productColour, setProductColour] = useState(0);
  const { product } = data;

  const handleColourClick = (e: any, i: any) => {
    setProductColour(i);
  };

  // const images = product.productVariantColours[0].images.map((i: any) => i.url);
  const images = product.featureImage.map((i: any) => i.url);

  const colourLength = product.productVariantColours.length;

  const imagesLength =
    product.productVariantColours[productColour].images.length;

  console.log(product);

  return (
    <div className={s.pageWrap}>
      <SliderContainer
        autoPlay={true}
        time={4000}
        position={"absolute"}
        height={"300px"}
        width={"300px"}
        slides={images}
      />
      <section className={s.info}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>
      <section className={s.productImagesWrap}>
        <div
          className={s.productColoursButtons}
          style={{
            left: `${
              width < 650
                ? `calc(50% - ((${colourLength} * 24px) / 2))`
                : "20px"
            }`,
            top: `${
              width < 650
                ? "-35px"
                : `calc(50% - ((${colourLength} * 24px) / 2))`
            }`,
          }}
        >
          {product.productVariantColours.map((c: any, i: any) => {
            return (
              <ProductColourButtons
                key={i}
                i={i}
                hex={c.colour.hex}
                handleColourClick={handleColourClick}
              />
            );
          })}
        </div>
        <div
          className={s.productImagesWrap}
          style={{
            gridTemplateColumns: `repeat(${imagesLength}, 1fr)`,
            maxWidth: `calc((300px * ${imagesLength}) + (${
              imagesLength - 1
            } * 1em))`,
            gridGap: "1em",
            margin: " 0 auto",
          }}
        >
          {product.productVariantColours[productColour].images.map(
            (image: any) => (
              <Image
                key={image.url}
                layout="responsive"
                src={image.url}
                height={200}
                width={200}
                placeholder="blur"
                blurDataURL={image.url}
              />
            )
          )}
        </div>
      </section>
      <Visualise />
      <Personal />
    </div>
  );
};

export default Product;
