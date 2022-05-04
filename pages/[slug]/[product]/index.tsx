import ProductColourButtonsWrap from "../../../components/productApp/ProductColourButtons/ProductColourButtons";
import SliderContainer from "../../../components/slider/SlideContainer/SliderContainer";
import Visualise from "../../../components/productApp/Visualise/Visualise";
import Personal from "../../../components/productApp/Personal/Personal";
import productQuery from "../../../lib/graphcms-querys/productQuery";
import s from "../../../styles/pages/productPage.module.scss";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";

export async function getStaticPaths() {
  const products = await productQuery();

  const paths = products.map((p: any) => ({
    params: {
      slug: p.productCategory,
      product: p.productSlug,
    },
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
      product(where: { productSlug: "${params.product}" }) {
        name
        description
        productSlug
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
          secondaryColour {
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

  const handleColourClick = (e: any, i: any) => {
    setProductColour(i);
  };

  const images = product.featureImage.map((i: any) => i.url);

  const imagesLength =
    product.productVariantColours[productColour].images.length;

  return (
    <div className={s.pageWrap}>
      <SliderContainer
        autoPlay={true}
        time={4000}
        position={"absolute"}
        slides={images}
      />
      <section className={s.info}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>

      <section
        className={s.productImagesSection}
        style={{
          position: "relative",
        }}
      >
        <div className={s.productImagesBackgroundWrap}>
          <div className={s.productColourWrap}>
            <ProductColourButtonsWrap
              products={product}
              colourClick={handleColourClick}
              rotate={s.rotate}
            />
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
                  alt=""
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
        </div>
      </section>
      <Visualise slug={product.productSlug} />
      <Personal />
    </div>
  );
};

export default Product;
