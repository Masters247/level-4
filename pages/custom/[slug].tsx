import type { NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect, createContext } from "react";
import ProductView from "../../components/productApp/ProductView/ProductView";
import assetUpload from "../../lib/graphcms-uploads-mutations/upload";
import productQuery from "../../lib/graphcms-querys/productQuery";
import s from "../../styles/pages/customPage.module.scss";
import html2canvas from "html2canvas";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

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

  const handleSaveCustomImage = () => {
    console.log("save click");
  };

  const handleScreenShot = () => {
    setScreenShot(true);
  };

  useEffect(() => {
    const documentCustom: any = document.querySelector("#capture");
    // const documentScreen: any = document.querySelector("#screenShot");
    {
      screenShot &&
        html2canvas(documentCustom, {}).then((canvas: any) => {
          var image = canvas
            .toDataURL("image/jpeg")
            .replace("image/jpeg", "image/octet-stream");

          /* this allows for the image to be downloaded */
          window.location.href = image;
          // window.localStorage.setItem("image", image);

          assetUpload(image);
          // const newImage = window.localStorage.getItem("image");

          // console.log("Locally stored image", newImage);

          // documentScreen.appendChild(newImage);
        });
    }
    setScreenShot(false);
  }, [screenShot]);

  return (
    <div className={s.pageWrap}>
      <ProductView
        image={product?.productVariantColours[colour].customImage}
        productColoutVariants={product.productVariantColours}
        handleColourClick={handleColourClick}
        handleScreenShot={handleScreenShot}
        handleSaveCustomImage={handleSaveCustomImage}
        products={product}
      />
    </div>
  );
};

export default Custom;
