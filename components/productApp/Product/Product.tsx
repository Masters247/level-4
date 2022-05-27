import { useState, useEffect } from "react";
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import { Button } from "../../ui/Button";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";

const Product = ({ products, i }: any) => {
  const [productView, setProductView] = useState(0);
  const [productColour, setProductColour] = useState(0);

  const productImageLength = products.productVariantColours.map(
    (l: any) => l.images.length
  );

  const handleImageClick = () => {
    if (productView < productImageLength[0] - 1) {
      setProductView(productView + 1);
    } else {
      setProductView(0);
    }
  };

  const colourClick = (e: any, i: any) => {
    setProductColour(i);
  };

  const slug = products.productSlug;
  const slugCategory = products.productCategory;

  console.log("Products", products.name);

  return (
    <div key={products.name} className={s.productWrap}>
      <div
        className={s.productImageWrap}

        // onClick allows for image changes
        // onClick={handleImageClick}
      >
        <Link href={`/${slugCategory}/${slug}`} passHref>
          <Image
            layout="responsive"
            quality={50}
            src={
              products.productVariantColours[productColour].images[productView]
                .url
            }
            placeholder="blur"
            blurDataURL={
              products.productVariantColours[productColour].images[productView]
                .url
            }
            height={260}
            width={260}
            // height={
            //   products.productVariantColours[productColour].images[productView]
            //     .height
            // }
            // width={
            //   products.productVariantColours[productColour].images[productView]
            //     .width
            // }
          />
        </Link>
      </div>
      <Link href={`/${slugCategory}/${slug}`} passHref>
        <a className={s.textLink}>{products.name}</a>
      </Link>
      <ProductColourButtons products={products} colourClick={colourClick} />
      <Link href={`/${slugCategory}/${slug}`} passHref>
        <Button className={s.button} variant="primary">
          View
        </Button>
      </Link>
    </div>
  );
};

export default Product;
