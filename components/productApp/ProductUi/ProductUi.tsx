import { FC } from "react";
import s from "./productUi.module.scss";
const options = [
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
  { colour: "#909090" },
];

const ProductUi: FC = () => {

    const handleColour = () => {
        console.log("colour click")
    }
  return (
    <div className={s.productUiWrap}>
      <div className={s.colourButtonsWrap}>
          {options.map((colour: any, id: number) => {
              return (
                  <button key={id} onClick={handleColour} className={s.colourButton} style={{
                      backgroundColor: colour.colour
                  }}>
                  </button>
              )
          })}
      </div>
      <p>Product Ui</p>
    </div>
  );
};

export default ProductUi;
