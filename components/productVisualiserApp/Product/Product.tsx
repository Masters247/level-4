/* eslint-disable jsx-a11y/alt-text */
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
// import { Button } from "../../ui/Button";
import Button from "../ProductUi/ProductButton";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";
import { useState, FC } from "react";

interface Props {
  products: any;
}

const Product: FC<Props> = ({ products }) => {
  const [colour, setProductColour] = useState(0);

  const handleColourClick = (e: any, i: number) => {
    setProductColour(i);
  };

  const slug = products.productSlug;
  const slugCategory = products.productCategory;
  const productName = products.name;
  const productNameSliced = productName.slice(0, 16);

  const src = products.productVariantColours[colour].images[0].url;

  return (
    <div key={products.name} className={s.productWrap}>
      <div className={s.productImageWrap}>
        <Link href={`/${slugCategory}/${slug}`} passHref prefetch={false}>
          <Image
            layout="responsive"
            src={src}
            placeholder="blur"
            blurDataURL={src}
            height={500}
            width={500}
          />
        </Link>
      </div>
      <Link href={`/${slugCategory}/${slug}`} passHref prefetch={false}>
        <a className={s.textLink}>
          {productName.length > 19 ? productNameSliced + " ..." : productName}
        </a>
      </Link>
      <ProductColourButtons
        products={products}
        handleColourClick={handleColourClick}
      />

      <div
        className={s.productButtonsWrap}
        style={{
          marginTop: "1em",
        }}>
        <Link href={`/${slugCategory}/${slug}`} passHref prefetch={false}>
          <Button variant="secondary">View</Button>
        </Link>
        <Link href={`/custom/${slug}`} passHref prefetch={false}>
          <Button variant="primary-c">Customise</Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
