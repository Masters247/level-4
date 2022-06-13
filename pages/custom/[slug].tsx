import type { NextPage } from "next";
import ProductView from "../../components/productApp/ProductView/ProductView";
import trendingQuery from "../../lib/graphcms-querys/trendingStylesQuery";
import TrendingStyle from "../../components/global/TrendingStyle/TrendingStyle";
import productQuery from "../../lib/graphcms-querys/productsPagesQuery";
import s from "../../styles/pages/customPage.module.scss";
import { Button } from "../../components/ui/Button";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import customPageQuery from "../../lib/graphcms-querys/customPageQuery";
import html2canvas from "html2canvas";
import Link from "next/link";
const download = require("downloadjs");

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

  const customPage = await customPageQuery();

  const query = gql`
  query Product {
    productPage(where: {productSlug: "${params.slug}"}) {
      name
      productCategory
      productEmbelishment
      productVariantColours {
        customImage {
          url
        }
        colour {
          hex
        }
        secondaryColour {
          hex
        }
        shape
      }
    }
  }
  `;

  const queryGraphCms = await graphcms.request(query);

  return {
    props: { queryGraphCms, customPage },
    revalidate: 10,
  };
}

interface Props {
  queryGraphCms?: any;
  customPage?: any;
}

const Custom: NextPage<Props> = ({ queryGraphCms, customPage }) => {
  const [saveCustomImage, setSaveCustomImage] = useState(0);
  const [downloadCustomImage, setDownloadCustomImage] = useState(0);
  const [colourChangeProductVariant, setColourChangeProductVariant] =
    useState(0);
  const [control, setControl] = useState(true);
  const { data: session }: any = useSession();
  const [colour, setColour] = useState(0);
  const { trendingStyle } = customPage[0];
  const { productPage } = queryGraphCms;

  const { name, productCategory, productEmbelishment, productVariantColours } =
    productPage;

  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  const handleScreenShot = () => {
    setDownloadCustomImage(1);
    setControl(false);
    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          download(image, `Level 4 | ${name}.jpeg`, "image/jpeg");
          setDownloadCustomImage(2);
          setTimeout(() => setDownloadCustomImage(0), 2000);
        })
        .then(() => {
          setControl(true);
        })
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    setTimeout(() => takeScreenShot(), 1000);
  };

  const handleSaveCustomImage = () => {
    setSaveCustomImage(1);
    setControl(false);
    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          fetch("/api/productApp/customImage", {
            method: "POST",
            body: JSON.stringify({
              image,
              userId: session.user.userId,
              productName: name,
              productCategory,
            }),
            headers: { "Content-Type": "application/json" },
          });
        })
        .then(() => {
          setControl(true),
            setSaveCustomImage(2),
            setTimeout(() => setSaveCustomImage(0), 2000);
        })
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    setTimeout(() => takeScreenShot(), 1000);
  };

  return (
    <div className={s.pageWrap}>
      <div
        className={s.appWrap}
        style={{ paddingBottom: `${!session && "10em"}` }}
      >
        <ProductView
          control={control}
          download={downloadCustomImage}
          embelishment={productEmbelishment}
          handleColourClick={handleColourClick}
          handleScreenShot={handleScreenShot}
          handleSaveCustomImage={handleSaveCustomImage}
          image={productVariantColours[colour].customImage}
          products={productPage}
          productColoutVariants={productVariantColours}
          saved={saveCustomImage}
          setControl={setColour}
        />
      </div>

      {!session && (
        <div className={s.signIn}>
          <p>Please sign in to save custom images</p>
          <Link href="/signin" passHref>
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>
      )}
      <TrendingStyle category={true} trendingStyle={trendingStyle} />
    </div>
  );
};

export default Custom;
