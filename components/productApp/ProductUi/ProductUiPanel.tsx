import { useState, useEffect } from "react";
import s from "./productUiPanel.module.scss";
import cn from "classnames";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtonsWrap from "../ProductColourButtons/ProductColourButtons";
import Show from "../../ui/icons/Show";
import Hide from "../../ui/icons/Hide";

const ProductUiPanel = ({
  products,
  center,
  vertical,
  horizontal,
  showhide,
  state,
  productColoutVariants,
  handleSaveCustomImage,
  handleColourClick,
  handleImageUpload,
  handleScreenShot,
  stateUploader,
}: any) => {
  const controler = [
    {
      name: "center",
      icon: <Center styles={s.center} />,
      function: center,
    },
    {
      name: "center vertical",
      icon: <VerticalAlign styles={s.centerVertical} />,
      function: vertical,
    },
    {
      name: "center horizontal",
      icon: <HorizontalAlign styles={s.centerHorizontal} />,
      function: horizontal,
    },
    {
      name: "show hide",
      icon: state ? <Hide styles={s.showhide} /> : <Show styles={s.showhide} />,
      function: showhide,
    },
  ];

  const controls = state ? controler : controler.slice(3, 4);

  return (
    <div className={cn(s.productUiWrap)}>
      <h1>{products.name}</h1>
      <div className={s.uiControlsWrap}>
        {state ? <h2>Controls:</h2> : <h2>Show Controls:</h2>}
        <div className={s.controlsWrap}>
          {controls.map((cont: any) => {
            return (
              <button
                key={cont.name}
                onClick={cont?.function}
                className={s.control}
              >
                {cont.icon}
              </button>
            );
          })}
        </div>
      </div>
      {state && (
        <div className={s.productColourWrap}>
          <h2>Colour:</h2>
          <ProductColourButtonsWrap
            products={products}
            colourClick={handleColourClick}
            position={2}
          />
        </div>
      )}
      {state && (
        <div className={s.embelishment}>
          <h2>Embelishment:</h2>
          <p>Embroidered</p>
        </div>
      )}
      <ProductButtons
        stateUploader={stateUploader}
        state={state}
        handleImageUpload={handleImageUpload}
        handleScreenShot={handleScreenShot}
        handleSaveCustomImage={handleSaveCustomImage}
      />
    </div>
  );
};

export default ProductUiPanel;
