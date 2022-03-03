import { FC } from "react";
import s from "./productUiPanel.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";

const options = [
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
];

const uiButtons = [
  // { icon: "", class: s.resize, text: "resize" },
  { icon: "", class: s.image, text: "new image" },
  { icon: <Undo styles={s.undo} />, class: s.undoWrap, text: "undo" },
  { icon: <Redo styles={s.redo} />, class: s.redoWrap, text: "redo" },
  { icon: "", class: s.save, text: "save for letter" },
  { icon: "", class: s.download, text: "download" },
];

const ProductUi = ({ center, vertical, horizontal }: any) => {
  const handleColour = () => {
    console.log("colour click");
  };
  const controls = [
    {
      name: "c",
      icon: <Center styles={s.center} />,
      function: center,
    },
    {
      name: "cv",
      icon: <VerticalAlign styles={s.centerVertical} />,
      function: vertical,
    },
    {
      name: "ch",
      icon: <HorizontalAlign styles={s.centerHorizontal} />,
      function: horizontal,
    },
  ];
  return (
    <div className={s.productUiWrap}>
      <div className={s.uiControlsWrap}>
        <p>Alignment:</p>
        <div className={s.controlsWrap}>
          {controls.map((cont: any) => {
            return (
              <button
                key={cont.name}
                onClick={cont.function}
                className={s.control}
              >
                {cont.icon}
              </button>
            );
          })}
        </div>
      </div>
      <div className={s.productColourWrap}>
        <p>Colour:</p>
        <div className={s.colourButtonsWrap}>
          {options.map((colour: any, id: number) => {
            return (
              <button
                key={id}
                onClick={handleColour}
                className={s.colourButton}
                style={{
                  backgroundColor: colour.colour,
                }}
              ></button>
            );
          })}
        </div>
      </div>
      <div className={s.uiButtonsWrap}>
        {uiButtons.map((button: any, i: any) => {
          return (
            <button key={i} className={`${s.uiButton} ${button.class} `}>
              {button.icon}
              <p>{button.text}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductUi;
