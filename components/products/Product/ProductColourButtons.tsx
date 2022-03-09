import s from "./product.module.scss";

const ProductColourButtons = ({ c, colour }: any) => {
  const hex = c.colour.hex;
  return (
    <div onClick={(e) => colour(e, hex)} className={s.border}>
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
