import ProductColourButtonsWrap from "../../../components/productApp/ProductColourButtons/ProductColourButtons";
import SliderContainer from "../../../components/slider/SlideContainer/SliderContainer";
import Visualise from "../../../components/productApp/Visualise/Visualise";
import s from "../../../styles/pages/productPage.module.scss";
import FeatureBanner from "../../../components/global/FeatureBanner/FeatureBanner";

import MailingList from "../../../components/global/MailingList/MailingList";
import productsPagesQuery from "../../../lib/graphcms-querys/productsPagesQuery";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  const productsPages = await productsPagesQuery();

  const paths = productsPages.map((p: any) => ({
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
      productPage(where: { productSlug: "${params.product}" }) {
        name
        description
        productSlug
        featureBanner {
          heroTitle
          buttonSlug
          buttonText
          heroImage {
            height
            url
            width
          }
        }
        featureImage {
          height
          width
          url
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
        visualiseImage {
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
  data?: any;
}

const Product: NextPage<Props> = ({ data }) => {
  const [productColour, setProductColour] = useState(0);
  const { productPage } = data;
  const {
    featureImage,
    featureBanner,
    productVariantColours,
    name,
    description,
    productSlug,
    visualiseImage,
  } = productPage;

  const handleColourClick = (e: any, i: any) => {
    setProductColour(i);
  };

  const images = featureImage.map((i: any) => i.url);

  const imagesLength = productVariantColours[productColour].images.length;

  return (
    <div className={s.pageWrap}>
      <SliderContainer
        autoPlay={true}
        time={4000}
        position={"absolute"}
        slides={images}
      />
      <section className={s.info}>
        <h1>{name}</h1>
        <p>{description}</p>
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
              products={productPage}
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
            {productVariantColours[productColour].images.map((image: any) => (
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
            ))}
          </div>
        </div>
      </section>
      <Visualise slug={productSlug} image={visualiseImage} />
      {featureBanner === null ? null : (
        <FeatureBanner featureBanner={featureBanner} />
      )}

      {/* SEO */}

      <NextSeo
        title={`Level 4 | ${productPage.name}`}
        description={productPage.description}
        openGraph={{
          title: `${productPage.name}`,
          description: `${productPage.description}`,
        }}
      />
    </div>
  );
};

export default Product;
