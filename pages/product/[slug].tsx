import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState } from "react";
import productQuery from "../../lib/graphcms-querys/productQuery";
import Slider from "../../components/slider/Slider/Slider";
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

// SLIDER PROPS CONTROLS

const Product: NextPage<Props> = ({ data }) => {
  const [productColour, setProductColour] = useState(0);
  const { product } = data;

  const hexOne = product.productVariantColours[0].colour.hex;
  const hexTwo = product.productVariantColours[1].colour.hex;
  const hexThree = product.productVariantColours[2].colour.hex;
  const hexFour = product.productVariantColours[3].colour.hex;

  const handleColourClick = (e: any, hex: any) => {
    if (hex === hexOne) {
      setProductColour(0);
    }
    if (hex === hexTwo) {
      setProductColour(1);
    }
    if (hex === hexThree) {
      setProductColour(2);
    }
    if (hex === hexFour) {
      setProductColour(3);
    }
  };

  const [autoPlay, setAutoPlay] = useState(true);
  const [time, setTime] = useState(7000);
  const [position, setPosition] = useState("absolute");
  const [height, setHeight] = useState("300px");
  const [width, setWidth] = useState("300px");

  const handleEnter = () => {
    setAutoPlay(false);
  };

  const handleLeave = () => {
    setAutoPlay(true);
  };

  const images = product.productVariantColours[0].images.map((i: any) => i.url);

  return (
    <div className={s.pageWrap}>
      <section
        className={s.hero}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <Slider
          width={width}
          height={height}
          autoPlay={autoPlay}
          numberOfSlides={images.length}
          slides={images}
          time={time}
          positioning={position}
        />
      </section>
      <section className={s.info}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>
      <section className={s.productColoursWrap}>
        <div className={s.productColoursButtons}>
          {product.productVariantColours.map((c: any, i: any) => {
            const hex = c.colour.hex;
            return (
              <div className={s.border} key={i}>
                <button
                  onClick={(e) => handleColourClick(e, hex)}
                  className={s.colour}
                  style={{
                    backgroundColor: `${c.colour.hex}`,
                  }}
                ></button>
              </div>
            );
          })}
        </div>
        <div className={s.productColours}>
          {product.productVariantColours[productColour].images.map(
            (image: any) => (
              <Image
                key={image.url}
                layout="responsive"
                src={image.url}
                height={200}
                width={200}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;
