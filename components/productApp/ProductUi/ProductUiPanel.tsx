import { useState, useEffect } from "react";
import s from "./productUiPanel.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import Show from "../../ui/icons/Show";
import Hide from "../../ui/icons/Hide";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";

const buttons = [
  { icon: "", class: s.image, text: "new image" },
  { icon: <Undo styles={s.undo} />, class: s.undoWrap, text: "undo" },
  { icon: <Redo styles={s.redo} />, class: s.redoWrap, text: "redo" },
  {
    icon: <Save styles={s.saveIcon} />,
    class: s.save,
    text: "save",
  },
  {
    icon: <Download styles={s.downloadIcon} />,
    class: s.download,
    text: "download",
  },
];

const ProductUiPanel = ({
  center,
  vertical,
  horizontal,
  showhide,
  state,
  handleColourClick,
  productColoutVariants,
  handleScreenShot,
  products,
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
    <div className={s.productUiWrap}>
      {/* <h1>{products.name}</h1> */}
      <div className={s.uiControlsWrap}>
        {state ? <h2>Controls:</h2> : <h2>Show Controls:</h2>}
        <div className={s.controlsWrap}>
          {controls.map((cont: any) => {
            return (
              <button
                key={cont.name}
                onClick={cont?.function}
                className={s.control}>
                {cont.icon}
              </button>
            );
          })}
        </div>
        {state ? (
          <div className={s.productColourWrap}>
            <p>Colour:</p>
            <div className={s.colourButtonsWrap}>
              {productColoutVariants.map((colour: any, i: any) => {
                return (
                  <ProductColourButtons
                    hex={colour.colour.hex}
                    hexSecondary={colour.secondaryColour.hex}
                    handleColourClick={handleColourClick}
                    i={i}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        <ProductButtons state={state} handleScreenShot={handleScreenShot} />
      </div>
      {state && (
        <div className={s.productColourWrap}>
          <h2>Colour:</h2>
          <ProductColourButtons
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
      <ProductButtons state={state} handleScreenShot={handleScreenShot} />
    </div>
  );
};

export default ProductUiPanel;
