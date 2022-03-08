import type { NextPage } from "next";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import s from "../../styles/pages/categories.module.scss";
import categoryQuery from "../../lib/graphcms-querys/categoryQuery";
import { useState } from "react";

export async function getStaticPaths() {
  const categories = await categoryQuery();

  const paths = categories.map((s: any) => ({
    params: { slug: s.categoriesSlug },
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
  query Category {
    categories(where: {categoriesSlug: "${params.slug}"}) {
      title
      heroImage {
        height
        width
        url
      }
      productsTitle
      heroText
      heroImageAltText
      products {
        productSlug
        name
        productVariantColours {
          images {
            height
            url
            width
          }
          colour {
            hex
          }
        }
      }
    }
  }
  `;

  const data = await graphcms.request(query);

  console.log("data", data);

  return {
    props: { data },
    revalidate: 10,
  };
}

interface Props {
  data: any;
}

const Category: NextPage<Props> = ({ data }) => {
  const [capView, setCapView] = useState(1);
  const { categories } = data;

  return (
    <div className={s.categoriesPageWrap}>
      <section className={s.heroWrap}>
        <div className={s.heroText}>
          <h1>{categories[0].title}</h1>
          <p>{categories[0].heroText}</p>
        </div>
        <div className={s.heroImage}>
          <Image
            layout="responsive"
            alt={categories[0].heroImageAltText}
            src={categories[0].heroImage[0].url}
            placeholder="blur"
            blurDataURL={categories[0].heroImage[0].url}
            height={categories[0].heroImage[0].height}
            width={categories[0].heroImage[0].width}
          />
        </div>
      </section>
      <section className={s.categoriesProductsWrap}>
        <div className={s.productsTitleWrap}>
          <h2>{categories[0].productsTitle}</h2>
        </div>
        <div className={s.productsWrap}>
          {categories[0].products.map((p: any, i: any) => {
            const num = 0;

            const handleImageClick = (e: any, i: any) => {
              console.log("index", i);
              if (i === 0) {
                if (capView < 2) {
                  setCapView(capView + 1);
                } else {
                  setCapView(0);
                }
              }
            };
            return (
              <div key={p.name} className={s.productWrap}>
                <div
                  className={s.productImageWrap}
                  onClick={(e) => handleImageClick(e, i)}
                >
                  <Image
                    layout="responsive"
                    src={p.productVariantColours[i].images[capView].url}
                    placeholder="blur"
                    blurDataURL={p.productVariantColours[i].images[capView].url}
                    height={p.productVariantColours[i].images[capView].height}
                    width={p.productVariantColours[i].images[capView].width}
                  />
                </div>
                {/* To do
                    need to create dyamic pages for products
                */}
                <Link href="/" passHref>
                  <a>
                    <p>{p.name}</p>
                  </a>
                </Link>
                <div className={s.productColours}>
                  {p.productVariantColours.map((c: any, i: any) => {
                    return (
                      <div className={s.border} key={i}>
                        <div
                          className={s.colour}
                          style={{
                            backgroundColor: `${c.colour.hex}`,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Category;