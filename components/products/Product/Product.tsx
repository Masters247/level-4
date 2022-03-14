import { useState } from "react";
import ProductColourButtons from "./ProductColourButtons";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";

const Product = ({ products, i }: any) => {
  const [productView, setProductView] = useState(0);
  const [productColour, setProductColour] = useState(i);
  const productImageLength = products.productVariantColours.map(
    (l: any) => l.images.length
  );
  const slug = products.productSlug;

  const handleImageClick = () => {
    if (productView < productImageLength[0] - 1) {
      setProductView(productView + 1);
    } else {
      setProductView(0);
    }
  };

  const handleColourClick = (e: any, i: any) => {
    setProductColour(i);
  };

  return (
    <div key={products.name} className={s.productWrap}>
      <div className={s.productImageWrap} onClick={handleImageClick}>
        <Image
          layout="responsive"
          src={
            products.productVariantColours[productColour].images[productView]
              .url
          }
          placeholder="blur"
          blurDataURL={
            products.productVariantColours[productColour].images[productView]
              .url
          }
          height={
            products.productVariantColours[productColour].images[productView]
              .height
          }
          width={
            products.productVariantColours[productColour].images[productView]
              .width
          }
        />
      </div>
      <Link href={`/product/${slug}`} passHref>
        <a>
          <p>{products.name}</p>
        </a>
      </Link>
      <div className={s.productColours}>
        {products.productVariantColours.map((colour: any, i: any) => {
          return (
            <ProductColourButtons
              key={i}
              i={i}
              hex={colour.colour.hex}
              handleColourClick={handleColourClick}
              hexSecondary={colour.secondaryColour.hex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
