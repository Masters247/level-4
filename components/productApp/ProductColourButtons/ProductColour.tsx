import s from "./productColour.module.scss";
import cn from "classnames";

const ProductColour = ({
  hex,
  handleColourClick,
  i,
  hexSecondary,
  shape,
}: any) => {
  return (
    <button
      onClick={(e) => handleColourClick(e, i)}
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
          position: "relative",
        }}
      >
        <span
          style={{
            backgroundColor: `${hexSecondary}`,
            left: "calc(50% - 2px)",
            top: "calc(50% - 2px)",
            position: "absolute",
            width: "4px",
            height: "4px",
          }}
        ></span>
      </div>
    </button>
  );
};

export default ProductColour;
