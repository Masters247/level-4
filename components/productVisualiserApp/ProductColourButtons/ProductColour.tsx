import s from "./productColour.module.scss";
import cn from "classnames";
import { useStore } from "../store";
const ProductColour = ({ hex, i, hexSecondary, shape }: any) => {
  const store = useStore();

  return (
    <button
      onClick={() => store.setProductColour(i)}
      className={cn(s.border, {
        [s.circleBorder]: shape === "Circle",
        [s.squareBorder]: shape === "Square",
        [s.rectangleBorder]: shape === "Rectangle",
        [s.hexagonalBorder]: shape === "Hexagonal",
      })}
    >
      <div
        className={cn(s.colour, {
          [s.circle]: shape === "Circle",
          [s.square]: shape === "Square",
          [s.rectangle]: shape === "Rectangle",
          [s.hexagonal]: shape === "Hexagonal",
        })}
        style={{
          backgroundColor: `${hex}`,
        }}
      >
        <span
          style={{
            backgroundColor: `${hexSecondary}`,
            width: "5px",
            height: "5px",
          }}
        ></span>
      </div>
    </button>
  );
};

export default ProductColour;
