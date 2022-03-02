import React, { FC } from "react";
import s from "./productView.module.scss";
import ProductUi from "../ProductUi/ProductUi";
import Test from "../Test/Test"

const ProductView: FC = () => {
  return (
    <div className={s.productViewWrap}>
      <ProductUi />
      <Test/>
    </div>
  );
}

export default ProductView;
