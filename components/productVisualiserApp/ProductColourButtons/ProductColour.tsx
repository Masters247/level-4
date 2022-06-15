import s from "./productColour.module.scss";
import { FC } from "react";
import cn from "classnames";
import { useStore } from "../store";

interface Props {
  hex: string;
  i: number;
  hexSecondary: string;
  shape: string | undefined;
  colourClick?: (i: number) => void;
}

const ProductColour: FC<Props> = ({
  hex,
  i,
  hexSecondary,
  shape,
  colourClick,
}) => {
  const store = useStore();

  const handleColourClick = () => {
    if (colourClick) {
      colourClick(i);
    } else {
      store.setProductColour(i);
    }
  };

  return (
    <button
      onClick={handleColourClick}
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
