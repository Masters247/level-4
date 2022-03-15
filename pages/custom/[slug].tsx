import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";
import ProductView from "../../components/productApp/ProductView/ProductView";
import productQuery from "../../lib/graphcms-querys/productQuery";
import html2canvas from "html2canvas";
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
    product(where: {productSlug: "${params.slug}"}) {
      productVariantColours {
        customImage {
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
  data?: any;
}

const Custom: NextPage<Props> = ({ data }) => {
  const [colour, setColour] = useState(0);

  // const [screenShot, setScreenShot] = useState(false);
  // const [screenShotImage, setScreenShotImage] = useState(null);
  const { product } = data;
  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  // const handleScreenShot = () => {
  //   setScreenShot(true);
  // };

  // useEffect(() => {
  //   {
  //     screenShot &&
  //       html2canvas(document.querySelector("#customView")).then(function (
  //         canvas
  //       ) {
  //         document.querySelector("#screenShot").appendChild(canvas);
  //         setScreenShotImage(canvas);
  //       });
  //   }
  //   setScreenShot(false);
  // }, [screenShot]);

  return (
    <div id="capture" className={s.pageWrap}>
      {/* <button onClick={handleScreenShot}>screenshot</button> */}
      <ProductView
        image={product?.productVariantColours[colour].customImage}
        productColoutVariants={product.productVariantColours}
        handleColourClick={handleColourClick}
      />
      <div id="screenShot" className="screenshot"></div>
    </div>
  );
};

export default Custom;
