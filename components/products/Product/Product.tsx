import { useState } from "react";
import ProductColourButtons from "./ProductColourButtons";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";

const Product = ({ p, i }: any) => {
  const [productView, setProductView] = useState(0);
  const [productColour, setProductColour] = useState(i);
  const productImageLength = p.productVariantColours.map(
    (l: any) => l.images.length
  );
  const slug = p.productSlug;

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
    <div key={p.name} className={s.productWrap}>
      <div className={s.productImageWrap} onClick={handleImageClick}>
        <Image
          layout="responsive"
          src={p.productVariantColours[productColour].images[productView].url}
          placeholder="blur"
          blurDataURL={
            p.productVariantColours[productColour].images[productView].url
          }
          height={
            p.productVariantColours[productColour].images[productView].height
          }
          width={
            p.productVariantColours[productColour].images[productView].width
          }
        />
      </div>
      <Link href={`/product/${slug}`} passHref>
        <a>
          <p>{p.name}</p>
        </a>
      </Link>
      <div className={s.productColours}>
        {p.productVariantColours.map((c: any, i: any) => {
          return (
            <ProductColourButtons
              key={i}
              i={i}
              hex={c.colour.hex}
              handleColourClick={handleColourClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
