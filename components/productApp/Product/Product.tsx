import { useState } from "react";
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
  const productName = products.name;
  const productNameSliced = productName.slice(0, 16);

  return (
    <div key={products.name} className={s.productWrap}>
      <div className={s.productImageWrap}>
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
          />
        </Link>
      </div>
      <Link href={`/${slugCategory}/${slug}`} passHref>
        <a className={s.textLink}>
          {productName.length > 19 ? productNameSliced + " ..." : productName}
        </a>
      </Link>
      <ProductColourButtons products={products} colourClick={colourClick} />

      <div
        className={s.productButtonsWrap}
        style={{
          marginTop: "1em",
        }}
      >
        <Link href={`/${slugCategory}/${slug}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
        <Link href={`/custom/${slug}`} passHref>
          <Button variant="secondary-b">Customise</Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
