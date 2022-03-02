import React, { FC, useRef, useEffect, useState } from "react";
import s from "./productView.module.scss";
import ProductUi from "../ProductUi/ProductUi";
import Gesture from "../Gesture/Gesture";
import Resize from "../Resize-image/Resize";
import ResizeImage from "../Resize-image/ResizeImage";
import DragMove from "../Drag-move/DragMove";
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
