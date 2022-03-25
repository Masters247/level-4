import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";
import ProductView from "../../components/productApp/ProductView/ProductView";
import productQuery from "../../lib/graphcms-querys/productQuery";
import s from "../../styles/pages/customPage.module.scss";
import html2canvas from "html2canvas";

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
      name
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
  const { product } = data;
  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  const [screenShot, setScreenShot] = useState(false);
  const [screenShotImage, setScreenShotImage] = useState(null);

  const handleScreenShot = () => {
    setScreenShot(true);
  };

  console.log(product);

  useEffect(() => {
    const documentCustom: any = document.querySelector("#customView");
    const documentScreen: any = document.querySelector("#screenShot");
    {
      screenShot &&
        html2canvas(documentCustom, {}).then((canvas: any) => {
          var image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

          /* this allows for the image to be downloaded */
          window.location.href = image;
          window.localStorage.setItem("image", image);
          // const newImage = window.localStorage.getItem("image");

          // console.log("Locally stored image", newImage);

          // documentScreen.appendChild(newImage);
        });
    }
    setScreenShot(false);
  }, [screenShot]);

  return (
    <div
      // id="capture"
      className={s.pageWrap}>
      <ProductView
        image={product?.productVariantColours[colour].customImage}
        productColoutVariants={product.productVariantColours}
        handleColourClick={handleColourClick}
        handleScreenShot={handleScreenShot}
      />
      <div id="screenShot" className="screenshot"></div>
    </div>
  );
};

export default Custom;
