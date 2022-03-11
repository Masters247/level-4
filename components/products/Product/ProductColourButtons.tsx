import s from "./productColourButtons.module.scss";

const ProductColourButtons = ({ hex, handleColourClick, i }: any) => {
  return (
    <div onClick={(e) => handleColourClick(e, i)} className={s.border}>
      <button
        className={s.colour}
        style={{
          backgroundColor: `${hex}`,
        }}
      ></button>
    </div>
  );
};

export default ProductColourButtons;
