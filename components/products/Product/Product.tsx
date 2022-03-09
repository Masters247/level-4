import { useState } from "react";
import ProductColourButtons from "./ProductColourButtons";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";
import { getImageSize } from "next/dist/server/image-optimizer";

const Product = ({ p, i }: any) => {
  const [productView, setProductView] = useState(1);
  const [productColour, setProductColour] = useState(i);
  const productImageLength = p.productVariantColours.map(
    (l: any) => l.images.length
  );
  const hexOne = p.productVariantColours[0].colour.hex;
  const hexTwo = p.productVariantColours[1].colour.hex;
  const hexThree = p.productVariantColours[2].colour.hex;
  const hexFour = p.productVariantColours[3].colour.hex;

  const handleImageClick = () => {
    if (productView < productImageLength[0] - 1) {
      setProductView(productView + 1);
    } else {
      setProductView(0);
    }
  };

  const handleColourClick = (e: any, hex: any) => {
    if (hex === hexOne) {
      setProductColour(0);
    }
    if (hex === hexTwo) {
      setProductColour(1);
    }
    if (hex === hexThree) {
      setProductColour(2);
    }
    if (hex === hexFour) {
      setProductColour(3);
    }
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
            <ProductColourButtons key={i} c={c} colour={handleColourClick} />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
