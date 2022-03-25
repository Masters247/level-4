import s from "./productColour.module.scss";

const ProductColour = ({ hex, handleColourClick, i, hexSecondary }: any) => {
  return (
    <button onClick={(e) => handleColourClick(e, i)} className={s.border}>
      <div
        className={s.colour}
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
