import type { NextPage } from "next";
import ProductView from "../../components/productApp/ProductView/ProductView";
import TrendingStyle from "../../components/global/TrendingStyle/TrendingStyle";
import productQuery from "../../lib/graphcms-querys/productsPagesQuery";
import s from "../../styles/pages/customPage.module.scss";
import { Button } from "../../components/ui/Button";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import customPageQuery from "../../lib/graphcms-querys/customPageQuery";
import customisePageQuery from "../../lib/graphcms-querys/customisePageQuery";
import html2canvas from "html2canvas";
import Link from "next/link";
import { useStore } from "../../components/productApp/store";

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
          url(transformation: {image: {resize: {height: 500, width: 500}}})
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

  const customisePages = await graphcms.request(query);

  return {
    props: { customisePages, customPage },
    revalidate: 10,
  };
}

interface Props {
  customisePages?: any;
  customPage?: any;
}

const Custom: NextPage<Props> = ({ customisePages, customPage }) => {
  const { data: session }: any = useSession();

  const [showHideDragResizeDiv, setShowHidDragResizeDiv] = useState(true);

  const { productPage } = customisePages;

  const { name, productCategory, productEmbelishment, productVariantColours } =
    productPage;

  const store = useStore();

  const { trendingStyle } = customPage[0];

  useEffect(() => {
    const embelishment =
      productEmbelishment === null ? "Embroidered" : productEmbelishment;
    store.setProductEmbelishment(embelishment);
    store.setProductName(name);
  }, []);

  const handleScreenShot = () => {
    store.setDownloadCustomImage(1);

    setShowHidDragResizeDiv(false);

    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          download(image, `Level 4 | ${name}.jpeg`, "image/jpeg");
          store.setDownloadCustomImage(2);
          setTimeout(() => store.setDownloadCustomImage(0), 2000);
        })
        .then(() => {
          setShowHidDragResizeDiv(true);
        })
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    setTimeout(() => takeScreenShot(), 1000);
  };

  const handleSaveCustomImage = () => {
    store.setSaveCustomImage(1);

    setShowHidDragResizeDiv(false);

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
          setShowHidDragResizeDiv(true),
            store.setSaveCustomImage(2),
            setTimeout(() => store.setSaveCustomImage(0), 2000);
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
        style={{ paddingBottom: `${!session && "10em"}` }}>
        <ProductView
          handleScreenShot={handleScreenShot}
          handleSaveCustomImage={handleSaveCustomImage}
          image={productVariantColours[store.productColour].customImage}
          products={productPage}
          showHideDragResizeDiv={showHideDragResizeDiv}
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
