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
import useSWR from "swr";
const download = require("downloadjs");

const fetcher = (email: any) => fetch(email).then((res) => res.json());

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
      productVariantColours {
        customImage {
          url(transformation: {image: {resize: {height: 500, width: 500}}})
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

  const queryGraphCms = await graphcms.request(query);

  return {
    props: { queryGraphCms, customPage },
    revalidate: 10,
  };
}

function useAccount(email: any) {
  const { data: user, error } = useSWR(
    `/api/account/user?email=${email}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user: user,
    isLoading: !error && !user,
    isError: error,
  };
}

interface Props {
  queryGraphCms?: any;
  customPage?: any;
}

const Custom: NextPage<Props> = ({ queryGraphCms, customPage }) => {
  const [downloadCustomImage, setDownloadCustomImage] = useState(false);
  const [saveCustomImage, setSaveCustomImage] = useState(false);
  // const [isSession, setIsSession] = useState(true);
  const [control, setControl] = useState(true);
  const { data: session }: any = useSession();
  const [colour, setColour] = useState(0);
  const { trendingStyle } = customPage[0];
  const { productPage } = queryGraphCms;

  const { name, productCategory, productSlug, productVariantColours } =
    productPage;

  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  const handleScreenShot = () => {
    setControl(false);
    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          download(image, `Level 4 | ${name}.jpeg`, "image/jpeg");
        })
        .then(() => setControl(true))
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    // Need this timeout to ensure the image is loaded
    setTimeout(() => takeScreenShot(), 1000);
  };

  const handleSaveCustomImage = () => {
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
        .then(() => setControl(true))
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    // Need this timeout to ensure the image is loaded
    setTimeout(() => takeScreenShot(), 1000);
  };

  return (
    <div className={s.pageWrap}>
      {saveCustomImage ? (
        <div className={s.pictureSavedModal}>
          <p>Customisation Saved</p>
        </div>
      ) : null}
      <ProductView
        image={productVariantColours[colour].customImage}
        productColoutVariants={productVariantColours}
        handleColourClick={handleColourClick}
        handleScreenShot={handleScreenShot}
        handleSaveCustomImage={handleSaveCustomImage}
        products={productPage}
        saveCustomImage={saveCustomImage}
        setControl={setColour}
        control={control}
      />
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
