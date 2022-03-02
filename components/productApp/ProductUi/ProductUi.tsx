import { FC } from "react";
import s from "./productUi.module.scss";
const options = [
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
];

const uiButtons = [
  { icon: "", class: s.resize, text: "resize" },
  { icon: "", class: s.image, text: "new image" },
  { icon: "", class: s.undo, text: "undo" },
  { icon: "", class: s.redo, text: "redo" },
  { icon: "", class: s.save, text: "save for letter" },
  { icon: "", class: s.download, text: "download" },
];

const ProductUi: FC = () => {
  const handleColour = () => {
    console.log("colour click");
  };
  return (
    <div className={s.productUiWrap}>
      <div className={s.productColourWrap}>
        <h3>Product Colour:</h3>
        <div className={s.colourButtonsWrap}>
          {options.map((colour: any, id: number) => {
            return (
              <button
                key={id}
                onClick={handleColour}
                className={s.colourButton}
                style={{
                  backgroundColor: colour.colour,
                }}></button>
            );
          })}
        </div>
      </div>
      <div className={s.uiButtonsWrap}>
        {uiButtons.map((button: any, i: any) => {
          return (
            <button className={`${s.uiButton} ${button.class} `}>
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductUi;
