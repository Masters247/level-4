import cn from "classnames";
import ProductView from "../../components/VisualiserApp/GlobalView/GlobalView";
import TrendingStyle from "../../components/global/TrendingStyle/TrendingStyle";
import productQuery from "../../lib/graphcms-querys/productsPagesQuery";
import PleaseSignIn from "../../components/VisualiserApp/PleaseSignIn/PleaseSignIn";
import customPageQuery from "../../lib/graphcms-querys/customPageQuery";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { useStore } from "../../components/VisualiserApp/store";
import s from "../../styles/pages/customPage.module.scss";
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
  // const customisePages = await customisePageQuery({where: productSlug: {`${params}`}});

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
  const { data: session } = useSession();
  const store = useStore();
  const [colour, setColour] = useState(0);
  const { productPage } = customisePages;
  const { name, productCategory, productEmbelishment, productVariantColours } =
    productPage;
  const embelishment =
    productEmbelishment === null ? "Embroidered" : productEmbelishment;
  const { trendingStyle } = customPage[0];

  useEffect(() => {
    store.setProductEmbelishment(embelishment);
    store.setProductName(name);
    store.setProductCategory(productCategory);
    window.localStorage.removeItem("selected-logo");
  }, [embelishment, name, productCategory]);

  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  return (
    <div className={s.pageWrap}>
      <div className={cn(s.appWrap, !session && s.isSession)}>
        <ProductView
          image={productVariantColours[colour].customImage}
          handleColourClick={handleColourClick}
          products={productPage}
        />
      </div>
      <PleaseSignIn />
      <TrendingStyle category={true} trendingStyle={trendingStyle} />

      {/* SEO */}

      <NextSeo
        title={`Level 4 | Visualiser | ${name}`}
        openGraph={{
          title: `Level 4 | Visualiser | ${name}`,
        }}
      />
    </div>
  );
};

export default Custom;
