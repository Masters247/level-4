import { useState, useEffect } from "react";
import s from "./productUiPanel.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtonsWrap from "../ProductColourButtons/ProductColourButtons";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import Show from "../../ui/icons/Show";
import Hide from "../../ui/icons/Hide";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";
import Camera from "../../ui/icons/Camera";

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
  products,
  center,
  vertical,
  horizontal,
  showhide,
  state,
  productColoutVariants,
  handleColourClick,
  handleScreenShot,
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
      <div className={s.uiControlsWrap}>
        {state ? <p>Controls:</p> : <p>Show Controls:</p>}
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
      {state ? (
        <div className={s.productColourWrap}>
          <p>Colour:</p>
          <ProductColourButtonsWrap
            products={products}
            colourClick={handleColourClick}
            position={2}
          />
        </div>
      ) : null}
      <ProductButtons state={state} handleScreenShot={handleScreenShot} />
    </div>
  );
};

export default ProductUiPanel;
