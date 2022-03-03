import React, { FC } from "react";
import s from "./productView.module.scss";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import Test from "../Test/Test";

const ProductView: FC = () => {
  return (
    <div className={s.productViewWrap}>
      <ProductUiPanel />
      <Test />
    </div>
  );
};

export default ProductView;
