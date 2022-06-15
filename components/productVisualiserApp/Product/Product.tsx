/* eslint-disable jsx-a11y/alt-text */
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import { Button } from "../../ui/Button";
import Image from "next/image";
import Link from "next/link";
import s from "./product.module.scss";
import { useStore } from "../store";

const Product = ({ products, i }: any) => {
  const store = useStore();

  // const [productColour, setProductColour] = useState(0);

  // const productImageLength = products.productVariantColours.map(
  //   (l: any) => l.images.length
  // );

  // const handleImageClick = () => {
  //   if (productView < productImageLength[0] - 1) {
  //     setProductView(productView + 1);
  //   } else {
  //     setProductView(0);
  //   }
  // };

  // const colourClick = (e: any, i: any) => {
  //   setProductColour(i);
  // };

  const slug = products.productSlug;
  const slugCategory = products.productCategory;
  const productName = products.name;
  const productNameSliced = productName.slice(0, 16);
  const src = products.productVariantColours[0].images[0].url;

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
      <ProductColourButtons products={products} />

      <div
        className={s.productButtonsWrap}
        style={{
          marginTop: "1em",
        }}
      >
        <Link href={`/${slugCategory}/${slug}`} passHref prefetch={false}>
          <Button variant="primary">View</Button>
        </Link>
        <Link href={`/custom/${slug}`} passHref prefetch={false}>
          <Button variant="secondary-b">Customise</Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
