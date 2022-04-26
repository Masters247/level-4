import ProductView from "../../components/productApp/ProductView/ProductView";
import productQuery from "../../lib/graphcms-querys/productQuery";
import s from "../../styles/pages/customPage.module.scss";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
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

  const queryGraphCms = await graphcms.request(query);

  return {
    props: { queryGraphCms },
    revalidate: 10,
  };
}

function userAccount(email: any) {
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
}

const Custom: NextPage<Props> = ({ queryGraphCms }) => {
  const [downloadCustomImage, setDownloadCustomImage] = useState(false);
  const [saveCustomImage, setSaveCustomImage] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const { data: session }: any = useSession();
  const [colour, setColour] = useState(0);
  const { product } = queryGraphCms;
  const email = session?.user.email;
  const { user, isLoading, isError } = userAccount(email);

  const handleColourClick = (e: any, i: any) => {
    setColour(i);
  };

  const handleScreenShot = () => {
    setDownloadCustomImage(true);
    console.log("download image");
  };

  const handleSaveCustomImage = () => {
    if (session) {
      setSaveCustomImage(true);
      console.log("is session");
    } else {
      setIsSession(false);
    }
    console.log("save image");
  };

  useEffect(() => {
    const documentCustom: any = document.querySelector("#capture");
    {
      downloadCustomImage &&
        html2canvas(documentCustom, {}).then((canvas: any) => {
          var image = canvas
            .toDataURL("image/jpeg")
            .replace("image/jpeg", "image/octet-stream");
          window.location.href = image;
          setDownloadCustomImage(false);
        });
    }
  }, [downloadCustomImage]);

  useEffect(() => {
    const documentCustom: any = document.querySelector("#capture");
    {
      saveCustomImage &&
        html2canvas(documentCustom, {}).then((canvas: any) => {
          var image = canvas
            .toDataURL("image/jpeg")
            .replace("image/jpeg", "image/octet-stream");
          console.log("save image useEffect");
          const data = {
            image,
            user,
          };
          async function CustomImage() {
            await fetch(`/api/productApp/customImage`, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(data),
            });
          }
          CustomImage();
          setSaveCustomImage(false);
        });
    }
  }, [saveCustomImage]);

  return (
    <div className={s.pageWrap}>
      {!isSession ? (
        <div
          className={s.cover}
          onClick={() => {
            setIsSession(true);
          }}
        >
          <div className={s.login}>
            <p>Please login or create account to save images</p>
            <Link href="/signin" passHref>
              <a className={s.loginButton}>Login</a>
            </Link>
          </div>
        </div>
      ) : null}
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
