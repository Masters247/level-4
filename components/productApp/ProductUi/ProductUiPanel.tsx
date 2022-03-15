import { useState, useEffect } from "react";
import s from "./productUiPanel.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtons from "../../products/Product/ProductColourButtons";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import Show from "../../ui/icons/Show";
import Hide from "../../ui/icons/Hide";
import Save from "../../ui/icons/Save";
import Camera from "../../ui/icons/Camera";
import Download from "../../ui/icons/Download";
import html2canvas from "html2canvas";

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
  productColoutVariants,
  handleColourClick,
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

  const [screenShot, setScreenShot] = useState(false);
  const [screenShotImage, setScreenShotImage] = useState(null);

  const handleScreenShot = () => {
    setScreenShot(true);
  };

  let document: any;

  useEffect(() => {
    {
      screenShot &&
        html2canvas(document.querySelector("#customView")).then(function (
          canvas: any
        ) {
          document.querySelector("#screenShot").appendChild(canvas);

          setScreenShotImage(canvas);
        });
    }
    setScreenShot(false);
  }, [screenShot]);

  const controls = state ? controler : controler.slice(3, 4);

  return (
    <>
      <div className={s.cameraWrap}>
        {!state && (
          <button className={s.cameraContainer} onClick={handleScreenShot}>
            <Camera styles={s.camera} />
          </button>
        )}
      </div>
      <div
        className={s.productUiWrap}
        style={{
          top: state ? "28em" : "38em",
        }}
      >
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
        <ProductButtons state={state} />
      </div>
    </>
  );
};

export default ProductUiPanel;
