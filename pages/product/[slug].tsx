import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import productQuery from "../../lib/graphcms-querys/productQuery";
import Slider from "../../components/slider/Slider/Slider";
import ProductColourButtons from "../../components/products/Product/ProductColourButtons";
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
const autoPlay = true;
const time = 7000;
const position = "absolute";
const height = "300px";
const width = "300px";

const Product: NextPage<Props> = ({ data }) => {
  const { product } = data;

  const images = product.productVariantColours[0].images.map((i: any) => i.url);

  const handleColourClick = () => {
    console.log("click");
  };

  return (
    <div className={s.pageWrap}>
      <section className={s.hero}>
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
          {product.productVariantColours.map((c: any, i: any) => (
            <div className={s.border} key={i}>
              <button
                className={s.colour}
                style={{
                  backgroundColor: `${c.colour.hex}`,
                }}
              ></button>
            </div>
          ))}
        </div>
        <div className={s.productColours}>
          {product.productVariantColours[0].images.map((image: any) => (
            <Image
              key={image.url}
              layout="responsive"
              src={image.url}
              height={200}
              width={200}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
