import { useState, FC } from "react";
import cn from "classnames";
import ProductColour from "./ProductColour";
import s from "./productColourButtons.module.scss";
import { handleColourClick } from "../types";

interface Products {
  name: string;
  productCategory: string;
  productSlug: string;
  productVariantColours: Array<TemplateStringsArray>;
}

interface Props {
  products: Products;
  rotate?: string;
  position?: any;
  setColourChangeProductVariant?: any;
  colourClick?: (i: number) => void;
  handleColourClick: handleColourClick;
}

const ProductColourButtonsWrap: FC<Props> = ({
  products,
  rotate,
  position,
  handleColourClick,
}) => {
  const [productColourView, setProductColourView] = useState({
    start: 0,
    finish: 4,
  });

  const productVariantColoursLength = products.productVariantColours.length;

  const [colourLeft, setColoursLeft] = useState(
    productVariantColoursLength - productVariantColoursLength
  );

  const [colourRight, setColoursRight] = useState(
    productVariantColoursLength - 4
  );

  const productVariantColoursLimit = products.productVariantColours.slice(
    productColourView.start,
    productColourView.finish
  );

  const showMoreColoursRight = () => {
    setColoursRight(colourRight - 1);
    setColoursLeft(colourLeft + 1);

    setProductColourView({
      ...productColourView,
      start: productColourView.start + 1,
      finish: productColourView.finish + 1,
    });
  };

  const showMoreColoursLeft = () => {
    setColoursRight(colourRight + 1);
    setColoursLeft(colourLeft - 1);

    setProductColourView({
      ...productColourView,
      start: productColourView.start - 1,
      finish: productColourView.finish - 1,
    });
  };

  return (
    <div className={cn(s.productColours, position)}>
      {productVariantColoursLength <= 4 ? null : (
        <button
          onClick={showMoreColoursLeft}
          className={cn(
            s.coloursRight,
            productColourView.start === 0 && s.hide
          )}
          disabled={productColourView.start === 0}>
          <p className={rotate}>+{colourLeft}</p>
        </button>
      )}

      {productVariantColoursLimit.map((colour: any, i: number) => {
        return (
          <ProductColour
            key={i}
            i={`${i + productColourView.start}`}
            hex={colour.colour.hex}
            hexSecondary={colour.secondaryColour.hex}
            shape={colour.shape}
            handleColourClick={handleColourClick}
          />
        );
      })}
      {productVariantColoursLength <= 4 ? null : (
        <button
          onClick={showMoreColoursRight}
          className={cn(s.coloursLeft, colourRight === 0 && s.hide)}
          disabled={colourRight === 0}>
          <p className={rotate}>+{colourRight}</p>
        </button>
      )}
    </div>
  );
};

export default ProductColourButtonsWrap;
